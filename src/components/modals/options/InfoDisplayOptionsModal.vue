<script>
import ModalOptionsToggleButton from "@/components/ModalOptionsToggleButton";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";

export default {
  name: "InfoDisplayOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
  },
  data() {
    return {
      infinityUnlocked: false,
      eternityUnlocked: false,
      realityUnlocked: false,
      alchemyUnlocked: false,

      showPercentage: false,
      achievements: false,
      achievementUnlockStates: false,
      challenges: false,
      studies: false,
      glyphEffectDots: false,
      realityUpgrades: false,
      perks: false,
      alchemy: false,
    };
  },
  computed: {
    fullCompletion() {
      return player.records.fullGameCompletions > 0;
    }
  },
  watch: {
    showPercentage(newValue) {
      player.options.showHintText.showPercentage = newValue;
    },
    achievements(newValue) {
      player.options.showHintText.achievements = newValue;
    },
    achievementUnlockStates(newValue) {
      player.options.showHintText.achievementUnlockStates = newValue;
    },
    challenges(newValue) {
      player.options.showHintText.challenges = newValue;
    },
    studies(newValue) {
      player.options.showHintText.studies = newValue;
    },
    glyphEffectDots(newValue) {
      player.options.showHintText.glyphEffectDots = newValue;
    },
    realityUpgrades(newValue) {
      player.options.showHintText.realityUpgrades = newValue;
    },
    perks(newValue) {
      player.options.showHintText.perks = newValue;
    },
    alchemy(newValue) {
      player.options.showHintText.alchemy = newValue;
    },
  },
  methods: {
    update() {
      const progress = PlayerProgress.current;
      this.infinityUnlocked = this.fullCompletion || progress.isInfinityUnlocked;
      this.eternityUnlocked = this.fullCompletion || progress.isEternityUnlocked;
      this.realityUnlocked = this.fullCompletion || progress.isRealityUnlocked;
      this.alchemyUnlocked = this.fullCompletion || Ra.unlocks.effarigUnlock.canBeApplied;

      const options = player.options.showHintText;
      this.showPercentage = options.showPercentage;
      this.achievements = options.achievements;
      this.achievementUnlockStates = options.achievementUnlockStates;
      this.challenges = options.challenges;
      this.studies = options.studies;
      this.glyphEffectDots = options.glyphEffectDots;
      this.realityUpgrades = options.realityUpgrades;
      this.perks = options.perks;
      this.alchemy = options.alchemy;
    }
  },
};
</script>

<template>
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      정보 디스플레이 설정
    </template>
    <div class="c-modal-options__button-container">
      <ModalOptionsToggleButton
        v-model="showPercentage"
        text="% 획득 보이기:"
      />
      <ModalOptionsToggleButton
        v-model="achievements"
        text="도전과제 ID:"
      />
      <ModalOptionsToggleButton
        v-model="achievementUnlockStates"
        text="도전과제 달성 알림:"
      />
      <ModalOptionsToggleButton
        v-if="infinityUnlocked"
        v-model="challenges"
        text="도전 ID:"
      />
      <ModalOptionsToggleButton
        v-if="eternityUnlocked"
        v-model="studies"
        text="시간 연구 ID:"
      />
      <ModalOptionsToggleButton
        v-if="realityUnlocked"
        v-model="glyphEffectDots"
        text="글리프 효과 도트:"
      />
      <ModalOptionsToggleButton
        v-if="realityUnlocked"
        v-model="realityUpgrades"
        text="현실 업그레이드 이름:"
      />
      <ModalOptionsToggleButton
        v-if="realityUnlocked"
        v-model="perks"
        text="퍼크 ID:"
      />
      <ModalOptionsToggleButton
        v-if="alchemyUnlocked"
        v-model="alchemy"
        text="연금술 재료 갯수:"
      />
    </div>
    참고: 위에 표시된 모든 요소들은 쉬프트 키를 누르고 있는 동안 표시됩니다.
  </ModalWrapperOptions>
</template>
