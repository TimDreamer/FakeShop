<template>
  <div ref="spinnerWrapper">
    <slot :loading="loading" :onLoad="loaded"></slot>
    <div class="spinner" v-show="loading">
      Loading
      <div class="spinner-item spinner-gray1"></div>
      <div class="spinner-item spinner-gray2"></div>
      <div class="spinner-item spinner-gray3"></div>
      <div class="spinner-item spinner-gray4"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpinnerWrapper",
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    loaded() {
      this.loading = false;
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/sass/variables" as *
@use "@/sass/animations" as *

.spinner
    width: 50%
    height: auto
    position: relative
    display: flex
    justify-content: center
    align-items: center
    font-size: 2rem
    overflow: hidden
    animation: text-fade 2s ease-in-out infinite alternate
    &-item
        position: absolute
        width: 100%
        height: 100%
        border-radius: 50%
        border: 15px solid transparent
        mix-blend-mode: overlay
        animation: rotate var(--duration) var(--timing) infinite
        pointer-events: none
    &-gray1
        border-top-color: $gray-1
        --duration: 1.5s
        --timing: ease-in-out
    &-gray2
        border-right-color: $gray-2
        --duration: 2s
        --timing: ease-in
    &-gray3
        border-bottom-color: $gray-3
        --duration: 2.5s
        --timing: ease-out
    &-gray4
        border-left-color: $gray-4
        --duration: 3s
        --timing: linear
</style>
