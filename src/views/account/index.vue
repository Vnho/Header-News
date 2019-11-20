<template>
  <div class="account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>

      <!-- 用户信息表单 -->
      <el-form ref="form" :model="accountData" label-width="80px">
        <el-form-item label="用户头像">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            >
            <img
            width="80"
            height="80"
            style="border-radius:50%"
            :src="accountData.photo">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="accountData.name"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="accountData.intro"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="accountData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="accountData.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      accountData: {
        name: '',
        email: '',
        mobile: '',
        intro: '',
        photo: ''
      }
    }
  },
  created () {
    this.loadAccount()
  },
  methods: {
    loadAccount () {
      this.$axios({
        methods: 'GET',
        url: '/user/profile'
      }).then(res => {
        console.log('接收用户信息成功', res)
        this.accountData = res.data.data
      }).catch(err => {
        console.log('接收用户信息失败', err)
      })
    }
  }
}
</script>

<style>
</style>
