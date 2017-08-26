<template>
  <div id="app" v-if="$auth.ready()">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
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
