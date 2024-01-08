export const eternityMilestones = {
  autobuyerIPMult: {
    eternities: 1,
    reward: "무한 포인트 2배 자동구매기를 해금합니다.",
    pelleUseless: true
  },
  keepAutobuyers: {
    eternities: 2,
    reward: "영원을 일반 도전이 완료되고, 무한이 돌파되었으며, 모든 자동구매기를 보유한 상태로 시작합니다."
  },
  autobuyerReplicantiGalaxy: {
    eternities: 3,
    reward: "복제자 은하 자동구매기를 해금합니다."
  },
  keepInfinityUpgrades: {
    eternities: 4,
    reward: "모든 무한 업그레이드를 보유한 상태로 영원을 시작합니다.",
    givenByPelle: () => PelleUpgrade.keepInfinityUpgrades.isBought,
    pelleUseless: true
  },
  bigCrunchModes: {
    eternities: 5,
    reward: "빅 크런치 자동구매기의 추가 옵션을 해금합니다."
  },
  autoEP: {
    eternities: 6,
    reward: () => {
      const EPmin = getOfflineEPGain(TimeSpan.fromMinutes(1).totalMilliseconds);
      const em200 = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoEternities.isReached).gt(0);
      const em1000 = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoInfinities.isReached).gt(0);
      if (!player.options.offlineProgress) return `이 마일스톤은 오프라인 상태일 때 EP를 제공하지만, 현재 오프라인 진행이 비활성화되어 있습니다.`;
      const effectText = (em200 || em1000) ? "(비활성화)" : `현재: ${format(EPmin, 2, 2)} EP/min`;
      return `오프라인 상태일 때, 지난 영원 중 최대 EP/분의 ${formatPercents(0.25)}만큼을 생산합니다. (${effectText})`;
    },
    activeCondition: () => (player.options.offlineProgress
      ? `다른 오프라인 마일스톤
        (${formatInt(200)}나 ${formatInt(1000)})이 활성 상태가 아니라면 활성화 됩니다.`
      : ""),
  },
  autoIC: {
    eternities: 7,
    reward: `모든 무한 도전이 해금되는 즉시 자동으로 완료됩니다.`,
    pelleUseless: true
  },
  keepBreakUpgrades: {
    eternities: 8,
    reward: "모든 무한 돌파 업그레이드를 보유한 채로 영원을 시작합니다.",
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  autobuyMaxGalaxies: {
    eternities: 9,
    reward: "반물질 은하 자동구매기의 최대 자동구매 옵션을 해금합니다."
  },
  unlockReplicanti: {
    eternities: 10,
    reward: "복제자가 해금된 상태로 영원을 시작합니다.",
    givenByPelle: () => PelleUpgrade.replicantiStayUnlocked.isBought,
    pelleUseless: true
  },
  autobuyerID1: {
    eternities: 11,
    reward: "제1 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID2: {
    eternities: 12,
    reward: "제2 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID3: {
    eternities: 13,
    reward: "제3 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID4: {
    eternities: 14,
    reward: "제4 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID5: {
    eternities: 15,
    reward: "제5 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID6: {
    eternities: 16,
    reward: "제6 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID7: {
    eternities: 17,
    reward: "제7 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID8: {
    eternities: 18,
    reward: "제8 무한 차원 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autoUnlockID: {
    eternities: 25,
    reward: "무한 차원의 해금 조건을 만족하면 해당 무한 차원이 자동으로 해금됩니다."
  },
  unlockAllND: {
    eternities: 30,
    reward: "모든 반물질 차원을 구매할 수 있는 상태로 시작합니다."
  },
  replicantiNoReset: {
    eternities: 40,
    reward: `복제자 은하를 구입할 때 더 이상 반물질, 반물질 차원, 틱스피드, 차원 희생 배수, 차원 가속을 초기화하지 않습니다.`,
    pelleUseless: true
  },
  autobuyerReplicantiChance: {
    eternities: 50,
    reward: "복제자 복제 확률 업그레이드 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiInterval: {
    eternities: 60,
    reward: "복제자 생성 간격 업그레이드 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiMaxGalaxies: {
    eternities: 80,
    reward: "최대 복제자 은하 갯수 업그레이드 자동구매기를 해금합니다.",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerEternity: {
    eternities: 100,
    reward: "영원 자동 구매기를 해금합니다."
  },
  autoEternities: {
    eternities: 200,
    reward: () => {
      if (!player.options.offlineProgress) return `이 마일스톤은 오프라인 상태일 때 영원 횟수를 제공하지만, 현재 오프라인 진행이 비활성화되어 있습니다.`;
      const eternities = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(200));
      // As far as I can tell, using templates here as Codefactor wants would lead to nested templates,
      // which seems messy to say the least.
      const realTime = PlayerProgress.seenAlteredSpeed() ? " real-time" : "";
      // eslint-disable-next-line prefer-template
      return `오프라인일 때, 시간 당 영원 도달 횟수 최고치의 ${formatPercents(0.5)}만큼 영원 횟수를 얻습니다.` +
        (eternities.gt(0) ? `(현재: ${format(eternities, 2, 2)}/hour)` : "(비활성화)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `오프라인 영원은 영원 자동구매기가 켜져 있고, 조건을 0 EP로 설정하였으며, 도전이나 시간 팽창 중이 아닐 때만 생성됩니다.`
      : ""),
      pelleUseless: true
  },
  autoInfinities: {
    eternities: 1000,
    reward: () => {
      if (!player.options.offlineProgress) return `이 마일스톤은 오프라인 상태일 때 무한 횟수를 제공하지만, 현재 오프라인 진행이 비활성화되어 있습니다.`;
      const infinities = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(1000));
      // eslint-disable-next-line prefer-template
      return `오프라인일 때, 이번 영원 중 시간 당 무한 도달 횟수 최고치의 ${formatPercents(0.5)}만큼 무한 횟수를 얻습니다.` +
        (infinities.gt(0) ? `(현재: ${format(infinities, 2, 2)}/hour)` : "(비활성화)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `오프라인 무한은 일반 도전, 무한 도전, 영원 도전 4 및 12 중 아무 것도 진행하고 있지 않으며,
        자동 빅 크런치가 ${formatInt(60)}초 (혹은 그 이하) 이후 크런치로 설정되어 켜져 있어야 하고,
        영원 자동구매기가 꺼져있는 상태여야만 생성됩니다.`
      : ""),
      pelleUseless: true
  }
};
