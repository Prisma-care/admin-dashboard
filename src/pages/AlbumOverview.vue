<template>
    <el-row>
      <el-col :span="8">
        <Album v-for="album in albums" :key="album.id" :album="album">
          {{ album.title }}
        </Album>
      </el-col>
    </el-row>
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
  }
};
</script>

<style scoped>

</style>
