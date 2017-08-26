<template>
  <div class="container">
    <header>
      <h1 class="logo">Log in</h1>
    </header>
    <div>
      <el-input placeholder="Email" v-model="email"></el-input>
      <el-input placeholder="Password" v-model="password"></el-input>
      <el-button type="primary" @click="login">Log in</el-button>
      <!-- <button @click="login" v-if="!$auth.check()">Login</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
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

<style scoped>
</style>
