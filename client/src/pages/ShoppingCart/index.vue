<template>
  <div class="shoppingCart">
    <h1 class="shoppingCart-title">SHOPPING CART</h1>
    <div class="shoppingCart-list" v-if="products.length">
      <cart-item
        class="shoppingCart-item"
        v-for="product in products"
        :product="product"
        :key="product.id"
      ></cart-item>
      <div class="shoppingCart-buy">
        <div class="shoppingCart-buy-description">
          <h1 class="shoppingCart-buy-title">
            SUBTOTAL ({{ getQrtTotal }}) ITEMS
          </h1>
          <p class="shoppingCart-buy-price">
            {{ getQrtPriceTotal | currency }}
          </p>
        </div>
        <button class="shoppingCart-buy-btn" :disabled="getQrtTotal === 0">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
    <div class="shoppingCart-nothing" v-else>Nothing</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "./components/CartItem.vue";

export default {
  name: "ShoppingCart",
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      products: "getProductsInCart",
    }),
    ...mapGetters(["getQrtTotal", "getQrtPriceTotal"]),
  },
};
</script>

<style lang="sass" scoped>
@use '@/sass/extends' as *
@use '@/sass/variables' as *

.shoppingCart
  &-title
    font-size: 3.6rem
    letter-spacing: .5rem
    margin-left: 5%
    margin-top: 2.5%

  &-buy
    text-align: center
    border: 2px solid $gray-2
    width: 30%
    min-width: max-content
    margin: auto
    &-description
      display: flex
      flex-direction: column
      align-items: flex-start
      gap: 2rem
      padding: 2rem 2rem
      border-bottom: 2px solid $gray-2
    &-title
      font-size: 3.2rem
      letter-spacing: .5rem
    &-price
      font-size: 2.4rem
    &-btn
      @extend %detailBtn
      background-color: $gray-4
      color: $gray-2
      letter-spacing: .2rem
      padding: 1rem 6rem
      @extend %disabled-btn
</style>
