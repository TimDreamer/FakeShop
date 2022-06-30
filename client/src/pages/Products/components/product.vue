<template>
  <div class="product">
    <div class="product-imgWrapper">
      <img
        :src="product.imageURL"
        alt="product"
        class="product-img"
        v-on="$listeners"
      />
    </div>
    <div class="product-content">
      <h1 class="product-name">{{ product.name }}</h1>
      <h2 class="product-brand">{{ product.brand }}</h2>
      <div class="product-rating">
        <stars :rating="product.rating" :scale="1.6"></stars>
        <h2>{{ product.numReviews }} reviews</h2>
      </div>
      <p class="product-price">{{ product.price | currency }}</p>
    </div>
  </div>
</template>

<script>
import Stars from "@/components/Stars";

export default {
  name: "Product",
  components: {
    Stars,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="sass" scoped>
@use '@/sass/variables' as *

.product
  padding: 3rem 2rem 6rem
  border: 1px solid $gray-2
  border-radius: 1.2rem
  &-imgWrapper
    overflow: hidden
  &-img
    width: 100%
    border-radius: 1.2rem
    transition: .5s
    &:hover
      transform: scale(1.15)
  &-content
    padding: 2rem 1rem 0
  &-rating
    display: flex
    justify-content: space-between
    padding: 1rem 0
  &-price
    font-size: 3.2rem
    font-weight: bold
    font-style: italic
</style>
