<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakInfinityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      return `무한을 돌파하면 반물질을 ${infinity}개 이상으로 모을 수 있습니다.
        차원과 틱스피드 업그레이드의 가격은 반물질이 ${infinity}을 넘어가면 더욱 빠르게 상승합니다.
        당신이 생산한 반물질이 ${infinity} 이상일 경우 반물질의 개수의 비례하여 무한 포인트를 추가로 얻습니다.`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      breakInfinity();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      무한을 돌파하려 합니다.
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      Break
    </template>
  </ModalWrapperChoice>
</template>
