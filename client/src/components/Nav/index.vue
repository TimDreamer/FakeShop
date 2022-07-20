<template>
  <nav class="nav">
    <div class="brand">
      <h3 class="brand-name">FakeShop</h3>
    </div>
    <div class="links">
      <router-link :to="{ name: 'HomePage' }" class="links-item"
        >Home</router-link
      >
      <router-link :to="{ name: 'Products' }" class="links-item"
        >Products</router-link
      >
      <router-link :to="{ name: 'ShoppingCart' }" class="links-item"
        >ShoppingCart
        <Badge :point="getQrtTotal"></Badge>
      </router-link>
    </div>
  </nav>
</template>

<script>
import Badge from "@/components/Badge";
import { mapGetters } from "vuex";

export default {
  name: "Nav",
  components: {
    Badge,
  },
  computed: {
    ...mapGetters(["getQrtTotal"]),
  },
};
</script>

<style lang="sass" scoped>
@use "@/sass/variables" as *
@use "@/sass/mixins" as *
@use "@/sass/extends" as *

.nav
  height: 100%
  background-color: $gray-4
  flex: 1
  +flexCenter
  justify-content: space-between
  padding: 0 32px
  +screenWidthMax(950px)
    flex-direction: column
    justify-content: space-evenly
  .brand
    &-name
      font-size: 32px
      color: $gray-2
  .links
    flex: 0 0 50%
    +flexCenter
    justify-content: space-between
    +screenWidthMax(950px)
      align-self: stretch
    +screenWidthMax(500px)
      flex-direction: column
      align-self: flex-start
      align-items: flex-start
      gap: 15px
      position: fixed
      top: 30px
      left: 20px
      z-index: 50
    &-item
      text-decoration: none
      font-size: 24px
      @extend %button
      position: relative
      text-align: center
      +screenWidthMax(950px)
        flex: 0 0 25%
      +screenWidthMax(500px)
        box-shadow: 8px 16px 16px 5px rgba(0, 0, 0,0.3 )
</style>
