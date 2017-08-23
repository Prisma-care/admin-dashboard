<template>
  <div id="app" v-if="$auth.ready()">
    <button @click="login" v-if="!$auth.check()">Login</button>
    <button @click="$auth.logout()" v-if="$auth.check()">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      email: 'dummy@local.com',
      password: 'qwerty'
    };
  },
  methods: {
    login() {
      this.$auth.login({
        data: { email: this.email, password: this.password },
        rememberMe: true,
        error: (res) => {
          console.log(res.data);
        },
      });
    }
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
