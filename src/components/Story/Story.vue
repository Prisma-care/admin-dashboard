<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="asset-preview">
      <img v-if="this.cover" :src="this.cover">
      <div v-if="!this.cover" class="no-image">No image to show</div>
    </div>
    <div class="story-info bottom clearfix">
      <el-input type="textarea"autosize placeholder="Story description" v-model="description">
      </el-input>
      <div class="actions" v-if="description !== lastDescription">
        <el-button @click="cancelEdits">Cancel</el-button>
        <el-button @click="updateDescription" type="primary">Save</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import * as api from '@/api/';
import arrayBufferToDataUrl from '@/helpers/image';

export default {
  props: ['story', 'albumId'],
  data() {
    return {
      cover: null,
      lastDescription: '',
      description: ''
    };
  },
  mounted() {
    this.lastDescription = this.story.description;
    this.description = this.story.description;
    const coverSource = this.story.asset_name;
    if (!coverSource) return;
    api.getProtectedImage(coverSource).then((response) => {
      const type = response.headers['content-type'];
      this.cover = arrayBufferToDataUrl(response.data, type);
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    cancelEdits() {
      this.description = this.lastDescription;
    },
    updateDescription() {
      api.updateStoryDescription(this.albumId, this.story.id, this.description)
         .then(() => {
           this.lastDescription = this.description;
           this.$message.success('The story description was updated successfully.');
         }).catch((err) => {
           console.log(err);
         });
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 1.1rem;
  float: left;
}

.story {
  margin-bottom: 20px;
}

.story div.story-info {
  padding: 6px 14px;
  display: block;
}

.asset-preview {
  padding: 0;
  position: relative;
  height: 300px;
}

.asset-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.story a {
  text-decoration: none;
  color: inherit;
}

img {
  width: 100%;
  display: block;
}

button {
  margin-top: 10px;
}

div.actions {
  float: right;
}

.el-button + .el-button {
  margin-left: 5px;
}

.bottom {
  margin-top: 6px;
  line-height: 12px;
}
</style>
