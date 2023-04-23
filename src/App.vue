<script setup lang="ts">
  import PasswordGenerator from '@/components/PasswordGenerator.vue'
</script>

<template>
  <div class="main">
    <h3 class="title">Password Generator</h3>
    <PasswordGenerator />
  </div>
</template>

<style lang="scss">
  .main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .title {
    font-size: 1.5rem;
    color: $grey-100;
    text-align: center;
  }
</style>
