export const tabs = [
  {
    key: "dimensions",
    name: "차원",
    hideAt: 2.9,
    id: 0,
    hidable: true,
    subtabs: [
      {
        key: "antimatter",
        name: "반물질 차원",
        symbol: "Ω",
        component: "AntimatterDimensionsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "infinity",
        name: "무한 차원",
        hideAt: 2.7,
        symbol: "∞",
        component: "InfinityDimensionsTab",
        condition: () =>
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          InfinityDimension(1).isUnlocked,
        id: 1,
        hidable: true,
      },
      {
        key: "time",
        name: "시간 차원",
        hideAt: 2.6,
        symbol: "Δ",
        component: "TimeDimensionsTab",
        condition: () => PlayerProgress.eternityUnlocked(),
        id: 2,
        hidable: true,
      },
    ]
  },
  {
    key: "options",
    name: "옵션",
    hideAt: 1.6,
    id: 1,
    hidable: false,
    subtabs: [
      {
        key: "saving",
        name: "세이브",
        symbol: "<i class='fas fa-save'></i>",
        component: "OptionsSavingTab",
        id: 0,
        hidable: false,
      },
      {
        key: "visual",
        name: "비주얼",
        symbol: "<i class='fas fa-palette'></i>",
        component: "OptionsVisualTab",
        id: 1,
        hidable: false,
      },
      {
        key: "gameplay",
        name: "게임플레이",
        symbol: "<i class='fas fa-wrench'></i>",
        component: "OptionsGameplayTab",
        id: 2,
        hidable: false,
      }
    ]
  },
  {
    key: "statistics",
    name: "통계",
    hideAt: 1.7,
    id: 2,
    hidable: true,
    subtabs: [
      {
        key: "statistics",
        name: "통계",
        symbol: "<i class='fas fa-clipboard-list'></i>",
        component: "StatisticsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "challenges",
        name: "도전 기록",
        symbol: "<i class='fas fa-stopwatch'></i>",
        component: "ChallengeRecordsTab",
        condition: () =>
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.challengeCompleted(),
        id: 1,
        hidable: true,
      },
      {
        key: "prestige runs",
        name: "최근 프레스티지 기록",
        symbol: "<i class='fas fa-list-ol'></i>",
        component: "PastPrestigeRunsTab",
        condition: () => PlayerProgress.infinityUnlocked(),
        id: 2,
        hidable: true,
      },
      {
        key: "multipliers",
        name: "배율 분석",
        symbol: "<i class='fas fa-calculator'></i>",
        component: "MultiplierBreakdownTab",
        condition: () => PlayerProgress.infinityUnlocked(),
        id: 3,
        hidable: true,
      },
      {
        key: "glyph sets",
        name: "글리프 세트 기록",
        symbol: "<i class='fas fa-ellipsis-h'></i>",
        component: "GlyphSetRecordsTab",
        condition: () => PlayerProgress.realityUnlocked(),
        id: 4,
        hidable: true,
      },
      {
        key: "speedrun milestones",
        name: "스피드런 마일스톤",
        symbol: "<i class='fas fa-flag-checkered'></i>",
        component: "SpeedrunMilestonesTab",
        condition: () => player.speedrun.isActive,
        id: 5,
        hidable: true,
      },
      {
        key: "speedrun records",
        name: "스피드런 기록",
        symbol: "<i class='fas fa-ranking-star'></i>",
        component: "PreviousSpeedrunTab",
        condition: () => Object.keys(player.speedrun.previousRuns).length > 0,
        id: 6,
        hidable: true,
      },
    ]
  },
  {
    key: "achievements",
    name: "도전과제",
    hideAt: 1.9,
    id: 3,
    hidable: true,
    subtabs: [
      {
        key: "normal",
        name: "일반 도전과제",
        symbol: "<i class='fas fa-trophy'></i>",
        component: "NormalAchievementsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "secret",
        name: "비밀 도전과제",
        symbol: "<i class='fas fa-question'></i>",
        component: "SecretAchievementTab",
        id: 1,
        hidable: true,
      }
    ]
  },
  {
    key: "automation",
    name: "자동화",
    id: 4,
    hideAt: 2.1,
    condition: () => player.records.totalAntimatter.gte(1e40),
    hidable: true,
    subtabs: [
      {
        key: "autobuyers",
        name: "자동구매기",
        symbol: "<i class='fas fa-cog'></i>",
        component: "AutobuyersTab",
        id: 0,
        hidable: true,
      },
      {
        key: "automator",
        name: "오토메이터",
        symbol: "<i class='fas fa-code'></i>",
        component: "AutomatorTab",
        condition: () => PlayerProgress.realityUnlocked(),
        id: 1,
        hidable: true,
      },
    ]
  },
  {
    key: "challenges",
    name: "도전",
    hideAt: 2,
    condition: () =>
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked() ||
      PlayerProgress.infinityUnlocked(),
    id: 5,
    hidable: true,
    subtabs: [
      {
        key: "normal",
        name: "일반 도전",
        symbol: "Ω",
        component: "NormalChallengesTab",
        id: 0,
        hidable: true
      },
      {
        key: "infinity",
        name: "무한 도전",
        symbol: "∞",
        component: "infinity-challenges-tab",
        condition: () => PlayerProgress.realityUnlocked() || PlayerProgress.hasBroken() || Pelle.isDoomed,
        id: 1,
        hidable: true
      },
      {
        key: "eternity",
        name: "영원 도전",
        symbol: "Δ",
        component: "eternity-challenges-tab",
        condition: () =>
          PlayerProgress.realityUnlocked() ||
          player.challenge.eternity.unlocked !== 0 ||
          EternityChallenges.all.some(ec => ec.completions > 0),
        id: 2,
        hidable: true
      }
    ],
  },
  {
    key: "infinity",
    name: "무한",
    hideAt: 2.2,
    UIClass: "o-tab-btn--infinity",
    before: "InfinityPointsHeader",
    id: 6,
    condition: () => PlayerProgress.infinityUnlocked(),
    hidable: true,
    subtabs: [
      {
        key: "upgrades",
        name: "무한 업그레이드",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "InfinityUpgradesTab",
        condition: () =>
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 0,
        hidable: true,
      },
      {
        key: "break",
        name: "무한 돌파",
        symbol: "∝",
        component: "BreakInfinityTab",
        condition: () =>
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 1,
        hidable: true,
      },
      {
        key: "replicanti",
        name: "복제자",
        symbol: "Ξ",
        component: "ReplicantiTab",
        condition: () =>
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 2,
        hidable: true,
      }
    ],
  },
  {
    key: "eternity",
    name: "영원",
    hideAt: 1.8,
    UIClass: "o-tab-btn--eternity",
    condition: () =>
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked(),
    before: "EternityPointsHeader",
    id: 7,
    hidable: true,
    subtabs: [
      {
        key: "studies",
        name: "시간 연구",
        symbol: "<i class='fas fa-book'></i>",
        component: "TimeStudiesTab",
        id: 0,
        hidable: true,
      },
      {
        key: "upgrades",
        name: "영원 업그레이드",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "EternityUpgradesTab",
        id: 1,
        hidable: true,
      },
      {
        key: "milestones",
        name: "영원 마일스톤",
        symbol: "<i class='fas fa-star'></i>",
        component: "EternityMilestonesTab",
        id: 2,
        hidable: true,
      },
      {
        key: "dilation",
        name: "시간 팽창",
        symbol: "Ψ",
        component: "TimeDilationTab",
        condition: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
        id: 3,
        hidable: true,
      }
    ],
  },
  {
    key: "reality",
    name: "현실",
    hideAt: 2.3,
    UIClass: "o-tab-btn--reality",
    condition: () => PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
    id: 8,
    hidable: true,
    subtabs: [
      {
        key: "glyphs",
        name: "글리프",
        symbol: "<i class='fas fa-clone'></i>",
        component: "GlyphsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "upgrades",
        name: "현실 업그레이드",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "RealityUpgradesTab",
        id: 1,
        hidable: true,
      },
      {
        key: "imag_upgrades",
        name: "허수 업그레이드",
        symbol: "<i class='fas fa-level-up-alt'></i>",
        component: "ImaginaryUpgradesTab",
        condition: () => MachineHandler.isIMUnlocked,
        id: 2,
        hidable: true,
      },
      {
        key: "perks",
        name: "퍼크",
        symbol: "<i class='fas fa-project-diagram'></i>",
        component: "PerksTab",
        id: 3,
        hidable: true,
      },
      {
        key: "hole",
        name: "블랙홀",
        symbol: "<i class='fas fa-circle'></i>",
        component: "BlackHoleTab",
        condition: () => PlayerProgress.realityUnlocked(),
        id: 4,
        hidable: true,
      },
      {
        key: "alchemy",
        name: "글리프 연금술",
        symbol: "<i class='fas fa-vial'></i>",
        component: "AlchemyTab",
        condition: () => Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
        id: 5,
        hidable: true,
      },
    ],
  },
  {
    key: "celestials",
    name: "셀레스티얼",
    hideAt: 2.4,
    UIClass: "o-tab-btn--celestial",
    condition: () => Teresa.isUnlocked,
    id: 9,
    hidable: true,
    subtabs: [
      {
        key: "celestial-navigation",
        name: "셀레스티얼 네비게이션",
        symbol: "<i class='fas fa-map-marked-alt'></i>",
        component: "CelestialNavigationTab",
        id: 0,
        hidable: true,
      },
      {
        key: "teresa",
        name: "테레사",
        symbol: "Ϟ",
        component: "TeresaTab",
        id: 1,
        hidable: true,
      },
      {
        key: "effarig",
        name: "에파리그",
        symbol: "Ϙ",
        component: "EffarigTab",
        condition: () => TeresaUnlocks.effarig.isUnlocked,
        id: 2,
        hidable: true,
      },
      {
        key: "enslaved",
        name: "이름없는 자들",
        symbol: "<div class='o-tab-btn--cel3'>\uf0c1</div>",
        component: "EnslavedTab",
        condition: () => EffarigUnlock.eternity.isUnlocked,
        id: 3,
        hidable: true,
      },
      {
        key: "v",
        name: "V",
        symbol: "⌬",
        component: "VTab",
        condition: () => Achievement(151).isUnlocked,
        id: 4,
        hidable: true,
      },
      {
        key: "ra",
        name: "라",
        symbol: "<i class='fas fa-sun'></i>",
        component: "RaTab",
        condition: () => VUnlocks.raUnlock.isUnlocked,
        id: 5,
        hidable: true,
      },
      {
        key: "laitela",
        name: "라이텔라",
        symbol: "ᛝ",
        component: "LaitelaTab",
        condition: () => Laitela.isUnlocked,
        id: 6,
        hidable: true,
      },
      {
        key: "pelle",
        name: "펠레",
        symbol: "♅",
        component: "PelleTab",
        condition: () => Pelle.isUnlocked,
        id: 7,
        hidable: true,
      },
    ]
  },
  {
    key: "shop",
    name: "한글 패치",
    UIClass: "o-tab-btn--korean",
    hideAt: 1.5,
    condition: () => true,
    id: 10,
    hidable: true,
    subtabs: [
      {
        key: "shop",
        name: "크레딧",
        symbol: "한",
        component: "KRTab",
        id: 0,
        hidable: true
      }
    ]
  }
];
