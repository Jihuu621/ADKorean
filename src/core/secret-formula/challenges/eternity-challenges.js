import { DC } from "../../constants";

const specialInfinityGlyphDisabledEffectText = () => (PelleRifts.chaos.milestones[1].canBeApplied
  ? "또한, 무한 글리프의 펠레 전용 효과가 비활성화됩니다."
  : "");

export const eternityChallenges = [
  {
    id: 1,
    description: "시간 차원이 비활성화됩니다.",
    goal: DC.E1800,
    goalIncrease: DC.E200,
    reward: {
      description: "시간 차원이 이번 영원에서 보낸 시간에 따라서 증폭됩니다.",
      effect: completions =>
        Decimal.pow(Math.max(player.records.thisEternity.time / 10, 0.9), 0.3 + (completions * 0.05)),
      formatEffect: value => formatX(value, 2, 1)
    },
    // These will get notation-formatted and scrambled between for the final goal
    scrambleText: ["1e2600", "1e201600"],
  },
  {
    id: 2,
    description: "무한 차원이 비활성화됩니다.",
    goal: DC.E975,
    pelleGoal: DC.E1750,
    goalIncrease: DC.E175,
    reward: {
      description: "제1 무한 차원이 무한력에 비례하여 증폭됩니다.",
      effect: completions => Currency.infinityPower.value.pow(1.5 / (700 - completions * 100)).clampMin(1),
      cap: DC.E100,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 3,
    description: "제5-8 반물질 차원이 아무것도 생산하지 않으며, 차원 희생이 비활성화됩니다.",
    goal: DC.E600,
    pelleGoal: DC.E925,
    goalIncrease: DC.E75,
    reward: {
      description: () => `반물질 차원을 ${formatInt(10)}개 구매하였을 때의 배율이 상승합니다.`,
      effect: completions => completions * 0.72,
      formatEffect: value => `+${format(value, 2, 2)}`
    }
  },
  {
    id: 4,
    description: `모든 무한 관련 가속과 생산이 중단됩니다. 목표는 특정 무한 이내에 달성되어야 하며, 그렇지 않으면 도전에서 실패하게 됩니다.`,
    goal: DC.E2750,
    goalIncrease: DC.E550,
    restriction: completions => Math.max(16 - 4 * completions, 0),
    checkRestriction: restriction => Currency.infinities.lte(restriction),
    formatRestriction: restriction => (restriction === 0
      ? "(무한에 도달하지 않고)"
      : `(무한에 ${restriction}번 이하로 도달하고`),
    failedRestriction: "(무한에 너무 많이 도달함)",
    reward: {
      description: "보유중인 무한 포인트에 따라 무한 차원이 배율을 받습니다.",
      effect: completions => Currency.infinityPoints.value.pow(0.003 + completions * 0.002),
      cap: DC.E200,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 5,
    description: () => `반물질 은하의 가격 상승이 처음부터 시작되고, (원래 ${formatInt(100)}개부터) 차원 가속의 가격이 훨씬 빠르게 상승합니다.`,
    goal: DC.E750,
    pelleGoal: DC.E1400,
    goalIncrease: DC.E400,
    reward: {
      description: "먼 반물질 은하의 가격 상승이 미뤄집니다.",
      effect: completions => completions * 5,
      formatEffect: value => `${formatInt(value)}개`
    }
  },
  {
    id: 6,
    // The asterisk, if present, will get replaced with strings generated from the scramble text
    description: () => {
      if (Enslaved.isRunning) return "복제자 은하의 최대 갯수 업그레이드의 가격이 크게 감소합니다.";
      return "반물질 은하를 얻을 수 없지만, 복제자 은하의 최대 갯수 업그레이드의 가격이 크게 감소합니다.";
    },
    goal: DC.E850,
    pelleGoal: DC.E1500,
    goalIncrease: DC.E250,
    reward: {
      description: "반물질 차원의 가격 상승률을 감소시킵니다.",
      effect: completions => completions * 0.2,
      formatEffect: value => {
        const total = Math.round(Player.dimensionMultDecrease + Effects.sum(EternityChallenge(6).reward)) - value;
        return `-${format(value, 2, 1)} (${formatX(total, 2, 1)} total)`;
      }
    },
    scrambleText: ["반물질 차원을 얻을 수 없습니다.", "반퐚秩 차鸭ㅇ?!원을 얻랜 K 없㦂l"],
  },
  {
    id: 7,
    description:
      "제1 시간 차원은 시간 파편 대신 제8 무한 차원을 생산하며," +
      "제1 무한 차원은 무한력 대신 제7 반물질 차원을 생산합니다. 또한 틱스피드가 무한 차원과 시간 차원에도 직접적으로 적용됩니다.",
    goal: DC.E2000,
    pelleGoal: DC.E2700,
    goalIncrease: DC.E530,
    effect: () => TimeDimension(1).productionPerSecond,
    reward: {
      description: "제1 시간 차원이 제8 무한 차원을 생산합니다.",
      effect: completions => TimeDimension(1).productionPerSecond.pow(completions * 0.2).minus(1).clampMin(0),
      formatEffect: value => `${format(value, 2, 1)} 초당`
    }
  },
  {
    id: 8,
    description: () => `무한 차원을 ${formatInt(50)}번, 복제자 업그레이드를 ${formatInt(40)}번만 구매할 수 있습니다. 이들에 대한 자동구매기는 비활성화됩니다.`,
    goal: DC.E1300,
    pelleGoal: DC.E2800,
    goalIncrease: DC.E900,
    reward: {
      description: "무한력이 복제자 은하의 효율을 증폭시킵니다.",
      effect: completions => {
        const infinityPower = Math.log10(Currency.infinityPower.value.pLog10() + 1);
        return Math.max(0, Math.pow(infinityPower, 0.03 * completions) - 1);
      },
      formatEffect: value => formatPercents(value, 2)
    }
  },
  {
    id: 9,
    description: () => `틱스피드 업그레이드를 구매할 수 없지만, 무한력이 시간 차원에도 매우 작은 영향을 미칩니다. ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E1750,
    pelleGoal: DC.E2900,
    goalIncrease: DC.E250,
    reward: {
      description: "무한 차원이 시간 파편의 수에 비례하여 배율을 받습니다.",
      effect: completions => Currency.timeShards.value.pow(completions * 0.1).clampMin(1),
      cap: DC.E400,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 10,
    description: () => {
      let description = `시간 차원과 무한 차원이 비활성화되지만, 무한 횟수에 따라 반물질 차원이 크게 증폭됩니다. (무한 횟수${formatPow(950)}). ${specialInfinityGlyphDisabledEffectText()}`;
      EternityChallenge(10).applyEffect(v => description += ` Currently: ${formatX(v, 2, 1)}`);
      return description;
    },
    goal: DC.E3000,
    pelleGoal: DC.E3200,
    goalIncrease: DC.E300,
    effect: () => Decimal.pow(Currency.infinitiesTotal.value, 950).clampMin(1).pow(TimeStudy(31).effectOrDefault(1)),
    reward: {
      description: "시간 차원이 무한 횟수에 비례하여 배율을 받습니다.",
      effect: completions => {
        const mult = Currency.infinitiesTotal.value.times(2.783e-6).pow(0.4 + 0.1 * completions).clampMin(1);
        return mult.powEffectOf(TimeStudy(31));
      },
      formatEffect: value => {
        // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
        const mult = formatX(value, 2, 1);
        return TimeStudy(31).canBeApplied
          ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (시간 연구 31 이후: ${mult})`
          : mult;
      }
    }
  },
  {
    id: 11,
    description: () => `무한력과 차원 가속이 반물질 차원에 적용하는 배율을 제외한 모든 차원의 배율이 비활성화됩니다. ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E450,
    pelleGoal: DC.E11200,
    goalIncrease: DC.E200,
    pelleGoalIncrease: DC.E1400,
    reward: {
      description: "틱스피드의 가격 상승률을 더욱 줄입니다.",
      effect: completions => completions * 0.07,
      formatEffect: value => {
        const total = Math.round(Player.tickSpeedMultDecrease + Effects.sum(EternityChallenge(11).reward)) - value;
        return `-${format(value, 2, 2)} (${formatX(total, 2, 2)})`;
      }
    }
  },
  {
    id: 12,
    description: () => (PlayerProgress.realityUnlocked()
      ? `게임의 속도가 ×${formatInt(1000)}배 느리게 흘러갑니다. 모든 게임 속도에 영향을 주는 요소가 비활성화되며, 특정 시간을 초과하면 도전에 실패하게 됩니다. 또한, ${specialInfinityGlyphDisabledEffectText()}`
      : `게임의 속도가 ×${formatInt(1000)}배 느리게 흘러갑니다. 특정 시간을 초과하면 도전에 실패하게 됩니다.`),
    goal: DC.E110000,
    pelleGoal: DC.E208000,
    goalIncrease: DC.E12000,
    restriction: completions => Math.max(10 - 2 * completions, 1) / 10,
    checkRestriction: restriction => Time.thisEternity.totalSeconds < restriction,
    formatRestriction: restriction => `(${restriction}초 이내로)`,
    failedRestriction: "(시간이 초과되었습니다.)",
    reward: {
      description: "무한 차원의 가격 상승률이 감소합니다.",
      effect: completions => 1 - completions * 0.008,
      formatEffect: value => `x${formatPow(value, 3, 3)}`
    }
  }
];
