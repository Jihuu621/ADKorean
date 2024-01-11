<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EternityChallengeStartModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    challenge() {
      return EternityChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isFullyCompleted;
    },
    message() {
      return `당신은 가능하다면 영원에 도달하고 도전 내에서 각각의 조건과 함께 새로운 영원을 시작하게 됩니다.
        이 도전을 완료하기 위해서는 도전 안에서 ${format(this.challenge.currentGoal)} 무한 포인트에 도달해야 합니다.
        또한, 영원 도전은 최대 ${formatInt(5)}번 완료할 수 있으며, 완료할 때마다 보상이 증가하지만, 도전이 더욱 어려워집니다.`;
    },
    entranceLabel() {
      return `영원 도전 ${this.id}를 시작하려 합니다.`;
    },
    reward() {
      let rewardDescription = this.challenge._config.reward.description;
      if (typeof rewardDescription === "function") {
        rewardDescription = rewardDescription();
      }
      return `도전 완료에 따른 보상은 다음과 같습니다. : ${rewardDescription}`;
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description;
      if (typeof conditionOfChallenge === "function") {
        conditionOfChallenge = conditionOfChallenge();
      }
      return conditionOfChallenge;
    }
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose);
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose);
  },
  methods: {
    handleYesClick() {
      this.challenge.start(true);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="challenges"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br><br>
      {{ condition }}
    </div>
    <div
      v-if="!challengeIsCompleted"
      class="c-modal-message__text"
    >
      <br>
      {{ reward }}
    </div>
    <template #confirm-text>
      시작
    </template>
  </ModalWrapperChoice>
</template>
