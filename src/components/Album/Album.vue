<template>
  <el-card :body-style="{ padding: '0px' }">
    <router-link :to="{ name: 'heritage', params: { id: album.id } }">
      <div class="asset-preview">
        <img v-if="this.cover" :src="this.cover">
        <div v-if="!this.cover" class="no-image">No image to show</div>
        <el-badge :value="heritageAmount"></el-badge>
      </div>
    </router-link>
    <div class="album-info bottom clearfix">
      <router-link :to="{ name: 'heritage', params: { id: album.id } }">
        <h2><slot></slot></h2>
      </router-link>
      <el-dropdown @command="handleCommand" :hide-on-click="confirmingRemoval">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="renameAlbum">
            <i class="el-icon-edit"></i>
            <span>Rename</span>
          </el-dropdown-item>
          <el-dropdown-item :class="{ 'danger': confirmingRemoval }" command="removeAlbum">
            <i class="el-icon-delete"></i>
            <span v-if="!confirmingRemoval">Remove</span>
            <span v-else>Sure?</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-card>
</template>

<script>
import * as api from '@/api/';
import arrayBufferToDataUrl from '@/helpers/image';

export default {
  name: 'album-card',
  props: ['album'],
  data() {
    return {
      cover: null,
      confirmingRemoval: false,
      heritageAmount: 0
    };
  },
  mounted() {
    if (!this.album.heritage[0]) return;
    const coverSource = this.album.heritage[0].asset_name;
    if (!coverSource) return;
    api.getProtectedImage(coverSource).then((response) => {
      const type = response.headers['content-type'];
      this.cover = arrayBufferToDataUrl(response.data, type);
    }).catch((err) => {
      console.log(err);
    });
    this.heritageAmount = this.album.heritage.length;
  },
  methods: {
    handleCommand(method, ...args) {
      this[method](args);
    },
    renameAlbum() {
      this.$prompt('Name', `Rename album "${this.album.title}"`, {
        confirmButtonText: 'Rename',
        cancelButtonText: 'Cancel',
      }).then((confirmed) => {
        const albumTitle = confirmed.value;
        api.renameDefaultAlbum(this.album.id, albumTitle).then(() => {
          this.album.title = albumTitle;
          this.$message({
            showClose: true,
            message: 'Album renamed successfully',
            type: 'success'
          });
        }).catch((err) => {
          console.log(err);
        });
      }).catch(() => {});
    },
    removeAlbum() {
      if (!this.confirmingRemoval) {
        this.confirmingRemoval = true;
        return;
      }
      api.deleteDefaultAlbum(this.album.id).then(() => {
        this.$emit('delete-album', this.album);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
.album div.album-info {
  padding: 6px 14px;
  display: block;
}

.asset-preview {
  padding: 0;
  position: relative;
  height: 180px;
}

.asset-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

.album a {
  text-decoration: none;
  color: inherit;
}

img {
  width: 100%;
  display: block;
}

.el-badge {
  position: absolute;
  right: 10px;
  bottom: 0;
}

.bottom {
  margin-top: 6px;
  line-height: 12px;
}

h2 {
  font-size: 1.1rem;
  float: left;
}

.el-dropdown {
  margin-top: 14px; /* padding/2 + line-height/2 */
  float: right;
}

.el-dropdown-menu i {
  color: #20a0ff;
  padding-right: 8px;
}

.el-dropdown-menu .danger i, .danger {
  color: #ff4949;
}

.el-dropdown-menu span {
  display: inline-block;
  padding-right: 10px;
}
</style>
