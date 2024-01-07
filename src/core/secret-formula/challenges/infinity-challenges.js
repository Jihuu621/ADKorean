import { DC } from "../../constants";

export const infinityChallenges = [
  {
    id: 1,
    description: `일반 도전 9, 12를 제외한 모든 일반 도전의 조건이 동시에 적용됩니다.`,
    goal: DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => `완료한 무한 도전의 개수만큼 무한 차원을 ${formatX(1.3, 1, 1)}배 증폭시킵니다.`,
      effect: () => Math.pow(1.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)
    },
    unlockAM: DC.E2000,
  },
  {
    id: 2,
    description: () => `제8 반물질 차원을 구매한 순간부터 ${formatInt(400)}밀리초마다 자동으로 차원 희생이 이루어집니다.`,
    goal: DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => `차원 희생 자동구매기를 제공하며, 차원 희생의 배율 폭이 더 커집니다.
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false })} ➜
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })}`,
    },
    unlockAM: DC.E11000,
  },
  {
    id: 3,
    description: () =>
      `틱스피드 업그레이드가 항상 ${formatX(1)}배지만, 틱스피드 업그레이드를 구매하면 반물질 은하의 수에 따라 모든 반물질 차원이 증폭됩니다.`,
    goal: DC.E5000,
    isQuickResettable: false,
    effect: () => Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: `반물질 은하와 틱스피드 구매 횟수에 따라 반물질 차원이 증폭됩니다.`,
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(1.05 + (player.galaxies * 0.005), Tickspeed.continuumValue)
        : Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought)),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: DC.E12000,
  },
  {
    id: 4,
    description: () =>
      `가장 마지막으로 구매한 차원만이 정상적인 생산력을 가지며, 나머지 차원들은 생산력이 하락합니다. (${formatPow(0.25, 2, 2)})`,
    goal: DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => `모든 반물질 차원에 ${formatPow(1.05, 2, 2)} 승수가 적용됩니다.`,
      effect: 1.05
    },
    unlockAM: DC.E14000,
  },
  {
    id: 5,
    description:
      `제1-4 반물질 차원을 구입하면 그보다 싼 모든 가격이 상승하고, 제5-8 반물질 차원을 구매하면 그보다 비싼 모든 가격이 상승합니다.`,
    goal: DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () =>
        `모든 은하가 ${formatPercents(0.1)} 강해지고 반물질 은하와 차원 가속의 요구조건이 ${formatInt(1)} 감소합니다.`,
      effect: 1.1
    },
    unlockAM: DC.E18000,
  },
  {
    id: 6,
    description: () =>
      `제2 반물질 차원을 구매하면 빠르게 증가하는 물질이 생기며, 물질의 수만큼 반물질 차원의 배율이 나누어집니다.`,
    goal: DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: "틱스피드에 비례하여 무한 차원의 생산량을 증가시킵니다.",
      effect: () => Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E22500,
  },
  {
    id: 7,
    description: () => {
      // Copied from DimBoost.power; this is the base amount before any multipliers. Post-eternity this isn't
      // necessarily 2.5x by the time the player sees this challenge; it's probably most accurate to say what it
      // currently is, and this phrasing avoids 10x ➜ 10x with the old description.
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return `반물질 은하를 구매할 수 없지만, 차원 가속 배율이 ${formatX(10)}배 증가합니다. (현재 차원 가속 배율: ${formatX(mult, 2, 1)})`;
    },
    goal: DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => `차원 가속의 배율이 ${formatX(4)}배 상승합니다.`,
      effect: 4
    },
    unlockAM: DC.E23000,
  },
  {
    id: 8,
    description: () =>
      `무언가를 구매하면 생산력이 ${formatPercents(1)}가 된 후 빠르게 감소합니다.`,
    goal: DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Math.max(0, player.records.thisInfinity.time - player.records.thisInfinity.lastBuyTime)),
    reward: {
      description:
        "제2-7 반물질 차원이 제1, 8 반물질 차원의 배율을 일부 적용받습니다.",
      effect: () => AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E28000,
  },
];
