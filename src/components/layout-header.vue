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
      <img
      :src="user.photo"
      height="50"
      width="50"
      />
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item @click.native="userOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: null,
        photo: null
      }
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    // 用户退出登录
    userOut () {
      this.$confirm('您将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.localStorage.removeItem('user-token')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },

    // 加载用户信息
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // 查看获取到的数据
        console.log(res)
        this.user = res.data.data
      })
    }
  }
}
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
</style>
