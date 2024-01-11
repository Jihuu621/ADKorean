<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "InfinityChallengeStartModal",
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
      return InfinityChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isCompleted;
    },
    message() {
      return `당신은 가능하다면 빅 크런치를 실행하고 도전 내에서 각각의 조건과 함께 새로운 무한을 시작하게 됩니다.
        이 도전을 완료하기 위해서는 도전 안에서 ${format(InfinityChallenge(this.id).goal)} 반물질에 도달해야 하며,
        업그레이드와 상관 없이 차원 가속이나 반물질 은하를 보유하지 않은 채로 시작합니다.`;
    },
    entranceLabel() {
      return `무한 도전 ${this.id}을 시작하려 합니다.`;
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
      this.challenge.start();
    },
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
