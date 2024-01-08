<script>
import NewTimeDimensionRow from "./ModernTimeDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "NewTimeDimensionsTab",
  components: {
    PrimaryButton,
    NewTimeDimensionRow
  },
  data() {
    return {
      totalUpgrades: 0,
      multPerTickspeed: 0,
      tickspeedSoftcap: 0,
      timeShards: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      showLockedDimCostNote: true,
    };
  },
  computed: {
    costIncreases: () => TimeDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !TimeDimension(8).isUnlocked && player.realities >= 1;
      this.totalUpgrades = player.totalTickGained;
      this.multPerTickspeed = FreeTickspeed.multToNext;
      this.tickspeedSoftcap = FreeTickspeed.softcap;
      this.timeShards.copyFrom(Currency.timeShards);
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards);
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerSecond);
      this.incomeType = EternityChallenge(7).isRunning ? "Eighth Infinity Dimensions" : "Time Shards";
      this.areAutobuyersUnlocked = Autobuyer.timeDimension(1).isUnlocked;
    },
    maxAll() {
      tryUnlockTimeDimensions();
      maxAllTimeDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllTimeDims();
    }
  }
};
</script>

<template>
  <div class="l-time-dim-tab l-centered-vertical-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        최대 구매
      </PrimaryButton>
      <PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
      전체 자동구매기 토글
      </PrimaryButton>
    </div>
    <div>
      <p>
        당신은 시간 파편 <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span>개로 
        틱스피드 업그레이드 <span class="c-time-dim-description__accent">{{ formatInt(totalUpgrades) }}</span>개를 얻었습니다. 

      </p>
      <p>
        다음 틱스피드 업그레이드의 시간 파편 요구량은
        <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span>이며, 틱스피드 업그레이드를 얻은 횟수만큼
        <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span>씩 요구량이 증가합니다.
      </p>
    </div>
    <div>
      시간 파편으로 인한 틱스피드 업그레이드의 갯수가 {{ formatInt(tickspeedSoftcap) }}개 이상이 되면 요구되는 시간 파편의 양이 더욱 많아집니다.
    </div>
    <div>현재 초당 시간 파편을 {{ format(shardsPerSecond, 2, 0) }}개 얻고 있습니다.</div>
    <div class="l-dimensions-container">
      <NewTimeDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
        :are-autobuyers-unlocked="areAutobuyersUnlocked"
      />
    </div>
    <div>
      시간 차원의 가격은 {{ format(costIncreases[0], 2, 2) }} EP와
      {{ format(costIncreases[1]) }} EP에서 크게 상승합니다.
      <br>
      또한, {{ format(costIncreases[2]) }} EP 이상이 된다면 더욱 크게 상승하게 됩니다.
      <br>
      <div v-if="showLockedDimCostNote">
        쉬프트 키를 눌러 잠긴 차원의 가격을 확인할 수 있습니다.
      </div>
      
        {{ format(1e8) }}개를 초과하여 구매한 제8 시간 차원은 배율을 더 이상 증가시키지 않습니다.
    </div>
  </div>
</template>
