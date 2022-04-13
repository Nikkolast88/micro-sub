<template>
  <div class="exception">
    <div class="exception-404">404 Not Found</div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.exception {
  text-align: center;

  &-404 {
    display: inline-block;
    width: 800px;
    height: 800px;
    background-image: url('~@/assets/404.svg');
  }
}
</style>
