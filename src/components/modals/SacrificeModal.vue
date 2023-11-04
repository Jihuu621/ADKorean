<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "SacrificeModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      currentMultiplier: new Decimal(),
      nextMultiplier: new Decimal(),
    };
  },
  computed: {
    message() {
      if (Achievement(118).isUnlocked && !Pelle.isDoomed) {
        return `차원 희생은 현재 가지고 있는 제1 반물질 차원에 비례하여 제8 반물질 차원에 배율을 줍니다.`;
      }
      return `차원 희생은 제1-7 반물질 차원을 모두 제거합니다. 
      제1 반물질 차원에 비례하여 8번째 반물질 차원에 배율이 부여되며, 
      생산량을 회복하는 데 시간이 일부 걸릴 수 있습니다.`;
    },
    multiplierText() {
      return `현재 배율은 ${formatX(this.currentMultiplier, 2, 2)}이며 차원 희생 이후에는 ${formatX(this.nextMultiplier, 2, 2)}가 될 것입니다.`;
    },
  },
  methods: {
    update() {
      this.currentMultiplier.copyFrom(Sacrifice.totalBoost);
      this.nextMultiplier.copyFrom(Sacrifice.nextBoost.times(Sacrifice.totalBoost));
    },
    handleYesClick() {
      sacrificeReset();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="sacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      차원 희생
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-message__text">
      {{ multiplierText }}
      <br>
    </div>
  </ModalWrapperChoice>
</template>
