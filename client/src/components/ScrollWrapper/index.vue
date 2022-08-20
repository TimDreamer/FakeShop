<template>
  <div
    class="scrollWrapper"
    :class="[direction]"
    ref="wrapper"
    @mousedown="handleMouseDown"
  >
    <slot></slot>
  </div>
</template>

<script>
const MOVE_THRESHOLD = 10;

export const SCROLL_DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
};

export default {
  name: "ScrollWrapper",
  data() {
    return {
      el: null,
      clickPosition: null,
    };
  },
  props: {
    direction: {
      type: String,
      default: SCROLL_DIRECTION.VERTICAL,
    },
  },
  methods: {
    isScrollable() {
      this.el = this.$refs.wrapper.children[0];
      if (!this.el) return false;
      switch (this.direction) {
        case SCROLL_DIRECTION.VERTICAL:
          return this.el.scrollHeight > this.el.clientHeight;
        case SCROLL_DIRECTION.HORIZONTAL:
          return this.el.scrollWidth > this.el.clientWidth;
        default:
          throw new Error("Undefined direction.");
      }
    },
    handleMouseDown(e) {
      if (!this.isScrollable()) return;
      switch (this.direction) {
        case SCROLL_DIRECTION.VERTICAL:
          this.clickPosition = e.clientY;
          break;
        case SCROLL_DIRECTION.HORIZONTAL:
          this.clickPosition = e.ClientX;
          break;
      }
      this.register(e.target);
    },
    _handleMouseMove(e) {
      let diff;
      if (this.direction === SCROLL_DIRECTION.VERTICAL) {
        diff = Math.ceil(this.clickPosition - e.clientY);
        if (!this.overThreshold(diff)) return;
        this.clickPosition = e.clientY;
        this.el.scrollTop += diff;
      } else {
        diff = Math.ceil(this.clickPosition - e.ClientX);
        if (!this.overThreshold(diff)) return;
        this.clickPosition = e.clientX;
        this.el.scrollLeft += diff;
      }
    },
    _handleMouseUp(e) {
      this.tearDown(e.target);
    },
    register() {
      this.el.addEventListener("mousemove", this._handleMouseMove);
      this.el.addEventListener("mouseup", this._handleMouseUp);
    },
    tearDown() {
      this.el.removeEventListener("mousemove", this._handleMouseMove);
      this.el.removeEventListener("mouseup", this._handleMouseUp);
    },
    overThreshold(diff) {
      return Math.abs(diff) >= MOVE_THRESHOLD;
    },
  },
};
</script>

<style lang="sass" scoped>
.scrollWrapper
  user-select: none
  > :first-child
    scrollbar-width: none
    --ms-overflow-style: none
    overflow-wrap: normal
    &::-webkit-scrollbar
      width: 0
      display: none
  &.vertical
    > :first-child
      overflow-x: hidden
      overflow-y: scroll
  &.horizontal
    > :first-child
      overflow-x: auto
      overflow-y: scroll
</style>
