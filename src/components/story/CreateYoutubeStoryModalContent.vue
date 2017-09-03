<template lang="html">
  <form>
    <el-input
      type="textarea" @change="setDescription"
      autosize placeholder="Story description" v-model="description">
    </el-input>
    <el-input @change="setUrl" placeholder="Youtube URL" v-model="url"></el-input>
  </form>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      url: ''
    };
  },
  methods: {
    setDescription() {
      if (this.description) { this.$emit('description-updated', this.description); }
    },
    setUrl() {
      if (this.url) { this.$emit('url-updated', this.url); }
    },
  }
};
</script>

<style scoped>
form div {
  margin-bottom: 10px;
}

form div:last-of-type {
  margin-bottom: 0;
}
</style>
