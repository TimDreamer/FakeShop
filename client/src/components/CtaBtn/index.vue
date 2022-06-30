<template>
  <button class="cta-button" @click="cta">{{ content }} &rarr;</button>
</template>

<script>
export default {
  name: "CtaBtn",
  props: {
    content: {
      type: String,
      default: "Have a look",
    },
  },
  methods: {
    cta() {
      this.$router.push({ name: "Products" });
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/sass/extends" as *

.cta-button
    @extend %cta-button
</style>
