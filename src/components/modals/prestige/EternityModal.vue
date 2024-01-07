<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "EternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      exitingEC: false,
      startingIP: new Decimal(),
      gainedEternityPoints: new Decimal(),
      gainedEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return PlayerProgress.eternityUnlocked()
        ? `영원은 도전과제, 도전 기록 및 통계 탭의 일반 헤더 아래에 있는 모든 항목을 제외한 모든 걸 초기화합니다.`
        : `영원은 도전과제, 도전 기록 및 통계 탭의 일반 헤더 아래에 있는 모든 항목을 제외한 모든 걸 초기화합니다.
         또한 영원 포인트(EP)를 획득하고 다양한 업그레이드를 잠금 해제할 수 있습니다.`;
    },
    gainedEPOnEternity() {
      return `당신은 영원 ${this.gainedEternities}번과 ${quantify("EP", this.gainedEternityPoints, 2)}를 얻게 됩니다.`;
    },
    startWithIP() {
      return this.startingIP.gt(0)
        ? `당신은 다음 영원을 ${quantify("IP", this.startingIP, 2)}를 보유한 상태로 시작하게 됩니다.`
        : ``;
    },
    eternityChallenge() {
      const ec = EternityChallenge.current;
      if (ec.isFullyCompleted) {
        return `Eternity Challenge ${ec.id} is already fully completed.`;
      }
      if (!Perk.studyECBulk.isBought) {
        return `You will gain one completion of Eternity Challenge ${ec.id}.`;
      }
      const gainedCompletions = ec.gainedCompletionStatus.gainedCompletions;
      return `You will gain ${quantifyInt("completion", gainedCompletions)} for Eternity Challenge ${ec.id}.`;
    }
  },
  methods: {
    update() {
      this.exitingEC = EternityChallenge.isRunning;
      this.startingIP = Currency.infinityPoints.startingValue;
      this.gainedEternityPoints = gainedEternityPoints();
      this.gainedEternities = gainedEternities();
    },
    handleYesClick() {
      animateAndEternity();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    :header="exitingEC ? 'Complete Eternity Challenge' : '영원에 도달하려 합니다.'"
    :message="message"
    :gained-resources="gainedEPOnEternity"
    :starting-resources="startWithIP"
    :confirm-fn="handleYesClick"
    :alternate-condition="exitingEC"
    :alternate-text="exitingEC ? eternityChallenge : undefined"
    confirm-option="eternity"
  />
</template>
