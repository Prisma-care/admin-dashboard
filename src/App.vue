<template>
  <div id="app">
    <button @click="login">Login</button>
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
        success: (res) => {
          this.$auth.token(null, res.data.response.token);
          this.$auth.user({ id: res.data.response.id, email: this.email });
        },
        error: () => {},
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
