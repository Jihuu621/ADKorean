<script>
import AwayProgressOptionsEntry from "@/components/modals/options/AwayProgressOptionsEntry";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";

export default {
  name: "AwayProgressOptionsModal",
  components: {
    AwayProgressOptionsEntry,
    ModalWrapperOptions,
  },
  computed: {
    all() {
      return AwayProgressTypes.showOption;
    }
  },
};
</script>

<template>
  <ModalWrapperOptions class="l-wrapper">
    <template #header>
      오프라인 진행 설정
    </template>
    <div class="c-modal-options__button-container">
      <AwayProgressOptionsEntry
        v-for="name of all"
        :key="name"
        :name="name"
      />
    </div>
    참고: 켜짐 표시가 되어 있는 자원들도 오프라인이었을 때 획득해야만 표시됩니다.
  </ModalWrapperOptions>
</template>

<style scoped>
.l-wrapper {
  width: 75rem;
}
</style>