<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "DimensionBoostModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    topLabel() {
      return `당신은 차원을 가속하려 합니다`;
    },
    message() {
      const keepDimensions = Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied ||
        PelleUpgrade.dimBoostResetsNothing.isBought
        ? `반물질 및 반물질 차원 초기화를 방지하는 업그레이드로 인해 아무것도 초기화되지 않습니다. 평소와 같이 차원 가속을 통해 배율을 얻을 수 있습니다.`
        : `이는 당신의 반물질과 반물질 차원을 전부 초기화합니다. 계속하시겠습니까?`;

      return `${keepDimensions}`;
    },
  },
  methods: {
    handleYesClick() {
      requestDimensionBoost(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="dimensionBoost"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
