<template>
  <div class="container">
    <header>
      <h1 class="logo">Log in</h1>
    </header>
    <form>
      <el-input placeholder="Email" v-model="email"></el-input>
      <el-input type="password" placeholder="Password" v-model="password"></el-input>
      <el-button type="primary" @click="login">Log in</el-button>
      <!-- <button @click="login" v-if="!$auth.check()">Login</button> -->
    </form>
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
        error: () => {
          this.$message.error('Your credentials are invalid');
        },
      });
    }
  }
};
</script>

<style scoped>
header {
  margin-left: 0;
}

.container {
  width: 30%;
}

.el-input {
  margin-bottom: 10px;
}

form {
}
</style>
