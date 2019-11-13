<template>
  <div class='login'>
    <!-- 设置中间内容，用element-ui -->
    <el-card class='login-card'>
      <!-- 卡片内容（用插槽） -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <!-- model属性 要绑定表单数据对象 -->
      <el-form ref="formObj" style="margin-top:40px" :model="loginForm" :rules="loginRules">
          <!-- 手机号  -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入您的手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input placeholder="请输入您的验证码" style="width:280px" v-model="loginForm.code"></el-input>
          <el-button plain style='float:right'>发送验证码</el-button>
        </el-form-item>
        <!-- 勾选框 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读并同意条款</el-checkbox>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 整个表单要校验的数据
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false // 是否勾选协议
      },
      loginRules: {
        // key： 要校验的字段名 ：value（数组 => 多条或者一条或者没有规则）
        mobile: [{ required: true, message: '请输入您的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
        code: [{ required: true, message: '请输入您的验证码' }, { pattern: /^\d{6}$/, message: '请输入正确验证码' }],
        checked: [{ validator: function (rule, value, callback) {
          // rule 代表当前规则
          // value 代表当前的值=> 表单字段checked的值
          // callback 回调函数
          if (value) { // 如果是true 选中通过校验
            callback() // 直接执行 callback表示通过
          } else {
            //  没选中,则输出error值
            callback(new Error('您必须无条件同意此条款'))
          }
        } }]
      }
    }
  },
  methods: {
    login () {
      // this.$refs.formObj 获取el-form 的对象实例
      this.$refs.formObj.validate(function (isOK) {
        if (isOK) {
          // 如果为true 继续下一步，调用接口登录

        }
      })
    }
  }
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
