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
import Product from "@/pages/Products/components/product.vue";
import ProductDetail from "@/pages/Products/components/ProductDetail.vue";
import { mapGetters } from "vuex";

import { CHANGE_SELECTED } from "@/store/types";

export default {
  name: "Products",
  components: {
    Product,
    ProductDetail,
  },
  data() {
    return {
      selectedProduct: null,
    };
  },
  computed: {
    ...mapGetters({
      products: "getProducts",
    }),
  },
  methods: {
    showView(id) {
      this.$store.dispatch(CHANGE_SELECTED, id).then(() => {
        this.$refs.pDetail.showView();
      });
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/sass/mixins" as *

.products
  &-list
    width: 90%
    margin: 6rem auto
    +gridTemplate(null, 2, 30px)
    +gridCenter
    position: relative
</style>
