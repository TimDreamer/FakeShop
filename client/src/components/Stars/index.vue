<template>
  <div>
    <div class="stars">
      <span
        v-for="(starClass, idx) in initStarClasses"
        :class="starClass"
        class="stars-item"
        :key="idx"
      ></span>
    </div>
  </div>
</template>

<script>
const NUMBER_STARS = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    rating: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    initStarClasses() {
      const result = [];
      // times of 0.5
      const roundRating = Math.floor(this.rating * 2) / 2;
      const fullStars = Math.floor(this.rating);
      for (let i = 0; i < fullStars; i++) {
        result.push(CLS_ON);
      }
      if (roundRating !== fullStars) result.push(CLS_HALF);
      while (result.length !== NUMBER_STARS) result.push(CLS_OFF);
      return result;
    },
  },
};
</script>

<style lang="sass" scoped>
.stars
    &-item
        display: inline-block
        width: 1rem
        height: 1rem
        margin-right: 3px
        background-repeat: no-repeat
        background-size: 1rem 1rem
        &::last-child
            margin-right: 0
        &.on
            background-image: url(./star_on@2x.png)
        &.half
            background-image: url(./star_half@2x.png)
        &.off
            background-image: url(./star_off@2x.png)
</style>
