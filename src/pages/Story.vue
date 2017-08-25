<template>
  <div class="container" v-loading.body="loading">
    <header>
      <div>
        <router-link :to="{ name: 'album' }">
          <h1 class="logo" v-if="album">{{ album.title }}</h1>
        </router-link>
        <RenameRemoveDropdown @rename="renameAlbum" @remove="removeAlbum" :confirming-removal="confirmingRemoval"></RenameRemoveDropdown>
      </div>
      <el-button class="button" @click="addStory">Add story</el-button>
    </header>
    <div class="story-container">
      <div v-if="ftue" class="ftue">
        <p>
          No have been addded to this album yet. Start by <el-button type="text" @click="addStory">adding a story now</el-button>.
        </p>
      </div>
      <Story v-else-if="album" v-for="(story, index) in album.heritage" :key="story.id" :story="story" class="story" v-on:delete-album="removeStory(index)">
        {{ story.description }}
      </Story>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/';
import Story from '@/components/story/Story';
import RenameRemoveDropdown from '@/components/RenameRemoveDropdown';
import CreateStoryModalContent from '@/components/story/CreateStoryModalContent';

export default {
  components: { Story, RenameRemoveDropdown, CreateStoryModalContent },
  data() {
    return {
      album: null,
      loading: true,
      confirmingRemoval: false,
      description: '',
      file: null,
      ftue: false
    };
  },
  mounted() {
    api.getDefaultAlbum(this.$route.params.id).then((res) => {
      this.album = res.data.response;
      if (!this.album.heritage.length) this.ftue = true;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    removeStory() {
      //
    },
    setDescription(description) {
      this.description = description;
    },
    setFile(file) {
      this.file = file;
    },
    addStory() {
      const h = this.$createElement;
      this.$msgbox({
        title: `Add a new story to "${this.album.title}"`,
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

header a {
  color: inherit!important;
}

.story-container {
  display: flex;
  flex-wrap: wrap;
}

.story {
  flex-grow: 1;
  margin: 10px 0 0 20px;
  /* 3 items per row, - margin - border */
  width: calc(50% - 20px - 2px);
}
</style>
