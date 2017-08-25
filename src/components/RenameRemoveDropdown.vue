<template>
  <el-dropdown @command="handleCommand" :hide-on-click="confirmingRemoval">
    <span class="el-dropdown-link">
      <i class="el-icon-caret-bottom el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="rename">
        <i class="el-icon-edit"></i>
        <span>Rename</span>
      </el-dropdown-item>
      <el-dropdown-item :class="{ 'danger': confirmingRemoval }" command="remove">
        <i class="el-icon-delete"></i>
        <span v-if="!confirmingRemoval">Remove</span>
        <span v-else>Sure?</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: ['confirmingRemoval'],
  methods: {
    handleCommand(method, ...args) {
      this[method](args);
    },
    rename() {
      this.$emit('rename');
    },
    remove() {
      this.$emit('remove');
    }
  }
};
</script>

<style scoped>
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
