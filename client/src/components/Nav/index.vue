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
        <Badge :point="getCartProductsTotal"></Badge>
      </router-link>
    </div>
  </nav>
</template>

<script>
import Badge from "@/components/Badge";

export default {
  name: "Nav",
  components: {
    Badge,
  },
  computed: {
    getCartProductsTotal() {
      return this.$store.getters.getProductsInCart.reduce((acc, p) => {
        return acc + p.qty;
      }, 0);
    },
  },
};
</script>

<style lang="sass" scoped>
@use "../../sass/variables" as *
@use "../../sass/mixins" as *
@use "../../sass/extends" as *

.nav
  height: 100%
  background-color: $gray-4
  flex: 1
  +flexCenter
  justify-content: space-between
  padding: 0 32px
  .brand
    &-name
      font-size: 32px
      color: $gray-2
  .links
    flex: 0 0 50%
    +flexCenter
    justify-content: space-between
    &-item
      text-decoration: none
      font-size: 24px
      @extend %button
      position: relative
</style>
