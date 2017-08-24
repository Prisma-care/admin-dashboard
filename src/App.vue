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

body {
  font-family: 'Roboto', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  margin-top: 60px;
}

h1, h2, .el-message-box__title {
  font-family: 'Varela Round', Helvetica, Arial, sans-serif;
}
</style>
