<template>
  <div class="cart">
    <div class="cart-content">
      <div class="cart-content-imgWrapper">
        <img :src="product.imageURL" />
      </div>
      <p class="cart-content-name">{{ product.name }}</p>
      <p class="cart-content-price">{{ product.price | currency }}</p>
    </div>
    <div class="cart-control">
      <input
        type="number"
        class="cart-qty"
        min="0"
        :max="product.qty"
        :value="product.qty"
        @change="debounceChange($event)"
      />
      <div class="cart-control-svgWrapper" @click="clearAll">
        <trash-svg class="cart-control-clear"></trash-svg>
      </div>
    </div>
  </div>
</template>

<script>
import { CHANGE_QTY, CLEAR_ALL } from "@/store/types";
import { debounce } from "@/utils";
import TrashSvg from "@/components/Icons/TrashSvg.vue";

export default {
  components: { TrashSvg },
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
    },
    clearAll() {
      this.$store.dispatch(CLEAR_ALL, { id: this.product.id });
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/sass/extends" as *
@use "@/sass/mixins" as *
@use "@/sass/variables" as *

$fontSize: 1.4rem

.cart
  margin: 2rem 10%
  +flexCenter
  padding: 2rem 0
  border-top: 2px solid $gray-2
  &:first-child
    border-top: none

  &-content
    flex: 1
    +flexCenter
    &-imgWrapper
      flex: 0 0 25%
      img
        width: 100%
    &-name
      flex: 1
      text-align: center
      font-size: $fontSize
    &-price
      flex: 0 0 25
      text-align: center
      font-size: $fontSize * 1.5
  &-control
    flex: 0 0 35%
    text-align: center
    +flexCenter
    gap: 4rem
    &-clear
      cursor: pointer
      transition: .3s
      &:hover
        fill: $danger-2
  &-qty
    @extend %qty
</style>
