<template>
  <div class="products">
    <div class="products-list">
      <product
        v-for="product in products"
        :product="product"
        :key="product.id"
        @click.native="showView(product)"
      ></product>
    </div>
    <product-detail
      :selectedProduct="selectedProduct"
      ref="pDetail"
    ></product-detail>
  </div>
</template>

<script>
import Product from "./components/product.vue";
import ProductDetail from "./components/ProductDetail.vue";
import ProductsQuery from "../../schema/ProductsQuery.js";

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
    showView(product) {
      this.selectedProduct = product;
      this.$refs.pDetail.showView();
    },
  },
  apollo: {
    products: {
      query: ProductsQuery,
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
