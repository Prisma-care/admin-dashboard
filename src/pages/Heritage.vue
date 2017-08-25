<template>
  <div class="container">
    <header>
      <h1 class="logo">Album title</h1>
      <el-button class="button" @click="addAlbum">Add story</el-button>
    </header>
  </div>
</template>

<script>
// import * as api from '@/api/';

export default {
  mounted() {
    console.log(this.$route.params.id);
  }
};
</script>

<style scoped>
</style>
