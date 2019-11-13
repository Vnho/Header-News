<template>
<!-- 布局 -->
  <el-container>
    <!-- 左右布局 -->
    <el-aside class="left" style="width:220px">
      <div class="menu-title" style="background-color:#2e2f32">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 左侧菜单 -->
      <el-menu style="width:221px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
        <!-- 一级菜单 -->
        <el-menu-item>首页</el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu>
          <template slot="title">内容插槽</template>
          <el-menu-item index="1-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论列表</el-menu-item>
          <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-submenu>
        <!-- 二级菜单 -->
        <el-submenu>
          <template slot="title">粉丝管理</template>
          <el-menu-item index="2-1">图文数据</el-menu-item>
          <el-menu-item index="2-2">粉丝概况</el-menu-item>
          <el-menu-item index="2-3">粉丝画像</el-menu-item>
          <el-menu-item index="2-4">粉丝自述</el-menu-item>
        </el-submenu>
        <!-- 一级菜单 -->
        <el-menu-item>账户信息</el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layoutHeader></layoutHeader>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import layoutHeader from '../../components/layout-header'
export default {
  components: {
    layoutHeader
  }
}
</script>

<style lang="less" scoped>
.left{
  width: 220px;
  height: 100vh;
  background-color: #353b4e;
  overflow: hidden;
  .menu-title{
    padding: 15px 0;
    text-align: center;
    img{
      height: 30px;
    }
  }
}

</style>
