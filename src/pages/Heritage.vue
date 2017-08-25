<template>
  <div class="container" v-loading.body="loading">
    <header>
      <div class="">
        <h1 class="logo" v-if="!loading">{{ album.title }}</h1>
        <RenameRemoveDropdown @rename="renameAlbum" @remove="removeAlbum" :confirming-removal="confirmingRemoval"></RenameRemoveDropdown>
      </div>
      <el-button class="button" @click="addStory">Add story</el-button>
    </header>
  </div>
</template>

<script>
import * as api from '@/api/';
import RenameRemoveDropdown from '@/components/RenameRemoveDropdown';

export default {
  components: { RenameRemoveDropdown },
  data() {
    return {
      album: null,
      loading: true,
      confirmingRemoval: false
    };
  },
  mounted() {
    api.getDefaultAlbum(this.$route.params.id).then((res) => {
      this.album = res.data.response;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    addStory() {
      // add a story
    },
    renameAlbum() {
      //
    },
    removeAlbum() {
      //
    }
  }
};
</script>

<style scoped>
h1 {
  padding-right: 10px;
}
</style>
