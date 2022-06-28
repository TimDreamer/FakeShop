<template>
  <transition name="detail">
    <div class="product-detail" v-show="isShow">
      <img :src="selectedProduct.imageURL" />
      <button @click="hideView">Go back</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    selectedProduct: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    showView() {
      this.isShow = true;
    },
    hideView() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.product-detail
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 99
    background-color: white

.detail
    &-enter-active, &-leave-active
        transition: 1s
    &-enter, &-leave-to
        transform: translateX(100%)
</style>
