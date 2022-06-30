<template>
  <div class="nothing">
    <div class="div">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NothingPage",
};
</script>

<style lang="sass" scoped>
.nothing
  padding: 10rem 5rem
  min-height: max-content
  display: flex
  flex-direction: column
  align-items: center
  gap: 5rem
</style>
