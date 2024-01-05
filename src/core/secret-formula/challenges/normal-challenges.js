import { DC } from "../../constants";

// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "도전 밖에서 무한에 처음으로 도달하세요."
        : "무한에 처음으로 도달하세요.";
    },
    name: "제1 반물질 차원 자동구매기",
    reward: "제1 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 2,
    legacyId: 2,
    isQuickResettable: false,
    description:
      () => `어떤 것이라도 구매하면 반물질의 생산이 멈추고, ${formatInt(3)}분 동안 서서히 돌아옵니다.`,
    name: "제2 반물질 차원 자동구매기",
    reward: "제2 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 3,
    legacyId: 3,
    isQuickResettable: false,
    description:
      `제1 반물질 차원이 매우 약해지지만, 시간이 지남에 따라 기하급수적으로 강해집니다. 이 효과는 차원 가속이나 반물질 은하를 얻으면 초기화됩니다.`,
    name: "제3 반물질 차원 자동구매기",
    reward: "제3 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 4,
    legacyId: 8,
    isQuickResettable: false,
    description: "차원을 구매하면 모든 하위 차원이 사라집니다. 이는 마치 보상이 없는 차원 희생과 같습니다.",
    name: "제4 반물질 차원 자동구매기",
    reward: "제4 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 5,
    legacyId: 6,
    isQuickResettable: false,
    description:
      () => `틱스피드 업그레이드 배율이  ${formatX(1.1245, 0, 3)}배가 아닌 ${formatX(1.080, 0, 3)}배에서 시작됩니다.`,
    name: "제5 반물질 차원 자동구매기",
    reward: "제5 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 6,
    legacyId: 10,
    isQuickResettable: false,
    description: () => "각각의 차원들이 반물질 대신 2단계 앞의 차원을 요구하게 됩니다.",
    name: "제6 반물질 차원 자동구매기",
    reward: "제6 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 7,
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
      `${formatInt(10)}개의 차원을 구매했을 때의 배율이 ${formatX(1)}배로 감소하지만, 차원 가속 당 ${formatX(0.2, 1, 1)}배씩 최대 ${formatX(2)}배까지 상승합니다.`,
    name: "제7 반물질 차원 자동구매기",
    reward: "제7 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 8,
    legacyId: 11,
    isQuickResettable: false,
    description: `차원 가속에 보상이 없고 반물질 은하를 구매할 수 없지만, 차원 희생이 매우 강력해지고 틱스피드를 제외한 모든 것들을 초기화합니다.`,
    name: "제8 반물질 차원 자동구매기",
    reward: "제8 반물질 차원 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 9,
    legacyId: 5,
    isQuickResettable: true,
    description: () => `틱스피드 업그레이드 혹은 ${formatInt(10)}개의 차원을 구매하면 같은 가격에 구매할 수 있는 다른 것들이 다음 가격으로 상승합니다.`,
    name: "틱스피드 자동구매기",
    reward: "틱스피드 자동구매기 업그레이드",
    lockedAt: DC.D0,
  },
  {
    id: 10,
    legacyId: 4,
    isQuickResettable: false,
    description: () => `반물질 차원이 제${formatInt(6)} 반물질 차원까지만 있으며, 차원 가속과 반물질 은하의 가격이 더욱 비싸집니다.`,
    name: "자동 차원 가속",
    reward: "차원 가속 자동구매기",
    lockedAt: DC.D16,
  },
  {
    id: 11,
    legacyId: 12,
    isQuickResettable: true,
    description: () => `제${formatInt(2)} 반물질 차원을 구매한 순간부터 물질이 생산되며, 물질이 반물질의 수를 넘어서면 보상 없이 차원 가속이 진행됩니다.`,
    name: "자동 반물질 은하",
    reward: "반물질 은하 자동구매기",
    lockedAt: DC.D16,
  },
  {
    id: 12,
    legacyId: 7,
    isQuickResettable: false,
    description: () => `각각의 반물질 차원은 ${formatInt(2)}단계 앞의 차원을 생산합니다. 제2 반물질 차원은 더욱 강화되며, 반물질을 생산합니다.`,
    name: "자동 빅 크런치",
    reward: "빅 크런치 자동구매기",
    lockedAt: DC.D16,
  }
];
