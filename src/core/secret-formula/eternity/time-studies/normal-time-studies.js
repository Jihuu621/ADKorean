import { DC } from "../../../constants";

const thisInfinityMult = thisInfinity => {
  // All "this inf time" or "best inf time" mults are * 10
  const scaledInfinity = thisInfinity * 10 + 1;
  const cappedInfinity = Math.min(Math.pow(scaledInfinity, 0.125), 500);
  return DC.D15.pow(Math.log(scaledInfinity) * cappedInfinity);
};
const passiveIPMult = () => {
  const isEffarigLimited = Effarig.isRunning && Effarig.currentStage === EFFARIG_STAGES.ETERNITY;
  const normalValue = Perk.studyPassive.isBought ? 1e50 : 1e25;
  return isEffarigLimited
    ? Math.min(normalValue, Effarig.eternityCap.toNumber())
    : normalValue;
};


/**
 * List of time study specifications and attributes
 * {
 *  @property {Number} id                   Numerical ID shown for each time study in code and in-game
 *  @property {Number} cost                 Amount of available time theorems required to purchase
 *  @property {Number} STcost               Amount of available space theorems required to purchase if needed
 *  @property {Object[]} requirement   Array of Numbers or functions which are checked to determine purchasability
 *  @property {Number} reqType              Number specified by enum in TS_REQUIREMENT_TYPE for requirement behavior
 *  @property {Number[]} requiresST    Array of Numbers indicating which other studies will cause this particular
 *    study to also cost space theorems - in all cases this applies if ANY in the array are bought
 *  @property {function: @return String} description  Text to be shown in-game for the time study's effects
 *  @property {function: @return Number} effect       Numerical value for the effects of a study
 *  @property {String[]} cap     Hard-coded cap for studies which don't scale forever
 *  @property {String} formatEffect   Formatting function for effects, if the default formatting isn't appropriate
 * }
 */
export const normalTimeStudies = [
  {
    id: 11,
    cost: 1,
    // All requirements of an empty array will always evaluate to true, so this study is always purchasable
    requirement: [],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: "제1 시간 차원이 틱스피드에 따라 배율을 받는다.",
    effect: () => {
      const tickspeed = Tickspeed.current.dividedBy(1000);
      const firstPart = tickspeed.pow(0.005).times(0.95);
      const secondPart = tickspeed.pow(0.0003).times(0.05);
      return firstPart.plus(secondPart).reciprocate();
    },
    cap: DC.E2500,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 21,
    cost: 3,
    requirement: [11],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `복제자의 무한 차원 생산량 증가 공식을 개선한다.
      (log2(x)${formatPow(2)})+x${formatPow(0.032, 3, 3)}`,
    effect: () => Replicanti.amount.pow(0.032),
    // This is a special case because the study itself is *added* to the existing formula, but it makes more sense
    // to display a multiplicative increase just like every other study. We need to do the calculation in here in order
    // to properly show only the effect of this study and nothing else
    formatEffect: value => {
      const oldVal = Decimal.pow(Decimal.log2(Replicanti.amount.clampMin(1)), 2);
      const newVal = oldVal.plus(value);
      return formatX(newVal.div(oldVal).clampMin(1), 2, 2);
    }
  },
  {
    id: 22,
    cost: 2,
    requirement: [11],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `복제자의 간격 제한을 ${formatInt(50)}ms ➜ ${formatInt(1)}ms로 낮춘다.`,
    effect: 1
  },
  {
    id: 31,
    cost: 3,
    requirement: [21],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `무한에 도달한 횟수에 비례하는 모든 보너스의 효과가 강해진다. (${formatPow(4)})`,
    effect: 4
  },
  {
    id: 32,
    cost: 2,
    requirement: [22],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: `차원 가속 횟수에 비례하여 무한 횟수를 더욱 많이 얻는다.`,
    effect: () => Math.max(DimBoost.totalBoosts, 1),
    formatEffect: value => formatX(value, 2)
  },
  {
    id: 33,
    cost: 2,
    requirement: [22],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "빅 크런치를 해도 복제자 은하의 절반이 초기화되지 않는다."
  },
  {
    id: 41,
    cost: 4,
    requirement: [31],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 은하들의 수만큼 무한 포인트의 지급량을 ${formatX(DC.D1_2, 1, 1)}배 늘린다`,
    effect: () => DC.D1_2.pow(Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 42,
    cost: 6,
    requirement: [32],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `반물질 은하의 제8 반물질 차원 요구량이 ${formatInt(60)}개가 아닌 ${formatInt(52)}개가 된다.`,
    effect: 52
  },
  {
    id: 51,
    cost: 3,
    requirement: [41, 42],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `무한 포인트를 ${formatX(1e15)}배 더 얻는다.`,
    effect: 1e15
  },
  {
    id: 61,
    cost: 3,
    requirement: [51],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `영원 포인트를 ${formatX(15)}배 더 얻는다.`,
    effect: 15
  },
  {
    id: 62,
    cost: 3,
    requirement: [42, () => Perk.bypassEC5Lock.isBought || EternityChallenge(5).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `복제자 생성 속도가 ${formatInt(3)}배 빨라진다.`,
    effect: 3
  },
  {
    id: 71,
    cost: 4,
    requirement: [61, () => Perk.studyECRequirement.isBought || !EternityChallenge(12).isUnlocked],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "차원 희생이 다른 반물질 차원에게도 작은 영향을 미친다.",
    effect: () => Sacrifice.totalBoost.pow(0.25).clampMin(1),
    cap: DC.E210000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 72,
    cost: 6,
    requirement: [61,
      () => Perk.studyECRequirement.isBought ||
        (!EternityChallenge(11).isUnlocked && !EternityChallenge(12).isUnlocked)],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "차원 희생이 제4 무한 차원에 아주 작은 영향을 미친다.",
    effect: () => Sacrifice.totalBoost.pow(0.04).clampMin(1),
    cap: DC.E30000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 73,
    cost: 5,
    requirement: [61, () => Perk.studyECRequirement.isBought || !EternityChallenge(11).isUnlocked],
    reqType: TS_REQUIREMENT_TYPE.DIMENSION_PATH,
    description: "차원 희생이 제3 시간 차원에 아주 작은 영향을 미친다.",
    effect: () => Sacrifice.totalBoost.pow(0.005).clampMin(1),
    cap: DC.E1300,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 81,
    cost: 4,
    requirement: [71],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `차원 가속의 생산량 증가 효과가 ${formatX(10)}배로 바뀐다.`,
    effect: 10
  },
  {
    id: 82,
    cost: 6,
    requirement: [72],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "차원 가속이 무한 차원에 영향을 미친다.",
    effect: () => DC.D1_0000109.pow(Math.pow(DimBoost.totalBoosts, 2)),
    cap: DC.E1E7,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 83,
    cost: 5,
    requirement: [73],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "시간 차원으로 획득한 틱스피드 업그레이드가 차원 가속에 영향을 준다.",
    effect: () => DC.D1_0004.pow(player.totalTickGained),
    cap: DC.E30,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 91,
    cost: 4,
    requirement: [81],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "반물질 차원이 현재 영원에서 보낸 시간에 따라서 증폭된다.",
    effect: () => Decimal.pow10(Math.min(Time.thisEternity.totalMinutes, 20) * 15),
    cap: DC.E300,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 92,
    cost: 5,
    requirement: [82],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "무한 차원이 가장 빠른 영원 달성 기록에 따라서 증폭된다.",
    effect: () => DC.D2.pow(60 / Math.max(Time.bestEternity.totalSeconds, 2)),
    cap: DC.C2P30,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 93,
    cost: 7,
    requirement: [83],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "시간 차원이 틱스피드 업그레이드 횟수에 따라서 증폭된다.",
    effect: () => Decimal.pow(player.totalTickGained, 0.25).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 101,
    cost: 4,
    requirement: [91],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "반물질 차원이 복제자의 갯수만큼 증폭된다.",
    effect: () => Decimal.max(Replicanti.amount, 1),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 102,
    cost: 6,
    requirement: [92],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "복제자 은하가 복제자 배수를 증폭하게 된다.",
    effect: () => DC.D5.pow(player.replicanti.galaxies),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 103,
    cost: 6,
    requirement: [93],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "복제자 은하의 수 만큼 시간 차원을 증폭하게 된다.",
    effect: () => Math.max(player.replicanti.galaxies, 1),
    formatEffect: value => formatX(value, 2, 0)
  },
  {
    id: 111,
    cost: 12,
    requirement: [101, 102, 103],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => (Achievement(103).canBeApplied
      ? `무한 포인트의 획득 공식이 개선된다. log(x)/${formatFloat(307.8, 1)} ➜ log(x)/${formatInt(285)}`
      : `무한 포인트의 획득 공식이 개선된다. log(x)/${formatInt(308)} ➜ log(x)/${formatInt(285)}`),
    effect: 285
  },
  {
    id: 121,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [122, 123],
    description: () => (Perk.studyActiveEP.isBought
      ? `영원 포인트를 ${formatX(50)}배 더 얻는다.`
      : `최근 10번의 영원을 완료하는데 걸린 시간이 짧을수록 영원 포인트를 더 얻는다. ${PlayerProgress.realityUnlocked() ? " (현실 시간)" : ""}`),
    effect: () => (Perk.studyActiveEP.isBought
      ? 50
      : Math.clamp(250 / Player.averageRealTimePerEternity, 1, 50)),
    formatEffect: value => (Perk.studyActiveEP.isBought ? undefined : formatX(value, 1, 1)),
    cap: 50
  },
  {
    id: 122,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [121, 123],
    description: () => (Perk.studyPassive.isBought
      ? `영원 포인트를 ${formatX(50)}배 더 얻는다.`
      : `영원 포인트를 ${formatX(35)}배 더 얻는다.`),
    effect: () => (Perk.studyPassive.isBought ? 50 : 35)
  },
  {
    id: 123,
    cost: 9,
    STCost: 2,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [121, 122],
    description: "현재 영원에서 보낸 시간에 따라서 더 많은 영원 포인트를 얻는다.",
    effect: () => {
      const perkEffect = TimeSpan.fromMinutes(Perk.studyIdleEP.effectOrDefault(0));
      const totalSeconds = Time.thisEternity.plus(perkEffect).totalSeconds;
      return Math.sqrt(1.39 * totalSeconds);
    },
    formatEffect: value => formatX(value, 1, 1)
  },
  {
    id: 131,
    cost: 5,
    STCost: 8,
    requirement: [121],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [132, 133],
    description: () => (Achievement(138).isUnlocked
      ? `복제자 은하를 ${formatPercents(0.5)}개 더 많이 얻을 수 있다.`
      : `복제자 은하 자동구매기가 비활성화되지만, 복제자 은하를 ${formatPercents(0.5)}개 더 많이 얻을 수 있다.`),
    effect: () => Math.floor(player.replicanti.boughtGalaxyCap / 2)
  },
  {
    id: 132,
    cost: 5,
    STCost: 8,
    requirement: [122],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [131, 133],
    description: () => (Perk.studyPassive.isBought && !Pelle.isDoomed
      ? `복제자 은하가 ${formatPercents(0.4)} 효율적이게 되고 복제자 생성 속도가 ${format(3)}배 빨라진다.`
      : `복제자 은하가 ${formatPercents(0.4)} 효율적이게 된다.`),
    effect: 0.4
  },
  {
    id: 133,
    cost: 5,
    STCost: 8,
    requirement: [123],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [131, 132],
    description: () => (Achievement(138).isUnlocked
      ? `복제자 은하가 ${formatPercents(0.5)} 효율적이게 된다.`
      : `복제자의 갯수가 ${format(Number.MAX_VALUE, 2)}에 도달하기 전까지 복제자의 생성 속도가 ${formatX(10)}배 느려진다. 하지만 복제자 은하가 ${formatPercents(0.5)} 효율적이게 된다.`),
    effect: 0.5
  },
  {
    id: 141,
    cost: 4,
    STCost: 2,
    requirement: [131],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [142, 143],
    description: () => (Perk.studyActiveEP.isBought
      ? `무한 포인트를 ${formatX(DC.E45)}배 더 얻는다.`
      : "현재 무한에서 지낸 시간에 반비례하여 무한 포인트의 획득량을 증폭한다."),
    effect: () => (Perk.studyActiveEP.isBought
      ? DC.E45
      : DC.E45.divide(thisInfinityMult(Time.thisInfinity.totalSeconds)).clampMin(1)),
    formatEffect: value => (Perk.studyActiveEP.isBought ? undefined : formatX(value, 2, 1))
  },
  {
    id: 142,
    cost: 4,
    STCost: 2,
    requirement: [132],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [141, 143],
    description: () => `무한 포인트를 ${formatX(passiveIPMult())}배 더 얻는다.`,
    effect: passiveIPMult,
    cap: () => (Effarig.eternityCap === undefined ? undefined : Effarig.eternityCap.toNumber())
  },
  {
    id: 143,
    cost: 4,
    STCost: 2,
    requirement: [133],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [141, 142],
    description: "현재 무한에서 지낸 시간에 비례하여 무한 포인트의 획득량을 증폭한다.",
    effect: () => {
      const perkEffect = TimeSpan.fromMinutes(Perk.studyIdleEP.effectOrDefault(0));
      const totalSeconds = Time.thisInfinity.plus(perkEffect).totalSeconds;
      return thisInfinityMult(totalSeconds);
    },
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  {
    id: 151,
    cost: 8,
    requirement: [141, 142, 143],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 시간 차원이 ${formatX(1e4)}배 증폭된다.`,
    effect: 1e4
  },
  {
    id: 161,
    cost: 7,
    requirement: [151],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 반물질 차원이 ${formatX(DC.E616)}배 증폭된다.`,
    effect: () => DC.E616
  },
  {
    id: 162,
    cost: 7,
    requirement: [151],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `모든 무한 차원이 ${formatX(1e11)}배 증폭된다.`,
    effect: 1e11
  },
  {
    id: 171,
    cost: 15,
    requirement: [161, 162],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `다음 틱스피드 업그레이드를 위한 시간 파편의 요구량의 증가 속도가 감소한다.
      ${formatX(1.33, 0, 2)} ➜ ${formatX(1.25, 0, 2)}`,
    effect: () => TS171_MULTIPLIER
  },
  {
    id: 181,
    cost: 200,
    requirement: [171,
      () => EternityChallenge(1).completions > 0 || Perk.bypassEC1Lock.isBought,
      () => EternityChallenge(2).completions > 0 || Perk.bypassEC2Lock.isBought,
      () => EternityChallenge(3).completions > 0 || Perk.bypassEC3Lock.isBought],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `현재 획득할 수 있는 무한 포인트의 ${formatPercents(0.01)}를 매초 획득한다.`,
    effect: () => gainedInfinityPoints().times(Time.deltaTime / 100)
      .timesEffectOf(Ra.unlocks.continuousTTBoost.effects.autoPrestige)
  },
  {
    id: 191,
    cost: 400,
    requirement: [181, () => EternityChallenge(10).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `영원 시 영구적으로 무한 횟수의 ${formatPercents(0.05)}를 저장한다.`,
    effect: () => Currency.infinities.value.times(0.05).floor()
  },
  {
    id: 192,
    cost: 730,
    requirement: [181, () => EternityChallenge(10).completions > 0, () => !Enslaved.isRunning],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => (Enslaved.isRunning
      ? "이 현실에서 복제자를 만들 공간이 충분하지 않다."
      : `복제자를 ${format(replicantiCap(), 2, 1)}개 이상 획득할 수 있지만, 복제자 갯수가 많을수록 복제자의 생성 속도가 느려진다.`)
  },
  {
    id: 193,
    cost: 300,
    requirement: [181, () => EternityChallenge(10).completions > 0],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: "반물질 차원이 영원 횟수에 비례하여 증폭된다.",
    effect: () => (DC.E13000.pow(Currency.eternities.value.div(1e6).clampMax(1))),
    cap: DC.E13000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 201,
    cost: 900,
    requirement: [192],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "첫번째 시간 연구 분기점에서 하나의 길을 더 고를 수 있다."
  },
  {
    id: 211,
    cost: 120,
    requirement: [191],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `차원 가속의 가격 상승 가속화가 ${formatInt(5)}개 만큼 미뤄진다.`,
    effect: 5
  },
  {
    id: 212,
    cost: 150,
    requirement: [191],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "모든 은하들의 성능이 시간 파편의 갯수에 비례해 증가한다.",
    effect: () => Math.pow(Currency.timeShards.value.clampMin(2).log2(), 0.005),
    cap: 1.1,
    formatEffect: value => `+${formatPercents(value - 1, 3)}`
  },
  {
    id: 213,
    cost: 200,
    requirement: [193],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: () => `복제자 생성 속도가 ${formatInt(20)}배 빨라진다.`,
    effect: 20
  },
  {
    id: 214,
    cost: 120,
    requirement: [193],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    description: "차원 희생이 제8 반물질 차원을 더욱 많이 증폭한다.",
    effect: () => {
      const totalBoost = Sacrifice.totalBoost;
      const firstPart = totalBoost.pow(7.6).clampMaxExponent(44000);
      const secondPart = totalBoost.pow(1.05).clampMaxExponent(120000);
      return firstPart.times(secondPart);
    },
    cap: DC.E164000,
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 221,
    cost: 900,
    STCost: 4,
    requirement: [211],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [222],
    description: "차원 가속 횟수에 비례하여 시간 차원이 증폭된다.",
    effect: () => DC.D1_0025.pow(DimBoost.totalBoosts),
    formatEffect: value => formatX(value, 2, 1)
  },
  {
    id: 222,
    cost: 900,
    STCost: 4,
    requirement: [211],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [221],
    description: () => `차원 가속 구매시 가격 상승량이 ${formatInt(2)}개 더 감소한다.`,
    effect: 2
  },
  {
    id: 223,
    cost: 900,
    STCost: 4,
    requirement: [212],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [224],
    description: () => `먼 반물질 은하의 가격 상승이 은하 ${formatInt(7)}개만큼 늦춰진다.`,
    effect: 7
  },
  {
    id: 224,
    cost: 900,
    STCost: 4,
    requirement: [212],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [223],
    description() {
      const effect = TimeStudy(224).effectValue;
      return `먼 반물질 은하의 가격 상승이 은하 ${effect}개만큼 늦춰진다.
        ( ${formatInt(2000)}개의 차원 가속 당 ${formatInt(1)}개)`;
    },
    effect: () => Math.floor(DimBoost.totalBoosts / 2000)
  },
  {
    id: 225,
    cost: 900,
    STCost: 4,
    requirement: [213],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [226],
    description: "복제자의 갯수에 따라서 복제자 은하를 추가로 얻는다.",
    effect: () => Math.floor(Replicanti.amount.exponent / 1000),
    formatEffect: value => `+${formatInt(value)} RG`
  },
  {
    id: 226,
    cost: 900,
    STCost: 4,
    requirement: [213],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [225],
    description: "복제자 은하의 최대 보유 갯수에 비례하여 복제자 은하를 추가로 얻는다.",
    effect: () => Math.floor(player.replicanti.boughtGalaxyCap / 15),
    formatEffect: value => `+${formatInt(value)} RG`
  },
  {
    id: 227,
    cost: 900,
    STCost: 4,
    requirement: [214],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [228],
    description: "차원 희생이 제4 시간 차원에 작은 영향을 미친다.",
    effect: () => Math.max(Math.pow(Sacrifice.totalBoost.pLog10(), 10), 1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 228,
    cost: 900,
    STCost: 4,
    requirement: [214],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [227],
    description: () => `차원 희생의 공식이 개선된다.
      ${Sacrifice.getSacrificeDescription({ "TimeStudy228": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "TimeStudy228": true })}`,
    effect: 0.2
  },
  {
    id: 231,
    cost: 500,
    STCost: 5,
    requirement: [221, 222],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [232],
    description: "차원 가속의 성능이 그 횟수에 비례하여 증가한다.",
    effect: () => Decimal.pow(DimBoost.totalBoosts, 0.3).clampMin(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 232,
    cost: 500,
    STCost: 5,
    requirement: [223, 224],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [231],
    description: "모든 은하들의 성능이 반물질 은하의 갯수에 비례하여 증가한다.",
    effect: () => Math.pow(1 + player.galaxies / 1000, 0.2),
    formatEffect: value => `+${formatPercents(value - 1, 3)}`
  },
  {
    id: 233,
    cost: 500,
    STCost: 5,
    requirement: [225, 226],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [234],
    description: "복제자 은하 최대 보유 갯수 업그레이드의 비용이 복제자의 갯수가 많을수록 감소한다.",
    effect: () => Replicanti.amount.pow(0.3),
    formatEffect: value => `/ ${format(value, 1, 2)}`
  },
  {
    id: 234,
    cost: 500,
    STCost: 5,
    requirement: [227, 228],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    requiresST: [233],
    description: "차원 희생이 제1 반물질 차원에 영향을 미친다.",
    effect: () => Sacrifice.totalBoost,
  },
  // Note: These last 4 entries are the triad studies
  {
    id: 301,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 1, 221, 222, 231],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [221, 222, 231],
    description: "시간 연구 231의 효과가 시간 연구 221의 효과를 증폭시킨다.",
    effect: () => TimeStudy(221).effectValue.pow(TimeStudy(231).effectValue.minus(1)).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 1
  },
  {
    id: 302,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 2, 223, 224, 232],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [223, 224, 232],
    description: () => `먼 반물질 은하의 가격 상승이 반물질 은하 ${formatInt(3000)}개만큼 늦춰진다.`,
    effect: 3000,
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 2
  },
  {
    id: 303,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 3, 225, 226, 233],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [225, 226, 233],
    description: () => `시간 연구 225 및 226과 에파리그의 무한에서 복제자 은하를 ${formatPercents(0.5)} 더 얻는다.`,
    effect: 1.5,
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 3
  },
  {
    id: 304,
    cost: 0,
    STCost: 12,
    requirement: [() => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 4, 227, 228, 234],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    requiresST: [227, 228, 234],
    description: () => `차원 희생의 배수가 증폭된다. (${formatInt(2)}^)`,
    effect: 2,
    unlocked: () => Ra.unlocks.unlockHardV.effectOrDefault(0) >= 4
  }
];
