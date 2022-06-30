<template>
  <div class="shoppingCart">
    <h1 class="shoppingCart-title">SHOPPING CART</h1>
    <transition name="fade" mode="out-in">
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
      <nothing-page class="nothing" v-else>
        <h1 class="nothing-title">Nothing in the Cart</h1>
        <div
          class="nothing-background"
          :style="{
            backgroundImage: `url(${require('@/assets/sorry.jpg')})`,
          }"
        >
          <cta-btn content="Go buy some" class="nothing-cta"></cta-btn>
        </div>
      </nothing-page>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "./components/CartItem.vue";
import NothingPage from "./components/Nothing.vue";
import CtaBtn from "@/components/CtaBtn";

export default {
  name: "ShoppingCart",
  components: {
    CartItem,
    NothingPage,
    CtaBtn,
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

.fade
  &-enter-active, &-leave-active
    transition: opacity .5s
  &-enter, &-leave-to
    opacity: 0
  &-enter-to, &-leave
    opacity: 1

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

.nothing
  &-title
    font-size: 6.4rem
    letter-spacing: 1.6rem
    margin-bottom: 3rem
  &-background
    background-size: 100% 100%
    background-repeat: no-repeat
    width: 80rem
    height: 60rem
    position: relative
  &-cta
    position: absolute
    bottom: 5%
    right: 5%
</style>
