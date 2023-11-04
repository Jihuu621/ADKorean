<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "AntimatterGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      newGalaxies: 0,
      keepAntimatter: false,
      perkANRBought: false,
      keepDimBoost: false
    };
  },
  computed: {
    topLabel() {
      if (this.bulk) return `당신은 반물질 은하를 ${this.newGalaxies}개 구입하려 합니다`;
      return `당신은 반물질 은하를 구입하려 합니다.`;
    },
    message() {
      const resetResouces = [];
      if (Pelle.isDoomed) resetResouces.push("반물질", "반물질 차원", "틱스피드 업그레이드");
      if (!this.perkANRBought) resetResouces.push("반물질 차원", "틱스피드 업그레이드");
      if (!this.keepDimBoost) resetResouces.push("차원 가속");
      if (!this.keepAntimatter && !this.perkANRBought) resetResouces.push("반물질");
      const resetList = makeEnumeration(resetResouces);
      let tickspeedFixed = "";
      if (InfinityChallenge(3).isRunning) {
        tickspeedFixed = `Infinity Challenge ${InfinityChallenge(3).id}`;
      } else if (Ra.isRunning) {
        tickspeedFixed = `${Ra.displayName}'s Reality`;
      }
      const tickspeedInfo = (tickspeedFixed === "")
        ? "틱스피드 업그레이드의 효율이 소폭 상승합니다."
        : `you will not receive a boost to Tickspeed Upgrades, because you are in ${tickspeedFixed}.`;
      const message = (resetList === "")
        ? `아무것도 리셋하지 않고 ${tickspeedInfo}`
        : `이는 당신의 ${resetList}을(를) 리셋합니다. 하지만, ${tickspeedInfo}`;

      return `${message} 계속하시겠습니까?`;
    }
  },
  created() {
    this.on$(GAME_EVENT.DIMBOOST_AFTER, () =>
      (BreakInfinityUpgrade.autobuyMaxDimboosts.isBought ? undefined : this.emitClose()));
  },
  methods: {
    update() {
      if (this.bulk) {
        const req = Galaxy.requirement;
        const dim = AntimatterDimension(req.tier);
        const bulk = bulkBuyBinarySearch(dim.totalAmount, {
          costFunction: x => Galaxy.requirementAt(x).amount,
          cumulative: false,
        }, player.galaxies);
        if (bulk) {
          this.newGalaxies = Galaxy.buyableGalaxies(Math.round(dim.totalAmount.toNumber())) - player.galaxies;
        }
      }
      this.keepAntimatter = Achievement(111).isUnlocked;
      this.perkANRBought = Perk.antimatterNoReset.canBeApplied;
      this.keepDimBoost = (Achievement(143).isUnlocked && !Pelle.isDoomed) ||
        PelleUpgrade.galaxyNoResetDimboost.canBeApplied;
    },
    handleYesClick() {
      requestGalaxyReset(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="antimatterGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>

    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
