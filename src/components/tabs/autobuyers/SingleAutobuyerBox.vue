<script>
import AutobuyerInput from "./AutobuyerInput";
import AutobuyerIntervalLabel from "./AutobuyerIntervalLabel";
import AutobuyerSingleToggleLabel from "./AutobuyerSingleToggleLabel";

// This component contains a single "special" autobuyer toggle (eg. sacrifice, annihilation, 2xIP etc.)
export default {
  name: "SingleAutobuyerBox",
  components: {
    AutobuyerSingleToggleLabel,
    AutobuyerIntervalLabel,
    AutobuyerInput
  },
  props: {
    autobuyer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      // Used to hide the input box if the game is auto-sacrificing every tick without resource resets
      isHiddenSacrifice: false,
    };
  },
  computed: {
    name() {
      if (this.autobuyer.name == "Dimensional Sacrifice") {return "차원 희생";}
      else if (this.autobuyer.name == "Replicanti Galaxy") {return "복제자 은하";}
      else if (this.autobuyer.name == "Time Theorem") {return "시간 정리";}
      else if (this.autobuyer.name == "Infinity Point Multiplier") {return "무한 포인트 배율";}
      else if (this.autobuyer.name == "Eternity Point Multiplier") {return "영원 포인트 배율";}
    },
    isSacrifice() {
      return this.name === "Dimensioanl Sacrifice";
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.autobuyer.isUnlocked;
      this.isHiddenSacrifice = this.isSacrifice && Achievement(118).canBeApplied;
    },
  }
};
</script>

<template>
  <span
    v-if="isUnlocked"
    class="c-autobuyer-box-row"
  >
    <AutobuyerSingleToggleLabel :autobuyer="autobuyer" />
    <div>
      {{ name }}
      <AutobuyerIntervalLabel :autobuyer="autobuyer" />

      <b
        v-if="isHiddenSacrifice"
        class="c-autobuyer-box__small-text"
      >
        자동 (도전과제 118)
      </b>
      <span
        v-else-if="autobuyer.hasInput"
        class="c-autobuyer-box__small-text"
      >
        배율:
        <AutobuyerInput
          class="c-small-autobuyer-input"
          :autobuyer="autobuyer"
          :type="autobuyer.inputType"
          :property="autobuyer.inputEntry"
        />
      </span>
    </div>
  </span>
</template>

<style scoped>

</style>
