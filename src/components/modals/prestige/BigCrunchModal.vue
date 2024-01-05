<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "BigCrunchModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedInfinities: new Decimal(),
      gainedInfinityPoints: new Decimal(),
      startingBoosts: 0,
      startingAM: 10,
      willStartWithGalaxy: false
    };
  },
  computed: {
    isFirstInfinity() {
      return !PlayerProgress.infinityUnlocked();
    },
    message() {
      const info = this.isFirstInfinity ? this.firstInfinityInfo : ``;
      return `무한에 도달한다면 모든 반물질, 반물질 차원, 차원 가속, 반물질 은하가 초기화됩니다. ${info}`;
    },
    firstInfinityInfo() {
      return `이에 대한 대가로, 당신은 무한 포인트(IP)를 얻습니다. 이는 여러 업그레이드를 해금하며, '무한' 탭에서 찾을 수 있습니다. 
              또한, 통계 탭에도 새로운 '무한' 통계가 표시됩니다.`;
    },
    ipGainInfo() {
      return `당신은 무한 ${this.gainedInfinities}번과 무한 포인트 ${this.gainedInfinityPoints}개를 얻게 됩니다.`;
    },
    startingResources() {
      const gainedResources = [];
      if (this.startingAM.gte(10)) gainedResources.push(`${quantify("반물질", this.startingAM, 2, 1)}`);
      if (this.startingBoosts > 0) gainedResources.push(`${quantify("차원 가속", this.startingBoosts)}`);
      if (this.willStartWithGalaxy) gainedResources.push(`${quantify("반물질 은하", 1)}`);

      return `당신은 다음 무한을 ${makeEnumeration(gainedResources)}를 보유한 상태로 시작하게 됩니다.`;
    }
  },
  methods: {
    update() {
      this.gainedInfinities = gainedInfinities().round();
      this.gainedInfinityPoints = gainedInfinityPoints().round();
      this.startingBoosts = DimBoost.startingDimensionBoosts;
      this.startingAM = Currency.antimatter.startingValue;
      this.willStartWithGalaxy = InfinityUpgrade.skipResetGalaxy.isBought;
    },
    handleYesClick() {
      bigCrunchResetRequest();
      EventHub.ui.offAll(this);
      if (this.isFirstInfinity) {
        setTimeout(() => Modal.message.show(`이 애니메이션은 수동으로 트리거되는 빅 크런치 이후에 발생합니다. 
        이를 비활성화하려면 옵션 -> 비주얼 탭에서 할 수 있습니다. 이와 같은 애니메이션 설정은 해당 애니메이션을 처음 본 후 언제든지 비활성화할 수 있습니다.`, {}, 3), 2000);
      }
    }
  },
};
</script>

<template>
  <ResetModal
    header="무한에 도달하려 합니다"
    :message="message"
    :gained-resources="ipGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstInfinity"
    :alternate-text="message"
    :confirm-option="isFirstInfinity ? undefined : 'bigCrunch'"
  />
</template>
