<template>
  <div class="container">
    <header>
      <div class="">
        <h1 class="logo">Album title</h1>
        <RenameRemoveDropdown @rename="renameAlbum" @remove="removeAlbum" :confirming-removal="confirmingRemoval"></RenameRemoveDropdown>
      </div>
      <el-button class="button" @click="addStory">Add story</el-button>
    </header>
  </div>
</template>

<script>
// import * as api from '@/api/';
import RenameRemoveDropdown from '@/components/RenameRemoveDropdown';

export default {
  components: { RenameRemoveDropdown },
  data() {
    return {
      confirmingRemoval: false
    };
  },
  mounted() {
    console.log(this.$route.params.id);
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
