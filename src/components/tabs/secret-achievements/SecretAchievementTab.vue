<script>
import SecretAchievementRow from "./SecretAchievementRow";

export default {
  name: "SecretAchievementTab",
  components: {
    SecretAchievementRow
  },
  computed: {
    rows: () => SecretAchievements.allRows,
  }
};
</script>

<template>
  <div class="l-achievements-tab">
    <div class="c-achievements-tab__header">
      <span>
        비밀 도전과제는 선택사항이며, 추가 보너스를 부여하지 않습니다.
      </span>
    </div>
    <div class="l-achievement-grid">
      <secret-achievement-row
        v-for="(row, i) in rows"
        :key="i"
        :row="row"
      />
    </div>
  </div>
</template>
