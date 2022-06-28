<template>
  <div class="product-item">
    <img :src="product.imageURL" alt="product" class="product-item-img" />
    <h1>{{ product.name }}</h1>
    <h2>{{ product.brand }}</h2>
    <h2>{{ product.category }}</h2>
    <stars :rating="product.rating"></stars>
    <h2>{{ product.numReviews }}</h2>
    <p>{{ product.price | currency }}</p>
  </div>
</template>

<script>
import Stars from "../../../components/Stars";

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
.product-item
  &-img
    width: 100%
    border-radius: 12px
</style>
