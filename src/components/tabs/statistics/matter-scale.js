import { DC } from "@/core/constants";

export const MatterScale = {
  proton: new Decimal("2.82e-45"),

  estimate(matter) {
    if (!matter) return ["아직 반물질이 존재하지 않습니다."];
    if (matter.gt(DC.E100000)) {
      return [
        `매 초 ${formatInt(3)}개의 숫자를 쓴다면, 반물질의 개수를 쓰기 위해`,
        TimeSpan.fromSeconds(matter.log10() / 3).toString(),
        "이(가) 걸릴 것입니다."
      ];
    }
    const planck = new Decimal("4.22419e-105");
    const planckedMatter = matter.times(planck);
    if (planckedMatter.gt(this.proton)) {
      const scale = this.macroScale(planckedMatter);
      const amount = format(planckedMatter.dividedBy(scale.amount), 2, 1);
      return [`만약 모든 반물질의 크기가 플랭크 크기라면 ${scale.name} ${amount}개 ${scale.verb} 수 있습니다.`];
    }
    const scale = this.microScale(matter);
    return [`만약 모든 반물질의 크기가 ${format(this.proton.div(scale.amount).div(matter), 2, 1)} ${scale.name},
    양성자를 1개 만들 수 있습니다.`];
  },

  microScale(matter) {
    const micro = this.microObjects;
    for (let i = 0; i < micro.length; i++) {
      const scale = micro[i];
      if (matter.times(scale.amount).lt(this.proton)) {
        return scale;
      }
    }
    throw "Cannot determine smallest antimatter scale";
  },

  macroScale(matter) {
    const macro = this.macroObjects;
    const last = macro.last();
    if (matter.gte(last.amount)) return last;
    let low = 0;
    let high = macro.length;
    while (low !== high) {
      const mid = Math.floor((low + high) / 2);
      if (macro[mid].amount.lte(matter)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return macro[high - 1];
  },

  microObjects: [
    { amount: new Decimal("1e-54"), name: "아토미터 큐브" },
    { amount: new Decimal("1e-63"), name: "젭토미터 큐브" },
    { amount: new Decimal("1e-72"), name: "욕토미터 큐브" },
    { amount: new Decimal("4.22419e-105"), name: "플랭크 크기" }
  ],

  macroObjects: [
    { amount: new Decimal("2.82e-45"), name: "양성자를", verb: "만들" },
    { amount: new Decimal("1e-42"), name: "원자핵을", verb: "만들" },
    { amount: new Decimal("7.23e-30"), name: "수소 원자를", verb: "만들" },
    { amount: new Decimal("5e-21"), name: "바이러스를", verb: "만들" },
    { amount: new Decimal("9e-17"), name: "적혈구를", verb: "만들" },
    { amount: new Decimal("6.2e-11"), name: "모래알을", verb: "만들" },
    { amount: new Decimal("5e-8"), name: "쌀알을", verb: "만들" },
    { amount: new Decimal("3.555e-6"), name: "티스푼을", verb: "채울" },
    { amount: new Decimal("7.5e-4"), name: "와인병을", verb: "채울" },
    { amount: DC.D1, name: "냉장고를", verb: "채울" },
    { amount: new Decimal("2.5e3"), name: "올림픽 크기의 수영장을", verb: "채울" },
    { amount: new Decimal("2.6006e6"), name: "기자의 대피라미드를", verb: "만들" },
    { amount: new Decimal("3.3e8"), name: "만리장성을", verb: "만들" },
    { amount: new Decimal("5e12"), name: "큰 소행성을", verb: "만들" },
    { amount: new Decimal("4.5e17"), name: "왜행성을", verb: "만들" },
    { amount: new Decimal("1.08e21"), name: "지구를", verb: "만들" },
    { amount: new Decimal("1.53e24"), name: "목성을", verb: "만들" },
    { amount: new Decimal("1.41e27"), name: "태양을", verb: "만들" },
    { amount: new Decimal("5e32"), name: "적색거성을", verb: "만들" },
    { amount: new Decimal("8e36"), name: "초거성을", verb: "만들" },
    { amount: new Decimal("1.7e45"), name: "성운을", verb: "만들" },
    { amount: new Decimal("1.7e48"), name: "오르트구름을", verb: "만들" },
    { amount: new Decimal("3.3e55"), name: "국부 거품을", verb: "만들" },
    { amount: new Decimal("3.3e61"), name: "은하를", verb: "만들" },
    { amount: new Decimal("5e68"), name: "국부군을", verb: "만들" },
    { amount: new Decimal("1e73"), name: "조각가 공허를", verb: "만들" },
    { amount: new Decimal("3.4e80"), name: "관측 가능한 우주를", verb: "만들" },
    { amount: new Decimal("1e113"), name: "차원을", verb: "만들" },
    { amount: DC.C2P1024, name: "무한 차원을", verb: "만들" },
    { amount: new Decimal("1e65000"), name: "시간 차원을", verb: "만들" }
  ]
};
