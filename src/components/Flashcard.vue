<template>
  <div ref="flashcard" class="flashcard-scene" @click="flipCard">
    <div class="card" v-bind:class="{isFlipped: isToggled}" v-bind:style="cardHeightStyle">
      <div class="card-face card-face__front">
        <div class="card-content center">
          <p ref="front">{{ front }}</p>
        </div>
      </div>
      <div class="card-face card-face__back">
        <div class="card-content center">
          <p id="back">{{ back }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import setTimeout from "timers";
export default {
  data() {
    return {
      cardHeightStyle: {}
    };
  },
  props: {
    front: {
      type: String,
      default: "Default Front"
    },
    back: {
      type: String,
      default: "Default Back"
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    isToggled() {
      return this.$store.state.cardFlipped;
    }
  },
  methods: {
    flipCard() {
      this.$store.commit("flipCard");
    },
    setContentHeight() {
      let contentHeight = this.$refs.front.scrollHeight + "px";
      this.$set(this.cardHeightStyle, "height", contentHeight);
    }
  },
  updated() {
    this.setContentHeight();
  }
};
</script>

<style>
/* Extra small devices (portrait phones, less than 576px) */
/* No media query since this is the default in Bootstrap */
.flashcard-scene {
  width: 80vw;
  min-height: 10vh;
  perspective: 1000px;
  margin: 5vh auto 3vh;
}
.card {
  position: relative;
  background-color: #FFF;
  min-height: 240px;
  width: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  font-size: 1.5em;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
}
.card-face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}
.card-face__back {
  background-color: #333;
  color: #fff;
  transform: rotateY(180deg);
}
.isFlipped {
  transform: rotateY(180deg);
}
.card-content p {
  padding: 5vw;
  height: 100%;
  margin: 0;
}
/* Small devices and Up (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .flashcard-scene {
    max-width: 600px;
    min-height: 30vh;
    margin: 5vh auto 3vh;
  }
}
</style>
