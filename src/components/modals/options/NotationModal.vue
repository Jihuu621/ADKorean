<script>
import * as ADNotations from "@antimatter-dimensions/notations";

import ModalWrapper from "@/components/modals/ModalWrapper";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "NotationModal",
  components: {
    ModalWrapper,
    SliderComponent
  },
  data() {
    return {
      commaDigits: 0,
      notationDigits: 0,
    };
  },
  computed: {
    sampleNums() {
      const largestExponent = "123456789012345";
      const numbers = [];
      for (let digits = 4; digits < 16; digits++) numbers.push(Decimal.pow10(largestExponent.substring(0, digits)));
      return numbers;
    },
    sliderProps() {
      return {
        min: 3,
        max: 15,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
  },
  watch: {
    commaDigits(newValue) {
      player.options.notationDigits.comma = newValue;
      ADNotations.Settings.exponentCommas.min = 10 ** newValue;
    },
    notationDigits(newValue) {
      player.options.notationDigits.notation = newValue;
      ADNotations.Settings.exponentCommas.max = 10 ** newValue;
    },
  },
  // This puts the sliders in the right spots on initialization
  created() {
    const options = player.options.notationDigits;
    this.commaDigits = options.comma;
    this.notationDigits = options.notation;
  },
  methods: {
    update() {
      const options = player.options.notationDigits;
      this.commaDigits = options.comma;
      this.notationDigits = options.notation;
    },

    // These need a bit of extra logic to ensure that the notation threshold is always >= the comma threshold
    adjustSliderComma(value) {
      this.commaDigits = value;
      player.options.notationDigits.comma = value;
      if (value > this.notationDigits) this.adjustSliderNotation(value);
    },
    adjustSliderNotation(value) {
      this.notationDigits = value;
      player.options.notationDigits.notation = value;
      if (value < this.commaDigits) this.adjustSliderComma(value);
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      지수 표기법 설정
    </template>
    숫자가 매우 클 때의 표기법을 조정할 수 있습니다. <br>
    작은 값을 사용하면 지수는 추가 서식 없이 바로 표시되며, 값이 클수록 지수에 쉼표가 삽입됩니다.<br>
    명확성을 위해 가장 큰 값은 지수를 줄이기 위해 표기 형식을 지수에 적용합니다. <br>
    아래 두 스크롤바를 통해 임계값을 조절할 수 있습니다.<br>
    <br>
    <br>
    <div class="c-single-slider">
      <b class="o-digit-text">지수의 쉼표에 대한 최소값: {{ formatInt(commaDigits) }}자리</b>
      <SliderComponent
        class="o-primary-btn--slider__slider o-slider"
        v-bind="sliderProps"
        :value="commaDigits"
        @input="adjustSliderComma($event)"
      />
    </div>
    <div class="c-single-slider">
      <b class="o-digit-text">지수 표기법 사용을 위한 최소값: {{ formatInt(notationDigits) }}자리</b>
      <SliderComponent
        class="o-primary-btn--slider__slider o-slider"
        v-bind="sliderProps"
        :value="notationDigits"
        @input="adjustSliderNotation($event)"
      />
    </div>
    <br>
    지수 표기법 샘플:
    <div class="c-sample-numbers">
      <span
        v-for="(num, id) in sampleNums"
        :key="id"
        class="o-single-number"
      >
        {{ formatPostBreak(num) }}
      </span>
    </div>
    <br>
    참고: 인터페이스는 일반적으로 {{ formatInt(5) }}자리 및 {{ formatInt(9) }}자리 설정의 과학적 표기법에 최적화되어 있습니다. <br>
    이러한 값과 크게 다른 경우 일부 텍스트가 이상하게 보이거나 UI 밖으로 넘어갈 수 있습니다. <br>
    또한 이러한 설정은 특정 표기법을 사용할 때 시각적 변화를 일으키지 않을 수 있습니다.<br>
  </ModalWrapper>
</template>

<style scoped>
.c-single-slider {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.o-digit-text {
  width: 40rem;
}

.o-slider {
  width: 25rem;
}

.c-sample-numbers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1.5rem;
}

.o-single-number {
  width: 33%;
}
</style>
