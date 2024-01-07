import { DC } from "../../constants";

export const normalAchievements = [
  {
    id: 11,
    name: "시작해봅시다!",
    description: "제1 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 12,
    name: "100개면 많지",
    description: "제2 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "하프라이프 3 출시",
    description: "제3 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "레포디: 레프트 포 디멘션",
    description: "제4 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "5차원 반물질 펀치",
    description: "제5 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 16,
    name: "잘 알아두세요. 9는 없어요!",
    description: "제6 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 17,
    name: "운은 실력이 아니야",
    description: "제7 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 18,
    name: "90도 돌리면 무한",
    description: "제8 반물질 차원을 구매한다.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 21,
    name: "무한으로!",
    description: "무한에 도달한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(100)}개로 시작하게 된다.`; },
    effect: 100
  },
  {
    id: 22,
    name: "가짜 뉴스!",
    get description() { return `${formatInt(50)}가지 뉴스를 본다.`; },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER
  },
  {
    id: 23,
    name: "9차원은 거짓이야",
    get description() { return `정확히 ${formatInt(99)}개의 제8 반물질 차원을 가진다.`; },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() { return `제8 반물질 차원이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1
  },
  {
    id: 24,
    name: "반물질 아포칼립스",
    get description() { return `${format(DC.E80)} 반물질에 도달한다.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 80,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 25,
    name: "최대 가속!",
    get description() { return `${formatInt(10)}개의 차원 가속을 구매한다.`; },
    checkRequirement: () => DimBoost.purchasedBoosts >= 10,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER
  },
  {
    id: 26,
    name: "벽을 넘어서",
    description: "반물질 은하를 구매한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 27,
    name: "쌍둥이 은하",
    get description() { return `${formatInt(2)}개의 반물질 은하를 구매한다.`; },
    checkRequirement: () => player.galaxies >= 2,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 28,
    name: "뭐하새요데체?",
    get description() {
      return `${format(DC.E150)}개 이상의 제1 반물질 차원을 보유한 채로 딱 1개만 더 구매한다.`;
    },
    checkRequirement: () => AntimatterDimension(1).amount.exponent >= 150,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1
  },
  {
    id: 31,
    name: "패치노트에 넣는 걸 까먹었어",
    get description() { return `아무 반물질 차원의 배율을 ${formatX(DC.E31)} 이상으로 만든다.`; },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.exponent >= 31),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.05)} 강해진다.`; },
    effect: 1.05
  },
  {
    id: 32,
    name: "오 신이시여..",
    get description() { return `일반 도전 8 밖에서 ${formatX(600)} 이상의 차원 희생 배율에 도달한다.`; },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return `차원 희생의 공식이 일부 변경된다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })}`;
    },
    effect: 0.1,
  },
  {
    id: 33,
    name: "무한으로 즐기는 무한",
    get description() { return `무한에 ${formatInt(10)}번 도달한다.`; },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 34,
    name: "그게 뭐죠, 먹는 건가요?",
    description: "제8 반물질 차원을 보유하지 않은 상태에서 무한에 도달한다.",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1-7 반물질 차원이 ${formatPercents(0.02)} 강해진다.`; },
    effect: 1.02
  },
  {
    id: 35,
    name: "무서워서 잘 수가 없네",
    get description() {
      return PlayerProgress.realityUnlocked()
        ? `${formatInt(6)}시간 이상 오프라인을 유지한다 (현실 시간).`
        : `${formatInt(6)}시간 이상 오프라인을 유지한다.`;
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 21600000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE
  },
  {
    id: 36,
    name: "폐소공포증",
    get description() {
      return `${formatInt(1)}개의 반물질 은하만을 가지고 무한에 도달한다.`;
    },
    checkRequirement: () => player.galaxies === 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `초기 틱스피드 배율을 ${format(1.02, 2, 2)}배로 만든다.`; },
    effect: 1 / 1.02
  },
  {
    id: 37,
    name: "빠르다 빨라!",
    get description() { return `${formatInt(2)}시간 이내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(5000)}개로 시작하게 된다.`; },
    effect: 5000
  },
  {
    id: 38,
    name: "나 무교야!",
    get description() {
      return `차원 희생 없이 반물질 은하를 구매한다.`;
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 41,
    name: "무과금 게임",
    get description() { return `무한 업그레이드를 ${formatInt(16)}개 구매한다.`; },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return `-${formatX(2)}개의 무한 업그레이드를 해금한다. (IP 배율 증가 및 오프라인 IP 생산)`;
    },
  },
  {
    id: 42,
    name: "누구보다 빠르게 남들과는 다르게",
    get description() {
      return `초당 반물질 생산량이 보유량보다 ${format(DC.E63)}배 높게 만든다.`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 63 &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 43,
    name: "밥상 뒤엎기",
    description:
      "제8 반물질 차원의 배율을 가장 높게 하고 제7 - 6 - 5 - ... 순으로 만든다.",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `각각의 차원이 단계별로 배율을 받는다.
      (8차원은 ${formatPercents(0.08)}, 7차원은 ${formatPercents(0.07)}..)`;
    }
  },
  {
    id: 44,
    name: "30초 경과!",
    get description() {
      return `초당 반물질 생산량이 보유량보다 높은 상태를 ${formatInt(30)}초동안 유지한다.`;
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 45,
    name: "감자보다 빠르다!",
    get description() { return `초당 틱스피드를 ${format(DC.E29)} 이상으로 만든다.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -26,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `초기 틱스피드 배율을 ${format(1.02, 2, 2)}배로 만든다.`; },
    effect: 0.98
  },
  {
    id: 46,
    name: "다차원적",
    get description() { return `제8 반물질 차원을 제외하고 나머지 반물질 차원들의 갯수를 ${format(DC.E12)} 이상으로 만든다.`; },
    checkRequirement: () => AntimatterDimension(7).amount.exponent >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 47,
    name: "데어데블",
    get description() { return `일반 도전 ${formatInt(3)}개를 완료한다.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 48,
    name: "일반 도전 (였던 것)",
    get description() { return `${formatInt(12)}개의 일반 도전을 모두 완료한다.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() { return `모든 반물질 차원이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1
  },
  {
    id: 51,
    name: "한계 돌파!",
    description: "무한을 돌파한다.",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 52,
    name: "자동화의 시대",
    description: "반물질 차원과 틱스피드 자동구매기의 간격을 모두 가장 짧게 한다.",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 53,
    name: "뭐 하세요?",
    description: "모든 일반 자동구매기의 간격을 가장 짧게 한다.",
    // The upgradeable autobuyers are dimensions, tickspeed, dimension boost,
    // galaxy, and big crunch (the ones you get from normal challenges).
    // We don't count autobuyers which can be upgraded via e.g. perks as upgradeable.
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 54,
    name: "겁나 빨라!",
    get description() { return `${formatInt(10)}분 내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e5)}개로 시작하게 된다.`; },
    effect: 5e5
  },
  {
    id: 55,
    name: "생각보다 짧은 무한",
    get description() { return `${formatInt(1)}분 내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e10)}개로 시작하게 된다.`; },
    effect: 5e10
  },
  {
    id: 56,
    name: "대학살",
    get description() {
      return `일반 도전 2를 ${formatInt(3)}분 내로 완료한다.`;
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한을 시작할 때 처음 ${formatInt(3)}분간 모든 반물질 차원이 강해진다.`;
    },
    effect: () => Math.max(6 / (Time.thisInfinity.totalMinutes + 3), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 57,
    name: "신내림",
    get description() {
      return `일반 도전 8을 ${formatInt(3)}분 내로 완료한다.`;
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `차원 희생의 공식이 일부 변경된다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })}`;
    },
    effect: 0.1
  },
  {
    id: 58,
    name: "이 정도면 괜찮겠지",
    get description() { return `일반 도전 9를 ${formatInt(3)}분 내로 완료한다.`; },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `${formatInt(10)}개의 반물질 차원을 구매할 때마다 배율 +${formatPercents(0.01)}.`;
    },
    effect: 1.01
  },
  {
    id: 61,
    name: "3대 500",
    get description() {
      return `모든 반물질 차원 자동구매기의 대량 구매 개수를 ${formatInt(Autobuyer.antimatterDimension.bulkCap)}개로 만드세요.`;
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "차원 자동구매기의 대량 구매 상한이 해제된다."
  },
  {
    id: 62,
    name: "아.. 그.. 저.. 아직 계시네요..?",
    get description() { return `분당 ${format(DC.E8)} 무한 포인트에 도달한다.`; },
    checkRequirement: () => Player.bestRunIPPM.exponent >= 8,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 63,
    name: "새로운 시작",
    description: "무한력을 생산한다.",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 64,
    name: "평화주의자",
    description: "일반 도전에서 차원 가속 또는 반물질 은하 없이 무한에 도달한다.",
    checkRequirement: () => player.galaxies === 0 && DimBoost.purchasedBoosts === 0 && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1-4 반물질 차원이 ${formatPercents(0.25)} 강해진다.`; },
    effect: 1.25
  },
  {
    id: 65,
    name: "이딴 게 챌린지?",
    get description() { return `최단 일반 도전 기록의 총합을 ${formatInt(3)}분 미만으로 만든다.`; },
    checkRequirement: () => Time.challengeSum.totalMinutes < 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return `도전 한정으로 무한을 시작할 때 첫 3분간 반물질 차원이 강해진다.`;
    },
    effect: () => (Player.isInAnyChallenge ? Math.max(4 / (Time.thisInfinity.totalMinutes + 1), 1) : 1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 66,
    name: "감자의 제곱보다 빠르다!",
    get description() { return `초당 ${format(DC.E58)}틱 이상으로 만든다.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -55,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `초기 틱스피드를 ${formatX(1.02, 0, 2)}배로 만든다.`; },
    effect: 0.98
  },
  {
    id: 67,
    name: "무야호",
    description: "무한 도전을 완료한다.",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 68,
    name: "도전과제 따려고 다시 한 거 맞죠?",
    get description() {
      return `일반 도전 3을 ${formatInt(10)}초 내로 완료한다.`;
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1 반물질 차원이 ${formatPercents(0.5)} 강해진다.`; },
    effect: 1.5
  },
  {
    id: 71,
    name: "에러 909: 차원을 찾을 수 없음",
    description:
      `일반 도전 2에서 차원 가속 또는 반물질 은하 없이 제1 반물질 차원 최대 10개만 사용하여 무한에 도달한다.`,
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts === 0 &&
      player.galaxies === 0,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `제1 반물질 차원이 ${formatInt(3)}배 강해진다.`; },
    effect: 3
  },
  {
    id: 72,
    name: "장비를 정지합니다",
    get description() {
      return `모든 반물질 차원의 배율을 ${formatX(Decimal.NUMBER_MAX_VALUE, 1)} 이상으로 만든다.`;
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.multiplier.gte(Decimal.NUMBER_MAX_VALUE)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 반물질 차원들이 ${formatPercents(0.1)} 강해진다.`; },
    effect: 1.1
  },
  {
    id: 73,
    name: "이 도전과제는 존재하지 않습니다",
    get description() { return `${formatPostBreak(DC.D9_9999E9999, 4)} 반물질에 도달한다.`; },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "보유중인 반물질에 비례하여 반물질 차원이 강해진다.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 74,
    name: "1분 1초가 아까워",
    get description() { return `최단 일반 도전 기록의 총합을 ${formatInt(5)}초 미만으로 만든다.`; },
    checkRequirement: () => Time.challengeSum.totalSeconds < 5,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return `도전에서 모든 반물질 차원이 ${formatPercents(0.4)} 강해진다.`; },
    effect: 1.4,
    effectCondition: () => Player.isInAnyChallenge
  },
  {
    id: 75,
    name: "차원이 다른 차원",
    description: "제4 무한 차원을 해금한다.",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "도전과제의 배율이 무한 차원에도 적용된다.",
    effect: () => Achievements.power
  },
  {
    id: 76,
    name: "1일 1차원",
    get description() { return `${formatInt(8)}일동안 플레이한다.`; },
    checkRequirement: () => Time.totalTimePlayed.totalDays >= 8,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "플레이한 시간에 따라 반물질 차원에 아주 작은 배율이 적용된다.",
    effect: () => Math.max(Math.pow(Time.totalTimePlayed.totalDays / 2, 0.05), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 77,
    name: "백만은 좀 많은데",
    get description() { return `${format(1e6)} 무한력에 도달한다.`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 78,
    name: "눈 깜짝할 새",
    get description() { return `${formatInt(250)}ms 내로 무한에 도달한다.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한을 ${format(5e25)} 반물질을 보유한 상태로 시작한다.`;
    },
    effect: 5e25
  },
  {
    id: 81,
    name: "저 게임 디자인 5년 배웠어요",
    get description() { return `무한 도전 5를 ${formatInt(15)}초 이내에 완료한다.`; },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE
  },
  {
    id: 82,
    name: "나 도전 아니다",
    get description() { return `${formatInt(8)}개의 무한 도전을 모두 완료한다.`; },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 83,
    name: "갤럭시 S50",
    get description() { return `${formatInt(50)}개의 반물질 은하를 구매한다.`; },
    checkRequirement: () => player.galaxies >= 50,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `틱스피드가 반물질 은하의 갯수마다 ${formatPercents(0.05)}씩 빨라진다.`; },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`
  },
  {
    id: 84,
    name: "좀 나눠줘?",
    get description() { return `${formatPostBreak("1e35000")} 반물질에 도달한다.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 35000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "보유하고 있는 반물질에 비례해 반물질 차원이 강해진다",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 85,
    name: "이 IP는 이제 제 겁니다.",
    get description() { return `한 번의 빅 크런치로 ${format(DC.E150)} 이상의 무한 포인트를 획득한다.`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 150,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트를 ${formatX(4)}배 더 얻는다.`; },
    effect: 4
  },
  {
    id: 86,
    name: "버거도 접고 폰도 접고 시간도 접냐?",
    get description() { return `틱스피드 업그레이드의 증가량을 ${formatX(1000)}배 이상으로 만든다.`; },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 은하가 ${formatPercents(0.01)} 강해진다.`; },
    effect: 1.01
  },
  {
    id: 87,
    name: "더블 밀리언 달성",
    get description() { return `무한에 ${format(DC.D2E6)}번 도달한다.`; },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `${formatInt(5)}초 이상 소요된 무한에서 얻는 무한 포인트가 ${formatX(250)}배 늘어난다.`;
    },
    effect: 250,
    effectCondition: () => Time.thisInfinity.totalSeconds > 5
  },
  {
    id: 88,
    name: "무한 희생",
    get description() {
      return `한번의 차원 희생으로 ${formatX(Decimal.NUMBER_MAX_VALUE, 1, 0)}배 이상의 배율을 얻는다.`;
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() {
      return `차원 희생이 더욱 강력해진다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true })}`;
    },
    effect: 0.1
  },
  {
    id: 91,
    name: "속도의 한계를 보여줄게",
    get description() {
      return `${formatInt(2)}초 내로 빅 크런치를 하여 ${format(DC.E200)}개의 무한 포인트를 획득한다.`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 200 && Time.thisInfinityRealTime.totalSeconds <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한을 시작한 후 처음 ${formatInt(5)}초간 반물질 차원이 강해진다.`;
    },
    effect: () => Math.max((5 - Time.thisInfinity.totalSeconds) * 60, 1),
    effectCondition: () => Time.thisInfinity.totalSeconds < 5,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 92,
    name: "정지가 안돼",
    get description() {
      return `${formatInt(2)}초 내로 빅 크런치를 하여 ${format(DC.E250)}개의 무한 포인트를 획득한다.`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 250 && Time.thisInfinityRealTime.totalSeconds <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한을 시작한 후 처음 ${formatInt(60)}초간 반물질 차원이 강해진다.`;
    },
    effect: () => Math.max((1 - Time.thisInfinity.totalMinutes) * 100, 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 1,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 93,
    name: "우리 할머니도 그것보다 더 빨리 뛰겠다",
    get description() { return `한 번의 빅 크런치로 ${format(DC.E300)}개의 무한 포인트를 획득한다.`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 300,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트를 ${formatX(4)}배 더 얻는다.`; },
    effect: 4
  },
  {
    id: 94,
    name: "4와 3분의 1의 무한",
    get description() { return `${format(DC.E260)} 무한력에 도달한다.`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 260,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "무한력을 두 배로 얻는다.",
    effect: 2
  },
  {
    id: 95,
    name: "안전한거 맞겠지?",
    get description() { return `${formatInt(1)}시간 내로 복제자 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}개에 도달한다.`; },
    get reward() { return `무한에 도달해도 복제자와 복제자 은하 ${formatInt(1)}개를 잃지 않는다.`; },
    checkRequirement: () =>
      (Replicanti.amount.eq(Decimal.NUMBER_MAX_VALUE) || player.replicanti.galaxies > 0) &&
      Time.thisInfinityRealTime.totalHours <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 96,
    name: "상대성 이론",
    description: "영원에 도달한다.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 97,
    name: "레고 밟으면서 줄넘기 쌩쌩이",
    get description() { return `무한 도전 기록의 총합을 ${format(6.66, 2, 2)}초 미만으로 만든다.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds < 6.66,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 98,
    name: "무한으로부터 0도",
    description: "제8 무한 차원을 해금한다.",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 101,
    name: "아무도 8같은 건 신경 쓸 틈이 없겠죠",
    description: "제1-7 반물질 차원을 구매하지 않고 영원에 도달한다.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 102,
    name: "이 마일스톤까지 영원이 걸렸어",
    description: "모든 영원 마일스톤을 달성한다.",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 103,
    name: "Oㅣ 도JㅓN과제는 존재하ㅈ1 않습LIㄷㅏ II",
    get description() { return `${formatPostBreak(DC.D9_99999E999, 5, 0)} 무한 포인트에 도달한다.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `무한 포인트 획득 공식이 개선된다. log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(307.8, 1)}`;
    },
    effect: 307.8
  },
  {
    id: 104,
    name: "That wasn't an eternity",
    get description() { return `Eternity in under ${formatInt(30)} seconds.`; },
    checkRequirement: () => Time.thisEternity.totalSeconds <= 30,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `Start Eternities with ${format(5e25)} Infinity Points.`; },
    effect: 5e25
  },
  {
    id: 105,
    name: "Infinite Time",
    get description() { return `Have ${formatInt(308)} Tickspeed upgrades from Time Dimensions.`; },
    checkRequirement: () => player.totalTickGained >= 308,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Time Dimensions gain a multiplier based on tickspeed.",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 106,
    name: "The swarm",
    get description() { return `Get ${formatInt(10)} Replicanti Galaxies in ${formatInt(15)} seconds.`; },
    checkRequirement: () => Replicanti.galaxies.total >= 10 && Time.thisInfinity.totalSeconds <= 15,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 107,
    name: "Do you really need a guide for this?",
    get description() { return `Eternity with less than ${formatInt(10)} Infinities.`; },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 108,
    name: "We COULD afford 9",
    get description() { return `Eternity with exactly ${formatInt(9)} Replicanti.`; },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 111,
    name: "Yo dawg, I heard you liked infinities...",
    get description() {
      return `Have all your Infinities in your past ${formatInt(10)} Infinities be at least
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} times higher Infinity Points than the previous one.`;
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "Your antimatter doesn't reset on Dimension Boosts or Antimatter Galaxies."
  },
  {
    id: 112,
    name: "Never again",
    get description() { return `Get the sum of Infinity Challenge times below ${formatInt(750)}ms.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds < 750,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 113,
    name: "Eternities are the new infinity",
    get description() { return `Eternity in under ${formatInt(250)}ms.`; },
    checkRequirement: () => Time.thisEternity.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `Gain ${formatX(2)} more Eternities.`; },
    effect: 2,
  },
  {
    id: 114,
    name: "You're a mistake",
    description: "Fail an Eternity Challenge.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "A fading sense of accomplishment.",
    effect: () => "Sense of accomplishment (fading)"
  },
  {
    id: 115,
    name: "I wish I had gotten 7 eternities",
    description: "Start an Infinity Challenge inside an Eternity Challenge.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 116,
    name: "Do I really need to infinity",
    get description() { return `Eternity with only ${formatInt(1)} Infinity.`; },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "Multiplier to Infinity Points based on Infinities.",
    effect: () => Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (After TS31: ${mult})`
        : mult;
    }
  },
  {
    id: 117,
    name: "Costco sells Dimboosts now!",
    get description() { return `Bulk buy ${formatInt(750)} Dimension Boosts at once.`; },
    checkRequirement: ([bulk]) => bulk >= 750,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() {
      return `The multiplier from Dimension Boosts to Antimatter Dimensions is ${formatPercents(0.01)} higher.`;
    },
    effect: 1.01
  },
  {
    id: 118,
    name: "IT'S OVER 9000",
    get description() { return `Get a total Dimensional Sacrifice multiplier of ${formatPostBreak(DC.E9000)}.`; },
    checkRequirement: () => Sacrifice.totalBoost.exponent >= 9000,
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `Dimensional Sacrifice doesn't reset your Antimatter Dimensions
      and the Autobuyer activates every tick if turned on.`,
  },
  {
    id: 121,
    name: "Can you get infinite IP?",
    get description() { return `Reach ${formatPostBreak("1e30008")} Infinity Points.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 30008,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 122,
    name: "You're already dead.",
    description: "Eternity without buying Antimatter Dimensions 2-8.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 123,
    name: "5 more eternities until the update",
    get description() { return `Complete ${formatInt(50)} unique Eternity Challenge tiers.`; },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER
  },
  {
    id: 124,
    name: "Long lasting relationship",
    get description() {
      return `Have your Infinity Power per second exceed your Infinity Power
      for ${formatInt(60)} consecutive seconds during a single Infinity.`;
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 125,
    name: "Like feasting on a behind",
    get description() {
      return `Reach ${format(DC.E90)} Infinity Points without having any Infinities
      or any 1st Antimatter Dimensions in your current Eternity.`;
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 90 &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Infinity Point multiplier based on time spent this Infinity.",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds * 10 + 1;
      return DC.D2.pow(Math.log(thisInfinity) * Math.min(Math.pow(thisInfinity, 0.11), 500));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 126,
    name: "Popular music",
    get description() { return `Have ${formatInt(180)} times more Replicanti Galaxies than Antimatter Galaxies.`; },
    checkRequirement: () => Replicanti.galaxies.total >= 180 * player.galaxies && player.galaxies > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `Replicanti Galaxies divide your Replicanti by ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}
      instead of resetting them to ${formatInt(1)}.`;
    },
  },
  {
    id: 127,
    name: "But I wanted another prestige layer...",
    get description() { return `Reach ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} Eternity Points.`; },
    checkRequirement: () => Currency.eternityPoints.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 128,
    name: "What do I have to do to get rid of you",
    get description() { return `Reach ${formatPostBreak("1e22000")} Infinity Points without any Time Studies.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 22000 && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Time Dimensions are multiplied by the number of Time Studies you have.",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`
  },
  {
    id: 131,
    name: "No ethical consumption",
    get description() { return `Get ${format(DC.D2E9)} Banked Infinities.`; },
    checkRequirement: () => Currency.infinitiesBanked.gt(DC.D2E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() {
      return `After Eternity you permanently keep ${formatPercents(0.05)} of your Infinities as Banked Infinities.`;
    },
    effect: () => Currency.infinities.value.times(0.05).floor()
  },
  {
    id: 132,
    name: "Unique snowflakes",
    get description() {
      return `Have ${formatInt(569)} Antimatter Galaxies without gaining any
        Replicanti Galaxies in your current Eternity.`;
    },
    checkRequirement: () => player.galaxies >= 569 && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "Gain a multiplier to Tachyon Particle and Dilated Time gain based on Antimatter Galaxies.",
    effect: () => 1.22 * Math.max(Math.pow(player.galaxies, 0.04), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 133,
    name: "I never liked this infinity stuff anyway",
    get description() {
      return `Reach ${formatPostBreak(DC.E200000)} Infinity Points without
      buying any Infinity Dimensions or the ${formatX(2)} Infinity Point multiplier.`;
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount === 0) &&
      player.IPMultPurchases === 0 &&
      Currency.infinityPoints.exponent >= 200000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "You start Eternities with all Infinity Challenges unlocked and completed."
  },
  {
    id: 134,
    name: "When will it be enough?",
    get description() { return `Reach ${formatPostBreak(DC.E18000)} Replicanti.`; },
    checkRequirement: () => Replicanti.amount.exponent >= 18000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `You gain Replicanti ${formatInt(2)} times faster under ${format(replicantiCap(), 1)} Replicanti.`;
    }
  },
  {
    id: 135,
    name: "Faster than a potato^286078",
    get description() { return `Get more than ${formatPostBreak("1e8296262")} ticks per second.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -8296262,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 136,
    name: "I told you already, time is relative",
    description: "Dilate time.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 137,
    name: "Now you're thinking with dilation!",
    get description() {
      return `Get ${formatPostBreak("1e260000")} antimatter
      in ${formatInt(1)} minute or less while Dilated.`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 260000 &&
      Time.thisEternity.totalMinutes <= 1 &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `Gain ${formatX(2)} Dilated Time and Time Theorems while Dilated.`; },
    effect: () => (player.dilation.active ? 2 : 1),
  },
  {
    id: 138,
    name: "This is what I have to do to get rid of you.",
    get description() {
      return `Reach ${formatPostBreak("1e26000")} Infinity Points without any Time Studies while Dilated.`;
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.exponent >= 26000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Removes the downsides from Time Study 131 and 133 in the Active and Idle Time Study paths."
  },
  {
    id: 141,
    name: "Snap back to reality",
    description: "Make a new Reality.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `${formatX(4)} Infinity Point gain, and increase the multiplier for buying ${formatInt(10)}
      Antimatter Dimensions by +${format(0.1, 0, 1)}.`;
    },
    effects: {
      ipGain: 4,
      buyTenMult: 0.1
    }
  },
  {
    id: 142,
    name: "How does this work?",
    description: "Unlock the automator.",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() { return `Dimension Boosts are ${formatPercents(0.5)} stronger.`; },
    effect: 1.5,
  },
  {
    id: 143,
    name: "Yo dawg, I heard you liked reskins...",
    get description() {
      return `Have all your Eternities in your past ${formatInt(10)} Eternities be at least
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} times higher Eternity Points than the previous one.`;
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "Galaxies no longer reset Dimension Boosts."
  },
  {
    id: 144,
    name: "Is this an Interstellar reference?",
    description: "Unlock the Black Hole.",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
  },
  {
    id: 145,
    name: "Are you sure these are the right way around?",
    description: "Have either Black Hole interval smaller than its duration.",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `Black Hole intervals are ${formatPercents(0.1)} shorter.`; },
    effect: 0.9
  },
  {
    id: 146,
    name: "Perks of living",
    description: "Have all Perks bought.",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() { return `+${formatPercents(0.01)} Glyph rarity.`; },
    effect: 1
  },
  {
    id: 147,
    name: "Master of Reality",
    description: "Have all Reality upgrades bought.",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "Unlock Teresa, the Celestial of Reality."
  },
  {
    id: 148,
    name: "Royal flush",
    description: "Reality with one of each basic Glyph type.",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "Gained Glyph level is increased by number of distinct Glyph types equipped.",
    effect: () => (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`
  },
  {
    id: 151,
    name: "You really didn't need it anyway",
    get description() {
      return `Get ${formatInt(800)} Antimatter Galaxies without
      buying 8th Antimatter Dimensions in your current Infinity.`;
    },
    checkRequirement: () => player.galaxies >= 800 && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "Unlock V, the Celestial of Achievements."
  },
  {
    id: 152,
    name: "Y'all got any more of them Glyphs?",
    get description() { return `Have ${formatInt(100)} Glyphs in your inventory.`; },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 153,
    name: "More like \"reallydoesn'tmatter\"",
    description: "Reality without producing antimatter.",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 154,
    name: "I am speed",
    get description() { return `Reality in under ${formatInt(5)} seconds (game time).`; },
    checkRequirement: () => Time.thisReality.totalSeconds <= 5,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `${formatPercents(0.1)} chance each Reality of ${formatX(2)} Realities and Perk Points.`; },
    effect: 0.1
  },
  {
    id: 155,
    name: "Achievement #15983",
    get description() { return `Play for ${formatFloat(13.7, 1)} billion years.`; },
    checkRequirement: () => Time.totalTimePlayed.totalYears > 13.7e9,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `Black Hole durations are ${formatPercents(0.1)} longer.`; },
    effect: 1.1
  },
  {
    id: 156,
    name: "College Dropout",
    description: "Reality without buying Time Theorems.",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `Gain ${formatX(2.5, 0, 1)} generated Time Theorems, and a free coupon to McDonalds™️.`; },
    effect: 2.5
  },
  {
    id: 157,
    name: "It's super effective!",
    get description() { return `Get a Glyph with ${formatInt(4)} effects.`; },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 158,
    name: "Bruh, are you like, inside the hole?",
    description: "Make both Black Holes permanent.",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `Black Hole power increased by ${formatPercents(0.1)}.`; },
    effect: 1.1
  },
  {
    id: 161,
    name: "that's where you're wrong kiddo",
    get description() { return `Get ${formatPostBreak(DC.E1E8)} antimatter while Dilated.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 100000000 && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 162,
    name: "Reinstalled the game and rejoined the server",
    description: "Have every Time Study at once.",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 163,
    name: "Actually, super easy! Barely an inconvenience!",
    get description() {
      return `Complete all the Eternity Challenges ${formatInt(5)} times with less than ${formatInt(1)}
      second (game time) in your current Reality.`;
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds <= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 164,
    name: "Infinity times two",
    get description() { return `Get ${format(Decimal.NUMBER_MAX_VALUE, 1)} Infinities.`; },
    checkRequirement: () => Currency.infinitiesTotal.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `Gain ×${formatInt(1024)} more Infinities.`; },
    effect: 1024
  },
  {
    id: 165,
    name: "Perfectly balanced",
    get description() { return `Get a level ${formatInt(5000)} Glyph with all Glyph level factors equally weighted.`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel >= 5000 &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "Unlock optimal automatic Glyph level factor adjustment."
  },
  {
    id: 166,
    name: "Nicenice.",
    get description() { return `Get a Glyph with level exactly ${formatInt(6969)}.`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel === 6969,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `+${formatInt(69)} to Glyph level.`; },
    effect: 69
  },
  {
    id: 167,
    name: "Mr. Layer? Sorry, you're not on the list",
    get description() { return `Reach ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} Reality Machines.`; },
    checkRequirement: () => Currency.realityMachines.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Gain more Reality Machines based on your current Reality Machines.",
    effect: () => Math.clampMin(1, Currency.realityMachines.value.log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 168,
    name: "Woah, we're halfway there",
    get description() { return `Get ${formatInt(50)} total Ra Celestial Memory levels.`; },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `Get ${formatPercents(0.1)} more memories.`; },
    effect: 1.1
  },
  {
    id: 171,
    name: "The god is delighted",
    description: "Sacrifice every sacrificable Glyph type at least once.",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s > 0),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() { return `Glyph sacrifice is ${formatX(2)} stronger.`; },
    effect: 2,
  },
  {
    id: 172,
    name: "Hitchhiker's Guide to Reality",
    get description() {
      return `Reality for ${format(Decimal.NUMBER_MAX_VALUE, 1)} Reality Machines without having
      any Charged Infinity Upgrades, having any equipped Glyphs, or buying any Triad Studies.`;
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(Decimal.NUMBER_MAX_VALUE) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 173,
    name: "Cet accomplissement n'existe pas III",
    get description() { return `Reach ${formatPostBreak(DC.D9_99999E999, 5, 0)} Reality Machines.`; },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 174,
    name: "Don't you already have two of these?",
    description: "Get a Singularity.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE
  },
  {
    id: 175,
    name: "The First Antihistorian",
    get description() { return `Get ${formatInt(Ra.alchemyResourceCap)} of all Alchemy Resources.`; },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= Ra.alchemyResourceCap),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() {
      return `Synergism can go above ${formatPercents(1)} and Momentum increases ${formatX(10)} faster.`;
    },
    effect: 10,
  },
  {
    id: 176,
    name: "Mom counted to 3",
    description: "Annihilate your Dark Matter Dimensions.",
  },
  {
    id: 177,
    name: "This mile took a celestial",
    description: "Complete all Singularity Milestones at least once.",
    checkRequirement: () => SingularityMilestones.all.every(x => x.completions > 0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
  },
  {
    id: 178,
    name: "Destroyer of Worlds",
    get description() { return `Get ${formatInt(100000)} Antimatter Galaxies.`; },
    checkRequirement: () => player.galaxies >= 100000,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `All Galaxies are ${formatPercents(0.01)} stronger.`; },
    effect: 1.01
  },
  {
    id: 181,
    displayId: 666,
    name: "Antimatter Dimensions Eternal",
    description: "Doom your Reality.",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 182,
    name: "One more time",
    description: "Permanently gain back all Antimatter Dimension autobuyers.",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 183,
    name: "Déjà vOoM",
    description: "Complete Infinity Challenge 5 while Doomed.",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    // Weirdly specific reward? Yes, its V's ST bonus because we forgot to disable it
    // when balancing Pelle and only realised too late.
    get reward() { return `All Antimatter Dimensions are raised to ${formatPow(1.0812403840463596, 0, 3)}`; },
    effect: 1.0812403840463596
  },
  {
    id: 184,
    name: "You're out!",
    description: "Encounter the third Pelle Strike.",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 185,
    name: "Four score and seven years ago",
    description: "Encounter the fourth Pelle Strike.",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 186,
    displayId: 181,
    name: "An unhealthy obsession",
    description: `Purchase Time Study 181 while Doomed.`,
  },
  {
    id: 187,
    name: "The One with Dilated Time",
    description: "Unlock Dilation while Doomed.",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    // We forgot to disable a singularity milestone while balancing Pelle; now it's disabled
    // and this upgrade has the same effect as it used to.
    get reward() {
      return `Increase the multiplier per repeatable Dilated Time
      multiplier upgrade by ${formatX(1.35, 0, 2)}.`;
    },
    effect: 1.35
  },
  {
    id: 188,
    name: "The End",
    description: "Beat the game.",
    checkRequirement: () => GameEnd.endState > END_STATE_MARKERS.GAME_END && !GameEnd.removeAdditionalEnd,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
];
