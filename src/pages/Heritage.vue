<template>
  <div class="container" v-loading.body="loading">
    <header>
      <div class="">
        <h1 class="logo" v-if="album">{{ album.title }}</h1>
        <RenameRemoveDropdown @rename="renameAlbum" @remove="removeAlbum" :confirming-removal="confirmingRemoval"></RenameRemoveDropdown>
      </div>
      <el-button class="button" @click="addStory">Add story</el-button>
    </header>
  </div>
</template>

<script>
import * as api from '@/api/';
import RenameRemoveDropdown from '@/components/RenameRemoveDropdown';
import CreateStoryModal from '@/components/Story/CreateStoryModal';

export default {
  components: { RenameRemoveDropdown, CreateStoryModal },
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
      const h = this.$createElement;
      this.$msgbox({
        title: `Create new story to add to "${this.album.title}"`,
        message: h(CreateStoryModal),
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then((action) => {
        console.log(action);
      }).catch(() => {});
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
        this.$router.push('/');
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
h1 {
  padding-right: 10px;
}
</style>
