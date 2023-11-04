<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton";

export default {
  name: "TickspeedAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton
  },
  data() {
    return {
      mode: AUTOBUYER_MODE.BUY_SINGLE,
      isUnlocked: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.tickspeed,
    modeDisplay() {
      switch (this.mode) {
        case AUTOBUYER_MODE.BUY_SINGLE: return "1개씩 구매";
        case AUTOBUYER_MODE.BUY_MAX: return "최대 구매";
      }
      throw "Unknown tickspeed autobuyer mode";
    }
  },
  methods: {
    update() {
      this.mode = this.autobuyer.mode;
      this.isUnlocked = this.autobuyer.isUnlocked;
    },
    toggleMode() {
      this.autobuyer.toggleMode();
      this.update();
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    name="틱스피드 자동구매기"
    show-interval
  >
    <template #intervalSlot>
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template #toggleSlot>
      <button
        v-if="isUnlocked"
        class="o-autobuyer-btn"
        @click="toggleMode"
      >
        {{ modeDisplay }}
      </button>
      <button
        v-else
        class="o-autobuyer-btn o-autobuyer-btn--unavailable"
      >
        도전을 완료하여 모드 바꾸기
      </button>
    </template>
  </AutobuyerBox>
</template>

<style scoped>

</style>
