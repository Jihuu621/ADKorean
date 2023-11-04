export const confirmationTypes = [
  {
    name: "차원 가속",
    option: "dimensionBoost",
    isUnlocked: () => PlayerProgress.infinityUnlocked() || player.galaxies > 0 || player.dimensionBoosts > 0,
  }, {
    name: "반물질 은하",
    option: "antimatterGalaxy",
    isUnlocked: () => PlayerProgress.infinityUnlocked() || player.galaxies > 0,
  }, {
    name: "차원 희생",
    option: "sacrifice",
    isUnlocked: () => Sacrifice.isVisible,
  }, {
    name: "빅 크런치",
    option: "bigCrunch",
    isUnlocked: () => player.break || PlayerProgress.eternityUnlocked(),
  }, {
    name: "도전",
    option: "challenges",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "도전 나가기",
    option: "exitChallenge",
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
  }, {
    name: "복제자 은하",
    option: "replicantiGalaxy",
    isUnlocked: () => PlayerProgress.eternityUnlocked() || player.replicanti.unl,
  }, {
    name: "영원",
    option: "eternity",
    isUnlocked: () => PlayerProgress.eternityUnlocked(),
  }, {
    name: "시간 팽창",
    option: "dilation",
    isUnlocked: () => PlayerProgress.realityUnlocked() || !Currency.tachyonParticles.eq(0),
  }, {
    name: "현실 리셋",
    option: "resetReality",
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "글리프 교체",
    option: "glyphReplace",
    isUnlocked: () => PlayerProgress.realityUnlocked(),
  }, {
    name: "글리프 희생",
    option: "glyphSacrifice",
    isUnlocked: () => GlyphSacrificeHandler.canSacrifice,
  }, {
    name: "글리프 정리",
    option: "autoClean",
    isUnlocked: () => GlyphSacrificeHandler.canSacrifice,
  }, {
    name: "모든 글리프 희생",
    option: "sacrificeAll",
    isUnlocked: () => GlyphSacrificeHandler.canSacrifice,
  }, {
    name: "글리프 선택",
    option: "glyphSelection",
    isUnlocked: () => Autobuyer.reality.isUnlocked,
  }, {
    name: "글리프 실행 취소",
    option: "glyphUndo",
    isUnlocked: () => TeresaUnlocks.undo.canBeApplied,
  }, {
    name: "오토메이터 에디터 변경",
    option: "switchAutomatorMode",
    isUnlocked: () => Player.automatorUnlocked,
  }, {
    name: "글리프 프리셋 변경",
    option: "deleteGlyphSetSave",
    isUnlocked: () => EffarigUnlock.setSaves.isUnlocked,
  }, {
    name: "글리프 수정",
    option: "glyphRefine",
    isUnlocked: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
  }, {
    name: "아마겟돈",
    option: "armageddon",
    isUnlocked: () => Pelle.isDoomed,
  }, {
    name: "상점 구매 환원하기",
    option: "respecIAP",
    isUnlocked: () => Cloud.isAvailable
  }
];
