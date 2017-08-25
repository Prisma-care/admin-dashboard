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

h1.logo {
  background-image: url('./assets/logo.png');
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 55px;
  padding-left: 70px;
  display: inline-block;
}

.container {
  width: 60%;
  margin: 0 auto;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  height: 80px;
}

.ftue {
  width: 100%;
  text-align: center;
}

.ftue button {
  font-size: 16px;
}

.button {
  color: #20a0ff;
  border-color: #20a0ff;
  font-weight: bold;
  height: 50%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
