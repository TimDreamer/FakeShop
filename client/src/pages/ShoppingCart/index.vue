<template>
  <div class="shoppingCart">
    <div class="shoppingCart-list" v-if="products.length">
      <cart-item
        class="shoppingCart-item"
        v-for="product in products"
        :product="product"
        :key="product.id"
      ></cart-item>
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
  },
};
</script>

<style></style>
