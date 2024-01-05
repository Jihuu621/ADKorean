<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitChallengeModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    challengeName: {
      type: String,
      required: true,
    },
    normalName: {
      type: String,
      required: true,
    },
    hasHigherLayers: {
      type: Boolean,
      required: true,
    },
    exitFn: {
      type: Function,
      required: true,
    }
  },
  computed: {
    isCelestial() {
      return this.challengeName.match("Reality");
    },
    isRestarting() {
      return this.isCelestial ? player.options.retryCelestial : player.options.retryChallenge;
    }
  },
  methods: {
    handleYesClick() {
      this.exitFn();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="exitChallenge"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ challengeName }}을(를) {{ isRestarting ? "재시작하려" : "중단하려" }} 합니다.
    </template>

    <div class="c-modal-message__text">
      <span v-if="isRestarting">
        이대로 계속한다면 당신은 즉시  {{ challengeName }}을 재시작하게 됩니다.
      </span>
      <span v-else>
        이는 당신을 기본 {{ normalName }}으로 아무 제약 없이 되돌려보냅니다.
      </span>
      <span v-if="hasHigherLayers">
        상위 레이어에서 발현되는 모든 제약들은 그대로 유지됩니다.
      </span>
    </div>
    <template #confirm-text>
      {{ isRestarting ? "재시작" : "중단" }}
    </template>
  </ModalWrapperChoice>
</template>
