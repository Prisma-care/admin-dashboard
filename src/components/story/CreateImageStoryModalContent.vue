<template lang="html">
  <div>
    <el-upload
      class="asset-upload"
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-change="beforeAssetUpload">
      <img v-if="preview" :src="preview" class="asset">
      <i v-else class="el-icon-plus asset-upload-icon"></i>
    </el-upload>
    <el-input
      type="textarea" @change="setDescription"
      autosize placeholder="Story description" v-model="description">
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      file: null,
      preview: null
    };
  },
  methods: {
    clearContents() {
      this.description = '';
      this.file = '';
      this.preview = null;
    },
    setDescription() {
      if (this.description) { this.$emit('description-updated', this.description); }
    },
    beforeAssetUpload(file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const isImage = allowedTypes.indexOf(file.raw.type) > -1;
      const isMax10MB = file.size / 1024 / 1024 <= 10;

      if (!isImage) this.$message.error('Asset must be of type jpeg, png or gif.');
      if (!isMax10MB) this.$message.error('Avatar picture size can not exceed 2MB!');
      if (isImage && isMax10MB) {
        this.preview = file.url;
        this.$emit('file-chosen', file);
      }
    }
  }
};
</script>

<style scoped>

</style>
