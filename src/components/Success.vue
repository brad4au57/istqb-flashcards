<template>
  <div>
    <span role="img" aria-label="party emoji">🎉</span>
    <span role="img" aria-label="party emoji">🎉</span>
    <span role="img" aria-label="party emoji">🎉</span>
    <h2>Congrats!</h2>
    <h2>You answered them all!</h2>
    <button @click="resetCards" class="reset-btn">Click To Start Over</button>
  </div>
</template>

<script>
import questions from "../data/questions";

export default {
  methods: {
    resetCards() {
      this.$store.commit("resetState");
      this.$store.commit("setUnanswered", questions);
      this.$store.dispatch("init");
      this.$parent.score = 0;
    }
  }
};
</script>

<style>
.reset-btn {
  border: none;
  border-radius: 3px;
  background-color: #5bc0de;
  color: #FFF;
  font-size: 1em;
  padding: 10px;
  margin-bottom: 3vh;
  cursor: pointer;
}
.reset-btn:hover {
  opacity: 0.7;
}
</style>
