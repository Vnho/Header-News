<template>
  <!-- 显示在一行 -->
  <el-row class="total" type="flex" justify="space-between" style="padding:20px 0">
    <!-- 左侧 -->
    <el-col class="left" :span="7">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col class="right" :span="3">
      <!-- 头像 -->
      <img src="../assets/img/avatar.jpg" alt />
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Vnho
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
  }
}
// .left {
//   display: flex;
//   align-items: center;
//   i {
//     font-size: 24px;
//   }
//   span {
//     margin-left: 4px;
//   }
// }
// .right {
//   display: flex;
//   align-items: center;
//   img {
//     border-radius: 50%;
//   }
// }
</style>
