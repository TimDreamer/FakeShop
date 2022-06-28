<template>
  <div
    class="cta"
    :style="{ backgroundImage: 'url(' + require('@/assets/ad.jpg') + ')' }"
  >
    <h1 class="cta-title">Welcome to FakeShop</h1>
    <button class="cta-button" @click="cta">Have a look &rarr;</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    cta() {
      this.$router.push({ name: "Products" });
    },
  },
};
</script>

<style lang="sass" scoped>
@use "../../sass/mixins" as *
@use "../../sass/extends" as *
@use "../../sass/variables" as *

.cta
  width: 100%
  height: calc( 100% - 120px )
  background: no-repeat center center
  background-size: 100% 100%
  +flexCenter
  flex-direction: column
  gap: 55%
  &-title
    color: $gray-1
    font-size: 6rem
    border-bottom: .3rem solid $gray-1
    padding: 0 2rem 1rem 2rem
  &-button
    @extend %cta-button
</style>
