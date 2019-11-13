<template>
  <div class='login'>
    <!-- 设置中间内容，用element-ui -->
    <el-card class='login-card'>
      <!-- 卡片内容（用插槽） -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:40px">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:280px"></el-input>
          <el-button plain style='float:right'>发送验证码</el-button>
        </el-form-item>
        <!-- 勾选框 -->
        <el-form-item>
          <el-checkbox>我已阅读并同意条款</el-checkbox>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.login{
 background-image: url('../../assets/img/login_bg.jpg');
 height: 100vh;
 background-size: cover;
 display: flex;
 justify-content: center;
  align-items: center;
 .login-card {
   width: 440px;
   height: 360px;
 };
 .title {
   text-align: center;
   img {
     font-size: 45px;
   }
 }
}
</style>
