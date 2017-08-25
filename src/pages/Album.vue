<template>
  <div class="container">
    <header>
      <h1 class="logo">Default albums</h1>
      <el-button class="button" @click="addAlbum">Add album</el-button>
    </header>
    <div class="album-container">
      <div v-if="ftue" class="ftue">
        <p>
          No default albums have been created yet. Start by <el-button type="text" @click="addAlbum">adding one now</el-button>.
        </p>
      </div>
      <Album v-else v-for="(album, index) in albums" :key="album.id" :album="album" class="album" v-on:delete-album="removeAlbum(index)">
        {{ album.title }}
      </Album>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/';
import Album from '@/components/album/Album';

export default {
  name: 'album-overview',
  components: { Album },
  data() {
    return {
      albums: [],
      ftue: false
    };
  },
  mounted() {
    api.getDefaultAlbums().then((res) => {
      this.albums = res.data.response;
      if (!this.albums.length) this.ftue = true;
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    removeAlbum(index) {
      this.$message({
        showClose: true,
        message: `Album "${this.albums[index].title}" deleted`,
        type: 'success'
      });
      this.albums.splice(index, 1);
    },
    addAlbum() {
      this.$prompt('Name', 'Add new default album', {
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
      }).then((confirmed) => {
        const title = confirmed.value;
        api.addDefaultAlbum(title).then((res) => {
          this.albums.push(res.data.response);
        }).catch((err) => {
          console.log(err);
        });
      }).catch(() => {});
    }
  }
};
</script>

<style scoped>
.album-container {
  display: flex;
  flex-wrap: wrap;
}

.album {
  flex-grow: 1;
  margin: 10px 0 0 20px;
  /* 3 items per row, - margin - border */
  width: calc(100% * (1/3) - 20px - 2px);
}
</style>
