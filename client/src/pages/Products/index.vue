<template>
  <div class="products">
    <div class="products-list">
      <product
        v-for="product in products"
        :product="product"
        :key="product.id"
        @click="showView(product.id)"
      ></product>
    </div>
    <product-detail ref="pDetail"></product-detail>
  </div>
</template>

<script>
import Product from "./components/product.vue";
import ProductDetail from "./components/ProductDetail.vue";
import ProductsQuery from "../../schema/ProductsQuery.js";

import { CHANGE_SELECTED, SAVE_PRODUCTS } from "../../store/types";

export default {
  name: "Products",
  components: {
    Product,
    ProductDetail,
  },
  data() {
    return {
      products: [],
      selectedProduct: null,
    };
  },
  methods: {
    showView(id) {
      this.$store.dispatch(CHANGE_SELECTED, id).then(() => {
        this.$refs.pDetail.showView();
      });
    },
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

<style lang="sass" scoped>
@use "../../sass/mixins" as *

.products
  &-list
    width: 90%
    margin: 6rem auto
    +gridTemplate(null, 2, 30px)
    +gridCenter
    position: relative
</style>
