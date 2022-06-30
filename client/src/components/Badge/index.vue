<template>
  <div class="badge" v-show="point">{{ point }}</div>
</template>

<script>
export default {
  name: "Badge",
  props: {
    point: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="sass" scoped>
@use '@/sass/mixins' as *
@use '@/sass/variables' as *

$size: 2rem

.badge
    position: absolute
    top: - $size / 3
    right: - $size / 3
    background-color: $danger-2
    font-size: calc( $size / 2)
    width: $size
    height: $size
    line-height: $size
    text-align: center
    border-radius: 50%
    color: $gray-1
</style>
