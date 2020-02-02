import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: getDefaultState(),
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
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    init(context) {
      context.commit("setCurrentQuestion", randomQuestion(context));
    },
    correctAnswer(context) {
      context.state.cardFlipped = false;
      const question = context.state.currentQuestion;
      context.commit("pushAnswered", question);
      setTimeout(
        () => context.commit("setCurrentQuestion", randomQuestion(context)),
        400
      );
    },
    wrongAnswer(context) {
      context.state.cardFlipped = false;
      setTimeout(
        () => context.commit("setCurrentQuestion", randomQuestion(context)),
        400
      );
    },
    resetCardState(context) {
      context.commit("resetState");
    }
  }
});

function randomQuestion(context) {
  let numQuestions = context.state.unansweredQuestions.length;

  if (numQuestions > 0) {
    const randomIndex = Math.floor(numQuestions * Math.random());
    return context.state.unansweredQuestions[randomIndex];
  } else {
    numQuestions = 0;
    return numQuestions;
  }
}
function getDefaultState() {
  return {
    unansweredQuestions: [],
    answeredQuestions: [],
    currentQuestion: {
      question: "If you see this, the cards are not working properly",
      answer: "Try Reloading"
    },
    cardFlipped: false,
    windowWidth: window.innerWidth,
    cardHeight: 0
  };
}
