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
import CreateStoryModalContent from '@/components/Story/CreateStoryModalContent';

export default {
  components: { RenameRemoveDropdown, CreateStoryModalContent },
  data() {
    return {
      album: null,
      loading: true,
      confirmingRemoval: false,
      description: '',
      file: null
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
    setDescription(description) {
      this.description = description;
    },
    setFile(file) {
      this.file = file;
    },
    addStory() {
      const h = this.$createElement;
      this.$msgbox({
        title: `Create new story to add to "${this.album.title}"`,
        message: h(CreateStoryModalContent, {
          on: {
            'description-updated': this.setDescription,
            'file-chosen': this.setFile
          }
        }),
        showCancelButton: true,
        confirmButtonText: 'Add Story',
        cancelButtonText: 'Cancel'
      }).then((action) => {
        if (!action === 'confim') return;
        if (!this.description) this.$message.error('The description field is required');
        const formData = new FormData();
        formData.append('asset', this.file.raw);
        api.addStory(this.album.id, this.description)
          .then((res) => {
            this.album.heritage.push(res.data.response);
            return api.addAssetToStory(this.album.id, res.data.response.id, formData);
          })
          .then((res) => {
            const amountOfHeritage = this.album.heritage.length;
            this.album.heritage[amountOfHeritage - 1].asset_name = res.data.meta.location;
          })
          .catch((err) => {
            console.log(err);
          });
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
