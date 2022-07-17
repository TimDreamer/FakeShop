<template>
  <scroll-wrapper direction="vertical">
    <transition name="move">
      <div class="detail" v-show="isShow" v-if="selectedProduct">
        <div class="detail-btnGroup">
          <button @click="hideView" class="detail-goBackBtn">GO BACK</button>
          <button
            @click="$router.push({ name: 'ShoppingCart' })"
            class="detail-goCart"
          >
            GO SHOPPING CART
          </button>
        </div>
        <div class="detail-wrapper">
          <div class="detail-showcase">
            <img :src="selectedProduct.imageURL" />
          </div>
          <div class="detail-content">
            <h1 class="detail-content-title">{{ selectedProduct.name }}</h1>
            <div class="detail-content-rating">
              <stars :rating="selectedProduct.rating" :scale="1.6"></stars>
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
                v-model.number="qty"
              />
            </div>
            <button
              :disabled="selectedProduct.countInStock === 0"
              class="detail-buy-btn"
              @click="addProductsToCart"
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
  </scroll-wrapper>
</template>

<script>
import Stars from "@/components/Stars";
import { mapGetters } from "vuex";
import { ADD_PRODUCTS_TO_CART } from "@/store/types";

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
  computed: {
    ...mapGetters({
      selectedProduct: "getSelectedProduct",
    }),
  },
  methods: {
    showView() {
      this.isShow = true;
    },
    hideView() {
      this.isShow = false;
    },
    addProductsToCart() {
      this.$store
        .dispatch(ADD_PRODUCTS_TO_CART, {
          qty: this.qty,
          id: this.selectedProduct.id,
        })
        .then(() => {
          this.qty = 0;
        });
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
@use "@/sass/extends" as *
@use "@/sass/mixins" as *
@use "@/sass/variables" as *

%flexGroup
  width: 100%
  display: flex
  justify-content: space-between
  padding: 2rem
  border-bottom: 1px solid $gray-2
  font-size: 1.8rem

%btnHover
  transition: .5s
  &:hover
    color: $cta-2
    transform: scale(1.1)

.detail
  width: 100%
  height: 100%
  position: fixed
  left: 0
  top: 0
  z-index: 99
  background-color: white
  padding: 3rem 4rem
  &-btnGroup
    display: flex
    justify-content: space-between
    margin-bottom: 2rem
  &-goBackBtn
    color: $gray-4
    background-color: white
    @extend %detailBtn
    @extend %btnHover
  &-goCart
    color: $gray-4
    background-color: white
    @extend %detailBtn
    @extend %btnHover

  &-wrapper
    +flexCenter
    flex-direction: column
    gap: 4rem
    img
      width: 100%
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
      text-align: center
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
      @extend %qty

    &-btn
      align-self: stretch
      @extend %detailBtn
      background-color: $gray-4
      color: $gray-1
      @extend %disabled-btn

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
