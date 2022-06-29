<template>
  <div class="cart">
    <div class="cart-item">
      <img :src="product.imageURL" class="cart-img" />
      <p class="cart-name">{{ product.name }}</p>
      <p class="cart-price">{{ product.price | currency }}</p>
      <input
        type="number"
        class="cart-qty"
        min="0"
        :max="product.qty"
        :value="product.qty"
        @change="debounceChange($event)"
      />
    </div>
  </div>
</template>

<script>
import { CHANGE_QTY } from "@/store/types";
import { debounce } from "@/utils";

export default {
  name: "CartItem",
  data() {
    return {
      debounceChange: debounce(this.change),
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    change(e) {
      this.$store.dispatch(CHANGE_QTY, {
        id: this.product.id,
        newQty: +e.target.value,
      });
      console.log("change");
    },
  },
};
</script>

<style lang="sass" scoped>
@use "../../../sass/extends" as *

.cart
  &-qty
    @extend %qty
</style>
