<template>
  <transition name="move">
    <div class="detail" v-show="isShow" v-if="selectedProduct">
      <button @click="hideView" class="detail-goBackBtn">GO BACK</button>
      <div class="detail-wrapper">
        <div class="detail-showcase">
          <img :src="selectedProduct.imageURL" />
        </div>
        <div class="detail-content">
          <h1 class="detail-content-title">{{ selectedProduct.name }}</h1>
          <div class="detail-content-rating">
            <stars :rating="selectedProduct.rating"></stars>
            <span>{{ selectedProduct.numReviews }} reviews</span>
          </div>
          <p class="detail-content-price">
            Price: <span>{{ selectedProduct.price | currency }}</span>
          </p>
          <p class="detail-content-description">
            {{ selectedProduct.description }}
          </p>
        </div>
        <div class="detail-buy">
          <div class="detail-buy-group">
            <span>Price:</span>
            <span>{{ selectedProduct.price | currency }}</span>
          </div>
          <div class="detail-buy-group">
            <span>In stock: </span>
            <span>{{ selectedProduct.countInStock }}</span>
          </div>
          <div class="detail-buy-group">
            <span>Qty</span>
            <input
              class="detail-buy-qty"
              type="number"
              min="0"
              :max="selectedProduct.countInStock"
              v-model="qty"
            />
          </div>
          <button
            :disabled="selectedProduct.countInStock === 0"
            class="detail-buy-btn"
          >
            ADD TO CART
          </button>
        </div>
        <div class="detail-reviews">
          <h1 class="detail-reviews-title">REVIEWS</h1>
          <div class="detail-reviews-content">
            <div
              class="detail-reviews-comments"
              v-if="selectedProduct.numReviews.length > 0"
            ></div>
            <div class="detail-reviews-noComment" v-else>No Reviews</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Stars from "../../../components/Stars";

export default {
  name: "ProductDetail",
  components: {
    Stars,
  },
  data() {
    return {
      isShow: false,
      qty: 0,
    };
  },
  props: {
    selectedProduct: {
      type: Object,
      default: null,
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
  watch: {
    isShow() {
      this.qty = 0;
    },
  },
};
</script>

<style lang="sass" scoped>
@use "../../../sass/extends" as *
@use "../../../sass/mixins" as *
@use "../../../sass/variables" as *

%flexGroup
    width: 100%
    display: flex
    justify-content: space-between
    padding: 2rem
    border-bottom: 1px solid $gray-2
    font-size: 1.8rem

%detailBtn
    border: none
    outline: none
    cursor: pointer
    padding: 1rem 2rem
    font-weight: bold
    margin: 2rem

.detail
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 99
    background-color: white
    padding: 4rem
    &-wrapper
        +flexCenter
        flex-direction: column
        gap: 4rem
        img
            width: 100%
    &-goBackBtn

        color: $gray-4
        background-color: white
        @extend %detailBtn
    &-showcase
        flex: 1
    &-content
        flex: 0 0 25%
        margin: 0 25%
        &-title
            min-width: max-content
            text-transform: uppercase
            padding-bottom: 3rem
            border-bottom: 1px solid $gray-2
            font-size: 2.4rem
        &-rating
            @extend %flexGroup
        &-price
            @extend %flexGroup
        &-description
            margin-top: 2rem
            font-size: 1.8rem
    &-buy
        flex: 0 0 25%
        align-self: stretch
        margin: 0 35%
        +flexCenter
        flex-direction: column
        align-items: flex-start
        border: 2px solid $gray-2
        border-radius: 10px
        &-group
            @extend %flexGroup
            gap: 5rem
        &-qty
            text-align: center
            background-color: $gray-1
            border: none
            padding: 1rem
            &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
                -webkit-appearance: none

        &-btn
            align-self: stretch
            @extend %detailBtn
            background-color: $gray-4
            color: $gray-1

    &-reviews
        align-self: stretch
        margin: 0 15%
        &-title
            letter-spacing: .1rem
        &-noComment
            text-align: center
            margin-top: 2rem
            background-color: $info-1
            color: $info-3
            padding: 1rem 2rem
            font-size: 2.4rem

.move
    &-enter-active, &-leave-active
        transition: 1s
    &-enter, &-leave-to
        transform: translateX(100%)
</style>
