<template>
  <div class="container">
    <header>
      <h1 class="logo">Default albums</h1>
      <el-button class="add-album" @click="addAlbum">Add album</el-button>
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
import Album from '@/components/Album/Album';

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
    api.getDefaultAlbums().then(() => {
      this.albums = [];
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
      console.log('adding');
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  height: 80px;
}

.album-container {
  display: flex;
  flex-wrap: wrap;
}

.ftue {
  width: 100%;
  text-align: center;
}

.ftue button {
  font-size: 16px;
}

.add-album {
  color: #20a0ff;
  border-color: #20a0ff;
  font-weight: bold;
  height: 50%;
}

.album {
  flex-grow: 1;
  margin: 10px 0 0 20px;
  /* 3 items per row, - margin - border */
  width: calc(100% * (1/3) - 20px - 2px);
}
</style>
