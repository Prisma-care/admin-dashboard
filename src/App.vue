<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { login } from '@/api/prisma';

export default {
  name: 'app',
  mounted() {
    login('dummy@local.com', 'qwerty')
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
