<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue';
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue';
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue';
import LayoutFixed from "@/views/Layout/components/LayoutFixed.vue";
</script>

<template>
  <LayoutFixed/>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>

<style scoped>

</style>
