<script>
export default {
  name: "AutobuyerModeButton",
  props: {
    autobuyer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mode: AUTOBUYER_MODE.BUY_SINGLE
    };
  },
  computed: {
    modeDisplay() {
      switch (this.mode) {
        case AUTOBUYER_MODE.BUY_SINGLE: return "1개씩 구매";
        case AUTOBUYER_MODE.BUY_10: return "최대 구매";
      }
      throw "Unknown Dimension Autobuyer mode";
    }
  },
  methods: {
    update() {
      this.mode = this.autobuyer.mode;
    },
    toggleMode() {
      this.autobuyer.toggleMode();
      this.update();
    }
  }
};
</script>

<template>
  <button
    class="o-autobuyer-btn o-autobuyer-btn--tiny"
    @click="toggleMode"
  >
    {{ modeDisplay }}
  </button>
</template>

<style scoped>

</style>
