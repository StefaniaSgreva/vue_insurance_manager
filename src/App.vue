<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/layout/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <RouterView />
</template>

<style scoped>

</style>
