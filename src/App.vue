<template>
  <div id="app">
    <div class="header">
      <h1 class="title">ISTQB Foundations</h1>
      <h3>Flashcard Quiz</h3>
    </div>
    <flashcard v-show="numLeft > 0" :front="question" :back="answer"></flashcard>
    <success v-show="numLeft == 0"></success>

    <div v-if="windowWidth < 576">
      <span class="mobile-tips">(Tap Card For Answer)</span>
    </div>
    <div v-if="this.$store.state.cardFlipped">
      <button @click="correct" class="correct-btn">Correct</button>
      <button @click="wrong" class="wrong-btn">Wrong</button>
    </div>
    <div class="score-info">
      <p class="numLeft">Questions Left: {{ numLeft }}</p>
      <p class="score">Correct: {{ score }}</p>
    </div>
  </div>
</template>

<script>
import flashcard from "./components/Flashcard.vue";
import success from "./components/Success.vue";

export default {
  name: "App",
  components: {
    flashcard,
    success
  },
  data() {
    return {
      score: 0
    };
  },
  created: function() {
    window.addEventListener("resize", this.$store.commit("setWindowWidth"));
  },
  computed: {
    question() {
      return this.$store.getters.currentQuestion;
    },
    answer() {
      return this.$store.getters.currentAnswer;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    numLeft() {
      return this.$store.getters.questionsLeft;
    }
  },
  methods: {
    correct() {
      this.$store.dispatch("correctAnswer");
      this.score++;
    },
    wrong() {
      this.$store.dispatch("wrongAnswer");
    }
  }
};
</script>

<style>
html,
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #e8e8e8;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3vh;
}

.score-info {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 5vh;
}

.numLeft,
.score {
  margin: 0;
}

.correct-btn {
  background-color: #5cb85c;
  color: #efefef;
  font-family: Montserrat, Arial;
  cursor: pointer;
  border: none;
  width: 100px;
  text-align: center;
  font-size: 1em;
  padding: 10px;
  margin-left: 2vw;
  margin: 2vh 2vw 0 0;
  border-radius: 3px;
}

.correct-btn:hover {
  opacity: 0.6;
}

.wrong-btn {
  background-color: #f0ad4e;
  color: #efefef;
  font-family: Montserrat, Arial;
  cursor: pointer;
  border: none;
  width: 100px;
  text-align: center;
  font-size: 1em;
  padding: 10px;
  margin-left: 2vw;
  margin: 2vh 0 0 2vw;
  border-radius: 3px;
}

.wrong-btn:hover {
  opacity: 0.6;
}
</style>
