<template>
  <header>
      <h3>GRC STAGE BANNER</h3>
  </header>
  <main>
    <StagesGrid />
  </main>
</template>

<script>
  import StagesGrid from './components/StagesGrid.vue';

  export default {
    name: 'App',
    components: {
        StagesGrid
    }
  }
</script>

<style scoped>

</style>
