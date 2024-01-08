export const sidebarResources = [
  // Note: ID 0 is interpreted in the Vue component as "the largest unlocked ID" - do not use ID 0
  {
    id: 1,
    optionName: "Blob",
    isAvailable: () => Themes.available().map(t => t.name).includes("S11"),
    // This is a dummy value to prevent vue errors
    value: () => new Decimal(1),
    formatValue: () => "\uE010",
    formatClass: "o-sidebar-currency--antimatter",
  },
  {
    id: 2,
    optionName: "반물질",
    isAvailable: () => true,
    value: () => Currency.antimatter.value,
    formatValue: x => format(x, 2, 1),
    formatClass: "o-sidebar-currency--antimatter",
  },
  {
    id: 3,
    optionName: "무한 포인트",
    isAvailable: () => PlayerProgress.infinityUnlocked(),
    value: () => Currency.infinityPoints.value.floor(),
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--infinity",
  },
  {
    id: 4,
    optionName: "복제자",
    isAvailable: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
    value: () => Replicanti.amount,
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--replicanti",
  },
  {
    id: 5,
    optionName: "영원 포인트",
    isAvailable: () => PlayerProgress.eternityUnlocked(),
    value: () => Currency.eternityPoints.value.floor(),
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--eternity",
  },
  {
    id: 6,
    optionName: "시간 정리",
    isAvailable: () => PlayerProgress.eternityUnlocked(),
    value: () => player.timestudy.theorem.plus(TimeTheorems.calculateTimeStudiesCost()),
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--eternity",
  },
  {
    id: 7,
    optionName: "타키온 입자",
    isAvailable: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
    value: () => Currency.tachyonParticles.value,
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--dilation",
  },
  {
    id: 8,
    optionName: "팽창된 시간",
    isAvailable: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
    value: () => Currency.dilatedTime.value,
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--dilation",
  },
  {
    id: 9,
    optionName: "리얼리티 머신",
    isAvailable: () => PlayerProgress.realityUnlocked(),
    value: () => Currency.realityMachines.value,
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--reality",
  },
  {
    id: 10,
    optionName: "유물 파편",
    isAvailable: () => TeresaUnlocks.effarig.isUnlocked,
    value: () => new Decimal(Currency.relicShards.value),
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--effarig",
  },
  {
    id: 11,
    optionName: "허수 머신",
    isAvailable: () => MachineHandler.isIMUnlocked,
    value: () => new Decimal(Currency.imaginaryMachines.value),
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--reality",
  },
  {
    id: 12,
    optionName: "리얼리티 + 허수 머신",
    resourceName: "Machines",
    isAvailable: () => MachineHandler.isIMUnlocked,
    // This is a dummy value to prevent vue errors
    value: () => Currency.realityMachines.value,
    formatValue: () => formatMachines(Currency.realityMachines.value, Currency.imaginaryMachines.value),
    formatClass: "o-sidebar-currency--reality",
  },
  {
    id: 13,
    optionName: "암흑 물질",
    isAvailable: () => Laitela.isUnlocked,
    value: () => Currency.darkMatter,
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--laitela",
  },
  {
    id: 14,
    optionName: "Dark Energy",
    isAvailable: () => Laitela.isUnlocked,
    value: () => new Decimal(Currency.darkEnergy.value),
    formatValue: x => format(x, 2, 2),
    formatClass: "o-sidebar-currency--laitela",
  },
  {
    id: 15,
    optionName: "특이점",
    isAvailable: () => Laitela.isUnlocked,
    value: () => new Decimal(Currency.singularities.value),
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--laitela",
  },
  {
    id: 16,
    optionName: "리얼리티 샤드",
    isAvailable: () => Pelle.isDoomed,
    value: () => Currency.realityShards,
    formatValue: x => format(x, 2),
    formatClass: "o-sidebar-currency--pelle",
  },
];