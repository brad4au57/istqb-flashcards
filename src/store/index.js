import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    unansweredQuestions: [],
    answeredQuestions: [],
    currentQuestion: {
      question: "If you see this, the cards are not working properly",
      answer: "Try Reloading"
    },
    cardFlipped: false,
    windowWidth: window.innerWidth
  },
  getters: {
    questionsLeft(state) {
      return state.unansweredQuestions.length;
    },
    currentQuestion(state) {
      return state.currentQuestion.question;
    },
    currentAnswer(state) {
      return state.currentQuestion.answer;
    }
  },
  mutations: {
    setUnanswered(state, questions) {
      state.unansweredQuestions = questions;
    },
    pushUnanswered(state, question) {
      state.unansweredQuestions.push(question);
    },
    pushAnswered(state, question) {
      state.unansweredQuestions = state.unansweredQuestions.filter(
        q => q !== question
      );
      state.answeredQuestions.push(question);
    },
    setCurrentQuestion(state, question) {
      state.currentQuestion = question;
      state.cardFlipped = false;
    },
    flipCard(state) {
      state.cardFlipped = !state.cardFlipped;
    },
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth;
    }
  },
  actions: {
    init(context) {
      context.commit("setCurrentQuestion", randomQuestion(context));
    },
    correctAnswer(context) {
      const question = context.state.currentQuestion;
      context.commit("pushAnswered", question);
      context.commit("setCurrentQuestion", randomQuestion(context));
    },
    wrongAnswer(context) {
      const question = context.state.currentQuestion;
      context.commit("pushUnanswered", question);
      context.commit("setCurrentQuestion", randomQuestion(context));
    }
  }
});

function randomQuestion(context) {
  const numQuestions = context.state.unansweredQuestions.length;

  if (numQuestions > 0) {
    const randomIndex = Math.floor(numQuestions * Math.random());
    return context.state.unansweredQuestions[randomIndex];
  } else {
    // Possibly insert logic here for no questions left
    return null;
  }
}
