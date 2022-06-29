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
import Header from "./components/Header";
import ProductsQuery from "./schema/ProductsQuery";
import { SAVE_PRODUCTS } from "./store/types";

export default {
  name: "App",
  components: {
    appHeader: Header,
  },
  apollo: {
    products: {
      query: ProductsQuery,
      result({ data: { products } }) {
        this.$store.dispatch(SAVE_PRODUCTS, products);
      },
    },
  },
};
</script>

<style lang="sass">
@use "./sass/animations" as *

*, *::before, *::after
  padding: 0
  margin: 0
  box-sizing: inherit

html
  font-size: 62.5%
body
  box-sizing: border-box

#app
  height: 100vh
  // overflow: hidden

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
