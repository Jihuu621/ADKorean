import { DC } from "../../constants";

function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost * Math.pow(config.costIncrease, player.infinityRebuyables[config.id]),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.infinityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect ||
      (value => {
        const afterECText = config.afterEC ? config.afterEC() : "";
        return value === config.maxUpgrades
          ? `현재: ${formatX(10 - value)} ${afterECText}`
          : `현재: ${formatX(10 - value)} | 다음: ${formatX(10 - value - 1)}`;
      }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakInfinityUpgrades = {
  totalAMMult: {
    id: "totalMult",
    cost: 1e4,
    description: "누적된 반물질 생산량에 따라 반물질 차원에 배율이 적용됩니다.",
    effect: () => Math.pow(player.records.totalAntimatter.exponent + 1, 0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  currentAMMult: {
    id: "currentMult",
    cost: 5e4,
    description: "현재 보유중인 반물질 양에 따라 반물질 차원에 배율이 적용됩니다.",
    effect: () => Math.pow(Currency.antimatter.exponent + 1, 0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  galaxyBoost: {
    id: "postGalaxy",
    cost: 5e11,
    description: () => `모든 은하들이 ${formatPercents(0.5)} 더 강해집니다.`,
    effect: 1.5
  },
  infinitiedMult: {
    id: "infinitiedMult",
    cost: 1e5,
    description: "반물질 차원에 무한 횟수에 따라 배율이 적용됩니다.",
    effect: () => 1 + Currency.infinitiesTotal.value.pLog10() * 10,
    formatEffect: value => formatX(value, 2, 2)
  },
  achievementMult: {
    id: "achievementMult",
    cost: 1e6,
    description: "완료한 도전과제의 수에 비례하여 반물질 차원에 배율이 적용됩니다.",
    effect: () => Math.max(Math.pow((Achievements.effectiveCount - 30), 3) / 40, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
  slowestChallengeMult: {
    id: "challengeMult",
    cost: 1e7,
    description: "가장 느린 도전 기록에 따라 반물질 차원에 배율이 적용됩니다.",
    effect: () => Decimal.clampMin(50 / Time.worstChallenge.totalMinutes, 1),
    formatEffect: value => formatX(value, 2, 2),
    hasCap: true,
    cap: DC.D3E4
  },
  infinitiedGen: {
    id: "infinitiedGeneration",
    cost: 2e7,
    description: "가장 빠른 무한 기록에 따라 무한을 자동으로 생산합니다.",
    effect: () => player.records.bestInfinity.time,
    formatEffect: value => {
      if (value === Number.MAX_VALUE && !Pelle.isDoomed) return "No Infinity generation";
      let infinities = DC.D1;
      infinities = infinities.timesEffectsOf(
        RealityUpgrade(5),
        RealityUpgrade(7),
        Ra.unlocks.continuousTTBoost.effects.infinity
      );
      infinities = infinities.times(getAdjustedGlyphEffect("infinityinfmult"));
      const timeStr = Time.bestInfinity.totalMilliseconds <= 50
        ? `${TimeSpan.fromMilliseconds(100).toStringShort()} (capped)`
        : `${Time.bestInfinity.times(2).toStringShort()}`;
      return `${timeStr}마다 무한 ${infinities}번`;
    }
  },
  autobuyMaxDimboosts: {
    id: "autobuyMaxDimboosts",
    cost: 5e9,
    description: "차원 가속 자동구매기 최대 구매 업그레이드를 해금합니다."
  },
  autobuyerSpeed: {
    id: "autoBuyerUpgrade",
    cost: 1e15,
    description: "일반 도전을 통해 해금 및 업그레이드한 자동구매기가 2배 빨라집니다."
  },
  tickspeedCostMult: rebuyable({
    id: 0,
    initialCost: 1e6,
    costIncrease: 5,
    maxUpgrades: 8,
    description: "무한 이후 틱스피드 업그레이드의 가격 상승률을 줄입니다.",
    afterEC: () => (EternityChallenge(11).completions > 0
      ? `EC11 이후: ${formatX(Player.tickSpeedMultDecrease, 2, 2)}`
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate()
  }),
  dimCostMult: rebuyable({
    id: 1,
    initialCost: 1e7,
    costIncrease: 5e3,
    maxUpgrades: 7,
    description: "무한 이후 반물질 차원의 가격 상승률을 줄입니다.",
    afterEC: () => (EternityChallenge(6).completions > 0
      ? `EC6 이후: ${formatX(Player.dimensionMultDecrease, 2, 2)}`
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate()
  }),
  ipGen: rebuyable({
    id: 2,
    initialCost: 1e7,
    costIncrease: 10,
    maxUpgrades: 10,
    effect: value => Player.bestRunIPPM.times(value / 20),
    description: () => {
      let generation = `${formatInt(5 * player.infinityRebuyables[2])}%`;
      if (!BreakInfinityUpgrade.ipGen.isCapped) {
        generation += ` ➜ ${formatInt(5 * (1 + player.infinityRebuyables[2]))}%`;
      }
      return `마지막 10번의 무한 중 가장 높은 IP/분 기록의 ${generation} 속도로 IP를 생산합니다.`;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} IP/min`,
    noLabel: false
  })
};
