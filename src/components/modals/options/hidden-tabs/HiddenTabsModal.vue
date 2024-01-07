<script>
import HiddenTabGroup from "@/components/modals/options/hidden-tabs/HiddenTabGroup";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";

export default {
  name: "HiddenTabsModal",
  components: {
    HiddenTabGroup,
    ModalWrapperOptions,
  },
  data() {
    return {
      isEnslaved: false,
      isAlmostEnd: false,
    };
  },
  computed: {
    tabs: () => Tabs.currentUIFormat,
  },
  methods: {
    update() {
      this.isEnslaved = Enslaved.isRunning;
      this.isAlmostEnd = Pelle.hasGalaxyGenerator;
    },
  },
};
</script>

<template>
  <ModalWrapperOptions class="l-wrapper">
    <template #header>
      탭 설정
    </template>
    <div class="c-modal--short">
      버튼을 눌러 탭의 켜기/끄기 설정을 바꿀 수 있습니다.
      <br>
      몇몇 탭들은 숨길 수 없으며, 현재 탭은 숨길 수 없습니다.
      <br>
      탭을 숨기면 하위의 서브탭들이 전부 숨겨지고,
      탭을 다시 보이게 하면 하위의 서브탭들도 전부 나타납니다.
      <br>
      <div v-if="isAlmostEnd">
       은하 생성기를 해금한 이후에는 탭을 숨길 수 없습니다!
      </div>
      <div v-if="isEnslaved">
        <br>
        <i style="color:orange;">넌... 모든 곳을 보아야 한다...</i>
        <br>
        (이름없는 자들의 현실에서는 탭을 숨길 수 없습니다..)
      </div>
      <HiddenTabGroup
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
        :change-enabled="!isEnslaved && !isAlmostEnd"
        class="l-hide-modal-tab-container"
      />
    </div>
  </ModalWrapperOptions>
</template>

<style scoped>
.l-wrapper {
  width: 62rem;
}

.t-s12 .l-wrapper {
  width: 65rem;
}
</style>