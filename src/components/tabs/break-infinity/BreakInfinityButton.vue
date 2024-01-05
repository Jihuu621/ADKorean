<script>
export default {
  name: "BreakInfinityButton",
  data() {
    return {
      isBroken: false,
      isUnlocked: false,
      isEnslaved: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-infinity-upgrade-btn": true,
        "o-infinity-upgrade-btn--color-2": true,
        "o-infinity-upgrade-btn--available": this.isUnlocked,
        "o-infinity-upgrade-btn--unavailable": !this.isUnlocked,
        "o-infinity-upgrade-btn--feel-eternity": this.isEnslaved,
        "o-infinity-upgrade-btn--unclickable": this.isBroken && !this.isEnslaved,
      };
    },
    tooltip() {
      if (this.isEnslaved) return "...eons stacked on eons stacked on eons stacked on eons stacked on ...";
      return undefined;
    },
    text() {
      if (this.isEnslaved) return "영원을 느낀다";
      return this.isBroken ? "무한이 돌파되었다." : "무한 돌파";
    }
  },
  methods: {
    update() {
      this.isBroken = player.break;
      this.isUnlocked = Autobuyer.bigCrunch.hasMaxedInterval;
      this.isEnslaved = Enslaved.isRunning;
    },
    clicked() {
      if (this.isEnslaved) Enslaved.feelEternity();
      else if (!this.isBroken && this.isUnlocked) Modal.breakInfinity.show();
    }
  }
};
</script>

<template>
  <button style="font-size:1.5rem;"
    v-tooltip="tooltip"
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
</template>

<style scoped>

</style>
