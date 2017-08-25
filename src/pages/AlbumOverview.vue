<template>
  <div class="container">
    <Album v-for="(album, index) in albums" :key="album.id" :album="album" class="album" v-on:delete-album="removeAlbum(index)">
      {{ album.title }}
    </Album>
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
      albums: []
    };
  },
  mounted() {
    api.getDefaultAlbums().then((res) => {
      this.albums = res.data.response;
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
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
  display: flex;
  font-size: 0;
  flex-wrap: wrap;
}

.album {
  flex-grow: 1;
  margin: 10px 0 0 20px;
  /* 3 items per row, - margin - border */
  width: calc(100% * (1/3) - 20px - 2px);
}
</style>
