<script>
export default {
  name: "SaveFileName",
  components: {
  },
  data() {
    return {
      saveFileName: ""
    };
  },
  methods: {
    update() {
      this.saveFileName = player.options.saveFileName;
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, "");
    },
    handleChange(event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim());
      player.options.saveFileName = newName;
      event.target.value = newName;
    }
  }
};
</script>

<template>
  <div class="o-primary-btn o-primary-btn--option o-primary-btn--input l-options-grid__button">
    <b>세이브 파일 이름:</b>
    <span ach-tooltip="세이브 파일의 이름 짓기 (영문 16자, 공백과 하이픈 포함)">
      <input
        class="c-custom-save-name__input"
        type="text"
        maxlength="16"
        placeholder="커스텀 세이브 이름"
        :value="saveFileName"
        @change="handleChange"
      >
    </span>
  </div>
</template>

<style scoped>
.c-custom-save-name__input {
  text-align: center;
  font-family: Typewriter;
  font-size: 1.3rem;
  font-weight: bold;
  border: 0.1rem solid black;
  border-radius: var(--var-border-radius, 0.3rem);
}
</style>
