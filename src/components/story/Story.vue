<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="asset-preview">
      <img v-if="cover" :src="cover">
      <iframe class="video" v-if="videoUrl" :src="videoUrl"></iframe>
      <div v-if="!cover && !videoUrl" class="no-image">No image to show</div>
    </div>
    <div class="story-info bottom clearfix">
      <el-dropdown @command="handleCommand" :hide-on-click="confirmingRemoval">
        <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="replaceImage">
            <i class="el-icon-picture"></i>
            <span>Replace image</span>
          </el-dropdown-item>
          <el-dropdown-item :class="{ 'danger': confirmingRemoval }" command="removeStory">
            <i class="el-icon-delete"></i>
            <span v-if="!confirmingRemoval">Remove</span>
            <span v-else>Sure?</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input type="textarea" autosize placeholder="Story description" v-model="description">
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
import AssetUploadModal from './AssetUploadModal';

export default {
  props: ['story', 'albumId'],
  data() {
    return {
      cover: null,
      lastDescription: '',
      description: '',
      fileToUpload: null,
      confirmingRemoval: false,
      videoUrl: null
    };
  },
  mounted() {
    this.lastDescription = this.story.description;
    this.description = this.story.description;
    if (this.story.asset_type === 'youtube') {
      const url = this.story.asset_name.replace('watch?v=', 'embed/');
      this.videoUrl = url;
      this.$emit('loading-stopped');
      return;
    }
    const coverSource = this.story.asset_name;
    if (!coverSource) {
      this.$emit('loading-stopped');
      return;
    }
    api.getProtectedImage(coverSource).then((response) => {
      const type = response.headers['content-type'];
      this.cover = arrayBufferToDataUrl(response.data, type);
      this.$emit('loading-stopped');
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    handleCommand(method, ...args) {
      this[method](args);
    },
    setFile(file) {
      this.fileToUpload = file;
    },
    replaceImage() {
      const msgboxOptions = {
        title: 'Replace image',
        message: this.$createElement(AssetUploadModal, {
          on: { 'file-chosen': this.setFile }
        }),
        showCancelButton: true,
        confirmButtonText: 'Replace'
      };
      this.$msgbox(msgboxOptions).then((action) => {
        if (!action === 'confirm') return;
        if (!this.fileToUpload) this.$message.error('Please choose an image to upload');
        const formData = new FormData();
        formData.append('asset', this.fileToUpload.raw);
        api.addImageAssetToStory(this.albumId, this.story.id, formData)
          .then((res) => {
            this.$message.success('Image replaced successfully');
            return api.getProtectedImage(res.data.meta.location);
          })
          .then((response) => {
            const type = response.headers['content-type'];
            this.cover = arrayBufferToDataUrl(response.data, type);
          })
          .catch((err) => {
            console.log(err);
          });
      }).catch(() => {});
    },
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
    },
    removeStory() {
      if (!this.confirmingRemoval) {
        this.confirmingRemoval = true;
        return;
      }
      api.deleteStory(this.albumId, this.story.id).then(() => {
        this.$emit('story-deleted', this.story);
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

iframe {
  border: 0;
  height: 100%;
  display: block;
}

button {
  margin-top: 10px;
}

div.actions {
  float: right;
}

.bottom {
  margin-top: 6px;
  line-height: 12px;
  position: relative;
}

.el-dropdown {
  background: #fff;
  position: absolute;
  padding: 7px;
  border-radius: 5px 5px 0 0;
  top: -30px;
  right: 0;
}

.el-dropdown-menu i {
  color: #20a0ff;
  padding-right: 10px;
}

.el-button + .el-button {
  margin-left: 5px;
}
</style>
