<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "HardResetModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      input: ""
    };
  },
  computed: {
    willHardReset() {
      return this.input === "Shrek is love, Shrek is life";
    },
    hasExtraNG() {
      return player.records.fullGameCompletions > 0;
    },
    hasSpeedrun() {
      return player.speedrun.isUnlocked;
    }
  },
  destroyed() {
    if (this.willHardReset) SecretAchievement(38).unlock();
  },
  methods: {
    hardReset() {
      if (this.willHardReset) GameStorage.hardReset();
      this.input = "";
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!willHardReset"
    :show-confirm="willHardReset"
    confirm-class="o-primary-btn--width-medium c-modal__confirm-btn c-modal-hard-reset-btn"
    @confirm="hardReset"
  >
    <template #header >
      <b style="color:red">하드 리셋</b>
    </template>
    <div class="c-modal-message__text">
      이 세이브 파일을 하드 리셋하기 위해 확인 절차를 거쳐야 합니다.
      <span class="c-modal-hard-reset-danger">하드 리셋을 해도 숨겨진 요소는 아무것도 없습니다!</span>
      "Shrek is love, Shrek is life"를 입력하여 계속하십시오.
      <div class="c-modal-hard-reset-danger">
        이 작업은 세이브를 완전히 삭제합니다.
        <span v-if="hasExtraNG">
          <br>
          또한, 게임을 완료하여 얻은 글리프 장식들도 전부 사라집니다.
        </span>
        <span v-if="hasSpeedrun">
          <br>
          또한 스피드런을 실행할 수 없게 됩니다. 스피드런을 다시 시작하려면 "스피드런 시작" 버튼을 대신 사용하십시오.
        </span>
      </div>
    </div>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-hard-reset__input"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-hard-reset-info">
      <div
        v-if="willHardReset"
        class="c-modal-hard-reset-danger"
      >
        문구가 확인되었습니다. - 이것은 마지막 경고입니다. 이후에는 다시 되돌릴 수 없습니다!
      </div>
      <div v-else>
        문구를 정확하게 입력해주세요.
      </div>
    </div>
    <template #confirm-text>
      하드 리셋
    </template>
  </ModalWrapperChoice>
</template>
