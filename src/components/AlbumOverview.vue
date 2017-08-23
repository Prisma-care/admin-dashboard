<template>
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div class="asset-preview">
            <img src="../assets/logo.png">
            <el-badge :value="12"></el-badge>
          </div>
          <div class="album-info bottom clearfix">
            <h2>Album name</h2>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="el-icon-edit"></i>Rename</el-dropdown-item>
                <el-dropdown-item><i class="el-icon-delete"></i>Remove</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'album-overview',
  data() {
    return {

    };
  }
};
</script>

<style scoped>
.el-card div.album-info {
  padding: 6px 14px;
}

.asset-preview {
  padding: 0;
  position: relative;
}

img {
  width: 100%;
  display: block;
}

.el-badge {
    position: absolute;
    right: 10px;
    bottom: 0;
}

.bottom {
  margin-top: 6px;
  line-height: 12px;
}

h2 {
  float: left;
}

.el-dropdown {
  margin-top: 14px; /* padding/2 + line-height/2 */
  float: right;
}

.el-dropdown-menu i {
  padding-right: 8px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
