<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import { TimeTheoremPurchaseType } from "../../../core/time-theorems";

export default {
  name: "AwayProgressOptionsEntry",
  components: {
    ModalOptionsToggleButton,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      setting: false,
      isVisible: false,
    };
  },
  computed: {
    type() {
      return AwayProgressTypes.all[this.name];
    },
    text() {
      if (this.type.formatName == "Antimatter") {return `반물질:`;}
      else if (this.type.formatName == "Dimension Boosts") {return `차원 가속:`;}
      else if (this.type.formatName == "Antimatter Galaxies") {return `반물질 은하:`;}
      else if (this.type.formatName == "Infinities") {return `무한:`;}
      else if (this.type.formatName == "Infinity Points") {return `무한 포인트:`;}
      else if (this.type.formatName == "Replicanti") {return `복제자:`;}
      else if (this.type.formatName == "Replicanti Galaxies") {return `복제자 은하:`;}
      else if (this.type.formatName == "Eternities") {return `영원:`;}
      else if (this.type.formatName == "Eternity Points") {return `영원 포인트:`;}
      else if (this.type.formatName == "Tachyon Particles") {return `타키온 입자:`;}
      else if (this.type.formatName == "Dilated Time") {return `팽창된 시간:`;}
      else if (this.type.formatName == "Time Theorems") {return `시간 정리:`;}
      else if (this.type.formatName == "Tachyon Galaxies") {return `타키온 은하:`;}
      else if (this.type.formatName == "Achievement Amount") {return `완료 도전과제 개수:`;}
      else if (this.type.formatName == "Realities") {return `현실:`;}
      else if (this.type.formatName == "Reality Machines") {return `리얼리티 머신:`;}
      else if (this.type.formatName == "Relic Shards") {return `유물 파편:`;}
      else if (this.type.formatName == "Celestial Memories") {return `셀레스티얼 메모리:`;}
      else if (this.type.formatName == "Imaginary Machines") {return `허수 머신:`;}
      else if (this.type.formatName == "Dark Matter") {return `암흑 물질:`;}
      else if (this.type.formatName == "Dark Energy") {return `암흑 에너지:`;}
      else if (this.type.formatName == "Singularities") {return `특이점:`;}
      else if (this.type.formatName == "Reality Shards") {return `리얼리티 샤드:`;}
      
      
      
      else {return `${this.type.formatName}:`;}
    }
  },
  watch: {
    setting(newValue) {
      this.type.option = newValue;
    },
  },
  methods: {
    update() {
      const type = this.type;
      this.setting = type.option;
      this.isVisible = type.isUnlocked();

      
    }
  },
};
</script>

<template>
  <ModalOptionsToggleButton
    v-if="isVisible"
    v-model="setting"
    :text="text"
  />
</template>
