<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ReplicantiGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      replicanti: new Decimal(),
      divideReplicanti: false,
      canBeBought: 0,
    };
  },
  computed: {
    topLabel() {
      return `복제자 은하를 ${this.canBeBought}개 구매하려 합니다.`;
    },
    message() {
      const reductionString = this.divideReplicanti
        ? `현재 보유중인 복제자를  ${format(Number.MAX_VALUE, 2, 2)}에 구매할 복제자 은하의 갯수를 곱한 값만큼 나누게 됩니다
          (${format(this.replicanti, 2, 2)} to
          ${format(this.replicanti.divide(Decimal.NUMBER_MAX_VALUE.pow(this.canBeBought)), 2, 2)})`
        : `복제자의 갯수가 ${formatInt(1)}로 되돌아갑니다`;
      return `복제자 은하는 반물질 은하와 같이 틱스피드 업그레이드의 효율을 증가시킵니다.
      다만, 반물질 은하의 가격을 높히진 않으며, 반물질 은하에 적용되는 모든 배율의 효과를 받지 않습니다.
      복제자 은하를 생성하면 ${reductionString}.`;
    }
  },
  methods: {
    update() {
      this.replicanti.copyFrom(player.replicanti.amount);
      this.divideReplicanti = Achievement(126).isUnlocked;
      this.canBeBought = Replicanti.galaxies.gain;
      if (this.replicanti.lt(Number.MAX_VALUE)) this.emitClose();
    },
    handleYesClick() {
      replicantiGalaxy(false);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="replicantiGalaxy"
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
