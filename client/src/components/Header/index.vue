<template>
  <div class="header">
    <app-nav></app-nav>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "Header",
  components: {
    appNav: Nav,
  },
};
</script>

<style lang="sass" scoped>
@use "@/sass/variables" as *

.header
  width: 100%
  height: $header-height
  background-color: $gray-2
</style>
