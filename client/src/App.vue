<template>
  <div id="app">
    <app-header></app-header>

    <keep-alive>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    appHeader: Header,
  },
};
</script>

<style lang="sass">
@use "@/sass/animations" as *
@use "@/sass/mixins" as *
@import url('https://fonts.googleapis.com/css2?family=Finlandica:ital,wght@1,500&display=swap')

*, *::before, *::after
  padding: 0
  margin: 0
  box-sizing: inherit
  font-family: inherit

html
  font-size: 62.5%
  font-family: 'Finlandica', cursive, sans-serif
body
  box-sizing: border-box
  +hideScrollBar

#app
  height: 100vh

.slide
  &-enter
    opacity: 0
  &-enter-active
    animation: slide-in 1s ease-out forwards
    transition: opacity .5s
  &-leave-active
    animation: slide-out 1s ease-out forwards
    transition: opacity 1s
    opacity: 0
</style>
