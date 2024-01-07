<script>
import { DC } from "@/core/constants";

export default {
  name: "AntimatterDimensionProgressBar",
  data() {
    return {
      fill: 0,
      tooltip: "",
      displayPercents: "",
    };
  },
  computed: {
    progressBarStyle() {
      return {
        width: `${(this.fill * 100).toFixed(2)}%`
      };
    }
  },
  methods: {
    // eslint-disable-next-line complexity
    update() {
      this.displayPercents = formatPercents(this.fill, 2);
      const setProgress = (current, goal, tooltip) => {
        this.fill = Math.clampMax(current.pLog10() / Decimal.log10(goal), 1);
        this.tooltip = tooltip;
      };
      const setLinearProgress = (current, goal, tooltip) => {
        this.fill = Math.clampMax(current / goal, 1);
        this.tooltip = tooltip;
      };

      // Goals for challenges and challenge-like runs should come first because numbers will always be much smaller
      // than normal and therefore default filling won't be meaningful. Since challenges get completed or abandoned from
      // the inside outwards, we show the goals in that priority as well. It only makes sense to check cel6 and not the
      // others because pre-cel3 completion it'll default to e4000 and cel4/5 don't have meaningful single goals
      const inSpecialRun = Player.isInAntimatterChallenge || EternityChallenge.isRunning || player.dilation.active ||
        Laitela.isRunning;
      if (inSpecialRun) {
        if (Player.isInAntimatterChallenge) {
          setProgress(Currency.antimatter.value, Player.antimatterChallenge.goal, "도전의 목표까지의 진행도");
        } else if (EternityChallenge.isRunning) {
          if (Perk.studyECBulk.isBought) {
            // Note: If the EC is fully complete, this prop doesn't exist
            const goal = EternityChallenge.current.gainedCompletionStatus.nextGoalAt;
            if (goal) {
              setProgress(Currency.infinityPoints.value, goal, "무한 도전의 목표까지의 진행도");
            } else {
              // In a fully completed EC, there's nothing useful we can show so we just pin it at 100% and say so
              setProgress(Currency.infinityPoints.value, 10, "이 도전은 이미 완료되었습니다!");
            }
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, "영원 도전의 목표까지의 진행도");
          }
        } else if (player.dilation.active) {
          if (player.dilation.lastEP.gt(0)) {
            setProgress(Currency.antimatter.value, getTachyonReq(), "팽창 중 더 많은 TP를 얻을 수 있을 때까지의 진행도");
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, "팽창 도중 영원까지의 진행도");
          }
        } else {
          // Lai'tela destabilization; since the progress bar is logarithmically-scaled, we need to pow10 the arguments
          setProgress(Decimal.pow10(player.celestials.laitela.entropy), 10, "불안정한 현실까지의 진행도");
        }
      } else if (Pelle.isDoomed) {
        if (PelleRifts.recursion.milestones[2].canBeApplied || GalaxyGenerator.spentGalaxies > 0) {
          setProgress(Currency.infinityPoints.value, Tesseracts.nextCost, "다음 테서랙트까지의 진행도");
        } else if (PelleStrikes.dilation.hasStrike) {
          setProgress(Currency.eternityPoints.value, DC.E4000, "은하 생성기까지의 진행도");
        } else if (PelleStrikes.ECs.hasStrike) {
          setLinearProgress(
            (Math.min(Currency.timeTheorems.max.toNumber() / 12900, 1) +
            Math.min(EternityChallenges.completions / 60, 1)) / 2,
            1, "Percentage to fifth Strike");
        } else if (PelleStrikes.eternity.hasStrike) {
          setLinearProgress(Currency.timeTheorems.max.toNumber(), 115, "네번째 스트라이크까지의 진행도");
        } else if (PelleStrikes.powerGalaxies.hasStrike) {
          setProgress(Currency.infinityPoints.value, Player.eternityGoal, "세번째 스트라이크까지의 진행도");
        } else if (PelleStrikes.infinity.hasStrike) {
          if (player.break) {
            setProgress(Currency.infinityPoints.value, 5e11, "두번째 스트라이크까지의 진행도");
          } else {
            setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, "무한까지의 진행도");
          }
        } else {
          setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, "첫번째 스트라이크까지의 진행도");
        }
      } else if (Enslaved.isCompleted) {
        // Show all other goals from the top down, starting at features in the highest prestige layer
        setProgress(Currency.infinityPoints.value, Tesseracts.nextCost, "다음 테서랙트까지의 진행도");
      } else if (PlayerProgress.dilationUnlocked()) {
        setProgress(Currency.eternityPoints.value, DC.E4000, "현실까지의 진행도");
      } else if (InfinityDimension(8).isUnlocked) {
        setProgress(Currency.infinityPoints.value, Player.eternityGoal, "영원까지의 진행도");
      } else if (player.break) {
        const text = `새로운 ${InfinityDimensions.next().hasIPUnlock
          ? "종류의 차원을 해금하기까지의 진행도"
          : "무한 차원을 해금하기까지의 진행도"}`;
        const nextID = InfinityDimensions.next();
        if (nextID.ipRequirementReached) {
          setProgress(player.records.thisEternity.maxAM, nextID.amRequirement, text);
        } else {
          setProgress(player.infinityPoints, nextID.ipRequirement, text);
        }
      } else {
        setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, "무한까지의 진행도");
      }
    }
  }
};
</script>

<template>
  <div class="c-progress-bar">
    <div
      :style="progressBarStyle"
      class="c-progress-bar__fill"
    >
      <span
        v-tooltip="tooltip"
        class="c-progress-bar__percents"
      >
        {{ displayPercents }}
      </span>
    </div>
  </div>
</template>
