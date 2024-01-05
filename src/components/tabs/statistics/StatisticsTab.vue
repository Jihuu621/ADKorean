<script>
import { MatterScale } from "./matter-scale";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StatisticsTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realTimeDoomed: TimeSpan.zero,
      totalAntimatter: new Decimal(0),
      realTimePlayed: TimeSpan.zero,
      timeSinceCreation: 0,
      uniqueNews: 0,
      totalNews: 0,
      secretAchievementCount: 0,
      infinity: {
        isUnlocked: false,
        count: new Decimal(0),
        banked: new Decimal(0),
        projectedBanked: new Decimal(0),
        bankRate: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      eternity: {
        isUnlocked: false,
        count: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      reality: {
        isUnlocked: false,
        count: 0,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        totalTimePlayed: TimeSpan.zero,
        bestRate: new Decimal(0),
        bestRarity: 0,
      },
      matterScale: [],
      lastMatterTime: 0,
      paperclips: 0,
      fullTimePlayed: 0,
    };
  },
  computed: {
    // These are here to avoid extra spaces in-game pre-reality and to get around codefactor 120-char limits in the
    // HTML template due to the fact that adding a linebreak also adds a space
    infinityCountString() {
      const num = this.infinity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("Infinity", num.floor())}`
        : "no Infinities";
    },
    eternityCountString() {
      const num = this.eternity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("Eternity", num.floor())}`
        : "no Eternities";
    },
    fullGameCompletions() {
      return player.records.fullGameCompletions;
    },
    startDate() {
      return Time.toDateTimeString(player.records.gameCreatedTime);
    },
    saveAge() {
      return TimeSpan.fromMilliseconds(this.timeSinceCreation);
    },
  },
  methods: {
    update() {
      const records = player.records;
      this.totalAntimatter.copyFrom(records.totalAntimatter);
      this.realTimePlayed.setFrom(records.realTimePlayed);
      this.fullTimePlayed = TimeSpan.fromMilliseconds(records.previousRunRealTime + records.realTimePlayed);
      this.uniqueNews = NewsHandler.uniqueTickersSeen;
      this.totalNews = player.news.totalSeen;
      this.secretAchievementCount = SecretAchievements.all.filter(a => a.isUnlocked).length;
      this.timeSinceCreation = Date.now() - player.records.gameCreatedTime;

      const progress = PlayerProgress.current;
      const isInfinityUnlocked = progress.isInfinityUnlocked;
      const infinity = this.infinity;
      const bestInfinity = records.bestInfinity;
      infinity.isUnlocked = isInfinityUnlocked;
      if (isInfinityUnlocked) {
        infinity.count.copyFrom(Currency.infinities);
        infinity.banked.copyFrom(Currency.infinitiesBanked);
        infinity.projectedBanked = new Decimal(0).plusEffectsOf(
          Achievement(131),
          TimeStudy(191)
        );
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.time)).times(60000);
        infinity.hasBest = bestInfinity.time < 999999999999;
        infinity.best.setFrom(bestInfinity.time);
        infinity.this.setFrom(records.thisInfinity.time);
        infinity.bestRate.copyFrom(bestInfinity.bestIPminEternity);
      }

      const isEternityUnlocked = progress.isEternityUnlocked;
      const eternity = this.eternity;
      const bestEternity = records.bestEternity;
      eternity.isUnlocked = isEternityUnlocked;
      if (isEternityUnlocked) {
        eternity.count.copyFrom(Currency.eternities);
        eternity.hasBest = bestEternity.time < 999999999999;
        eternity.best.setFrom(bestEternity.time);
        eternity.this.setFrom(records.thisEternity.time);
        eternity.bestRate.copyFrom(bestEternity.bestEPminReality);
      }

      const isRealityUnlocked = progress.isRealityUnlocked;
      const reality = this.reality;
      const bestReality = records.bestReality;
      reality.isUnlocked = isRealityUnlocked;

      if (isRealityUnlocked) {
        reality.count = Math.floor(Currency.realities.value);
        reality.best.setFrom(bestReality.time);
        reality.bestReal.setFrom(bestReality.realTime);
        reality.this.setFrom(records.thisReality.time);
        reality.totalTimePlayed.setFrom(records.totalTimePlayed);
        // Real time tracking is only a thing once reality is unlocked:
        infinity.thisReal.setFrom(records.thisInfinity.realTime);
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.realTime)).times(60000);
        eternity.thisReal.setFrom(records.thisEternity.realTime);
        reality.thisReal.setFrom(records.thisReality.realTime);
        reality.bestRate.copyFrom(bestReality.RMmin);
        reality.bestRarity = Math.max(strengthToRarity(bestReality.glyphStrength), 0);
      }
      this.updateMatterScale();

      this.isDoomed = Pelle.isDoomed;
      this.realTimeDoomed.setFrom(player.records.realTimeDoomed);
      this.paperclips = player.news.specialTickerData.paperclips;
    },
    formatDecimalAmount(value) {
      return value.gt(1e9) ? format(value, 3) : formatInt(Math.floor(value.toNumber()));
    },
    // Only updates once per second to reduce jitter
    updateMatterScale() {
      if (Date.now() - this.lastMatterTime > 1000) {
        this.matterScale = MatterScale.estimate(Currency.antimatter.value);
        this.lastMatterTime = Date.now();
      }
    },
    realityClassObject() {
      return {
        "c-stats-tab-title": true,
        "c-stats-tab-reality": !this.isDoomed,
        "c-stats-tab-doomed": this.isDoomed,
      };
    }
  },
};
</script>

<template>
  <div class="c-stats-tab">
    <div>
      <PrimaryButton onclick="Modal.catchup.show(0)">
        컨텐츠 요약 확인하기
      </PrimaryButton>
      <div class="c-stats-tab-title c-stats-tab-general">
        일반
      </div>
      <div class="c-stats-tab-general">
        <div>총 {{ format(totalAntimatter, 2, 1) }} 반물질을 만들었습니다.</div>
        <div>당신은 총 {{ realTimePlayed }} 동안 플레이하였습니다. (현실 시간)</div>
        <div v-if="reality.isUnlocked">
          당신의 존재가 {{ reality.totalTimePlayed }} 전에 생성되었습니다. (게임 시간)
        </div>
        <div>
          당신의 세이브는 {{ startDate }}에 만들어졌습니다.
        </div>
        <br>
        <div>
          지금까지 뉴스를 총 {{ totalNews }}개 보았습니다.
        </div>
        <div>
          지금까지 특별한 뉴스를 총 {{ uniqueNews }}개 보았습니다.
        </div>
        <div>
          지금까지 비밀 업적을 총 {{ secretAchievementCount }}개 달성했습니다.
        </div>
        <div v-if="paperclips">
          당신은 아무 쓸모 없는 클립을 {{ paperclips }}개 가지고 있습니다.
        </div>
        <div v-if="fullGameCompletions">
          <br>
          <b>
            당신은 {{ fullGameCompletions }}만에 이 게임을 클리어했습니다.
          </b>
        </div>
      </div>
      <div>
        <br>
        <div class="c-matter-scale-container c-stats-tab-general">
          <div
            v-for="(line, i) in matterScale"
            :key="i"
          >
            {{ line }}
          </div>
          <br v-if="matterScale.length < 2">
          <br v-if="matterScale.length < 3">
        </div>
      </div>
      <br>
    </div>
    <div
      v-if="infinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-infinity">
        무한
      </div>
      <div>
        당신은 <span v-if="eternity.isUnlocked">이번 영원에서</span> 총 {{ infinityCountString }}번 무한에 도달하였습니다. 
      </div>
      <div v-if="infinity.banked.gt(0)">
        현재 무한 {{ infinity.banked.floor() }}개가 저장되어 있습니다.
      </div>
      <div v-if="infinity.hasBest">
      당신의 가장 빠른 무한은 {{ infinity.best.toStringShort() }}입니다.
      </div>
      <div v-else>
        당신은 <span v-if="eternity.isUnlocked">이번 영원에서</span> 가장 빠른 무한 기록이 존재하지 않습니다.
      </div>
      <div>
        당신은 이번 무한에서 {{ infinity.this.toStringShort() }}동안 머물렀습니다.
        <span v-if="reality.isUnlocked">
          ({{ infinity.thisReal.toStringShort() }} 현실 시간)
        </span>
      </div>
      <div>
        <span v-if="eternity.isUnlocked">이번 영원에서</span> 당신의 최대 분당 IP 생산 기록은 {{ format(infinity.bestRate, 2, 2) }} IP/분 입니다.
      </div>
      <br>
    </div>
    <div
      v-if="eternity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-eternity">
        Eternity
      </div>
      <div>
        You have {{ eternityCountString }}<span v-if="reality.isUnlocked"> this Reality</span>.
      </div>
      <div v-if="infinity.projectedBanked.gt(0)">
        You will gain {{ formatDecimalAmount(infinity.projectedBanked.floor()) }}
        {{ pluralize("Banked Infinity", infinity.projectedBanked.floor()) }} on Eternity
        ({{ formatDecimalAmount(infinity.bankRate) }} per minute).
      </div>
      <div v-else-if="infinity.banked.gt(0)">
        You will gain no Banked Infinities on Eternity.
      </div>
      <div v-if="eternity.hasBest">
        Your fastest Eternity was {{ eternity.best.toStringShort() }}.
      </div>
      <div v-else>
        You have no fastest Eternity<span v-if="reality.isUnlocked"> this Reality</span>.
      </div>
      <div>
        You have spent {{ eternity.this.toStringShort() }} in this Eternity.
        <span v-if="reality.isUnlocked">
          ({{ eternity.thisReal.toStringShort() }} real time)
        </span>
      </div>
      <div>
        Your best Eternity Points per minute
        <span v-if="reality.isUnlocked">this Reality </span>
        is {{ format(eternity.bestRate, 2, 2) }}.
      </div>
      <br>
    </div>
    <div
      v-if="reality.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div :class="realityClassObject()">
        {{ isDoomed ? "Doomed Reality" : "Reality" }}
      </div>
      <div>You have {{ quantifyInt("Reality", reality.count) }}.</div>
      <div>Your fastest game-time Reality was {{ reality.best.toStringShort() }}.</div>
      <div>Your fastest real-time Reality was {{ reality.bestReal.toStringShort() }}.</div>
      <div :class="{ 'c-stats-tab-doomed' : isDoomed }">
        You have spent {{ reality.this.toStringShort() }}
        in this {{ isDoomed ? "Armageddon" : "Reality" }}.
        ({{ reality.thisReal.toStringShort() }} real time)
      </div>
      <div
        v-if="isDoomed"
        class="c-stats-tab-doomed"
      >
        You have been Doomed for {{ realTimeDoomed.toStringShort() }}, real time.
      </div>
      <div>
        Your best Reality Machines per minute is {{ format(reality.bestRate, 2, 2) }}.
      </div>
      <div>Your best Glyph rarity is {{ formatRarity(reality.bestRarity) }}.</div>
      <br>
    </div>
  </div>
</template>

<style scoped>
.c-matter-scale-container {
  height: 5rem;
}

.c-stats-tab-general {
  color: var(--color-text);
}

.c-stats-tab-title {
  font-size: 2rem;
  font-weight: bold;
}

.c-stats-tab-subheader {
  height: 15rem;
}

.c-stats-tab-infinity {
  color: var(--color-infinity);
}

.c-stats-tab-eternity {
  color: var(--color-eternity);
}

.c-stats-tab-reality {
  color: var(--color-reality);
}

.c-stats-tab-doomed {
  color: var(--color-pelle--base);
}
</style>