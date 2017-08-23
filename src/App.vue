<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.axios.post('https://prisma-api.dev/v1/user')
      .then((res) => {
        console.log('Response', res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto|Varela+Round');

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-family: 'Varela Round', Helvetica, Arial, sans-serif;
}
</style>
