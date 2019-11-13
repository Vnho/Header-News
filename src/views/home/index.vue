<template>
<!-- 布局 -->
  <el-container>
    <!-- 左右布局 -->
    <el-aside>1</el-aside>
    <!-- 大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>2</el-header>
      <!-- 主体 -->
      <el-main>2
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {

}
</script>

<style lang="less">

</style>
