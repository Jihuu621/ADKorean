<script>
import NormalAchievementRow from "./NormalAchievementRow";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SwapAchievementImagesButton from "./SwapAchievementImagesButton";

export default {
  name: "NormalAchievementsTab",
  components: {
    SwapAchievementImagesButton,
    NormalAchievementRow,
    PrimaryToggleButton
  },
  data() {
    return {
      achievementPower: 0,
      achTPEffect: 0,
      achCountdown: 0,
      totalCountdown: 0,
      missingAchievements: 0,
      showAutoAchieve: false,
      isAutoAchieveActive: false,
      hideCompletedRows: false,
      achMultBreak: false,
      achMultToIDS: false,
      achMultToTDS: false,
      achMultToBH: false,
      achMultToTP: false,
      achMultToTT: false,
      renderedRowIndices: []
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    rows: () => Achievements.allRows,
    renderedRows() {
      return this.rows.filter((_, i) => this.renderedRowIndices.includes(i));
    },
    boostText() {
      const achievementPower = formatX(this.achievementPower, 2, 3);
      const achTPEffect = formatX(this.achTPEffect, 2, 3);

      const boostList = [];

      const dimMultList = [];
      dimMultList.push("반물질");
      if (this.achMultToIDS) dimMultList.push("무한");
      if (this.achMultToTDS) dimMultList.push("시간");
      boostList.push(`${makeEnumeration(dimMultList)} 차원: ${achievementPower}`);

      if (this.achMultToTP) boostList.push(`타키온 입자: ${achTPEffect}`);
      if (this.achMultToBH) boostList.push(`블랙홀 파워: ${achievementPower}`);
      if (this.achMultToTT) boostList.push(`시간 정리 생산: ${achievementPower}`);
      return `${boostList.join("<br>")}`;
    },
  },
  watch: {
    isAutoAchieveActive(newValue) {
      player.reality.autoAchieve = newValue;
    },
    hideCompletedRows(newValue) {
      player.options.hideCompletedAchievementRows = newValue;
      this.startRowRendering();
    }
  },
  created() {
    this.startRowRendering();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.renderAnimationId);
  },
  methods: {
    update() {
      const gameSpeedupFactor = getGameSpeedupFactor();
      this.achievementPower = Achievements.power;
      this.achTPEffect = RealityUpgrade(8).config.effect();
      this.achCountdown = Achievements.timeToNextAutoAchieve / gameSpeedupFactor;
      this.totalCountdown = ((Achievements.preReality.countWhere(a => !a.isUnlocked) - 1) * Achievements.period +
        Achievements.timeToNextAutoAchieve) / gameSpeedupFactor;
      this.missingAchievements = Achievements.preReality.countWhere(a => !a.isUnlocked);
      this.showAutoAchieve = PlayerProgress.realityUnlocked() && !Perk.achievementGroup5.isBought;
      this.isAutoAchieveActive = player.reality.autoAchieve;
      this.hideCompletedRows = player.options.hideCompletedAchievementRows;
      this.achMultBreak = BreakInfinityUpgrade.achievementMult.canBeApplied;
      this.achMultToIDS = Achievement(75).isUnlocked;
      this.achMultToTDS = EternityUpgrade.tdMultAchs.isBought;
      this.achMultToTP = RealityUpgrade(8).isBought;
      this.achMultToBH = VUnlocks.achievementBH.canBeApplied;
      this.achMultToTT = Ra.unlocks.achievementTTMult.canBeApplied;
    },
    startRowRendering() {
      const unlockedRows = [];
      const lockedRows = [];
      for (let i = 0; i < this.rows.length; i++) {
        const targetArray = this.rows[i].every(a => a.isUnlocked) ? unlockedRows : lockedRows;
        targetArray.push(i);
      }
      const renderedLockedRows = lockedRows.filter(row => this.renderedRowIndices.includes(row));
      const nonRenderedLockedRows = lockedRows.filter(row => !this.renderedRowIndices.includes(row));
      let rowsToRender;
      if (player.options.hideCompletedAchievementRows) {
        this.renderedRowIndices = unlockedRows.concat(renderedLockedRows);
        rowsToRender = nonRenderedLockedRows;
      } else {
        this.renderedRowIndices = renderedLockedRows;
        rowsToRender = unlockedRows.concat(nonRenderedLockedRows);
      }
      const stepThroughRendering = () => {
        const ROWS_PER_FRAME = 2;
        for (let i = 0; i < ROWS_PER_FRAME; i++) {
          if (rowsToRender.length === 0) {
            return;
          }
          this.renderedRowIndices.push(rowsToRender.shift());
        }
        this.renderAnimationId = requestAnimationFrame(stepThroughRendering);
      };
      stepThroughRendering();
    },
    isRendered(row) {
      return this.renderedRowIndices.includes(row);
    },
    isObscured(row) {
      return this.isDoomed ? false : row === 17;
    },
    timeDisplay,
    timeDisplayNoDecimals,
  }
};
</script>

<template>
  <div class="l-achievements-tab">
    <div class="c-subtab-option-container">
      <PrimaryToggleButton
        v-model="hideCompletedRows"
        class="o-primary-btn--subtab-option"
        label="완료한 행 숨기기:"
      />
      <PrimaryToggleButton
        v-if="showAutoAchieve"
        v-model="isAutoAchieveActive"
        class="o-primary-btn--subtab-option"
        label="자동 도전과제 달성:"
      />
    </div>
    <div class="c-achievements-tab__header c-achievements-tab__header--multipliers">
      <span v-if="isDoomed">
        모든 도전과제 배율이 비활성화되었습니다.<SwapAchievementImagesButton />
      </span>
      <span v-else>
        도전과제 배율<SwapAchievementImagesButton />
        <div v-html="boostText" />
      </span>
    </div>
    <div class="c-achievements-tab__header">
      <i class="fas fa-star" /> 아이콘이 포함된 도전과제를 달성하면 추가 보상이 주어집니다.
    </div>
    <div
      v-if="showAutoAchieve"
      class="c-achievements-tab__header"
    >
      <div v-if="achCountdown > 0">
        Automatically gain the next missing Achievement in
        {{ timeDisplayNoDecimals(achCountdown) }}<span v-if="!isAutoAchieveActive"> once Auto is turned on</span>.
        (left-to-right, top-to-bottom)
      </div>
      <div v-else-if="missingAchievements !== 0">
        Automatically gain the next missing Achievement as soon as you enable Auto Achievements.
        (left-to-right, top-to-bottom)
      </div>
      <div v-if="totalCountdown > 0">
        You will regain all remaining achievements after {{ timeDisplayNoDecimals(totalCountdown) }} if Auto
        Achievement <span v-if="isAutoAchieveActive">stays enabled</span><span v-else>is turned on</span>.
      </div>
      <br>
    </div>
    <div class="l-achievement-grid">
      <NormalAchievementRow
        v-for="(row, i) in renderedRows"
        :key="i"
        :row="row"
        :is-obscured="isObscured(i)"
      />
    </div>
  </div>
</template>
