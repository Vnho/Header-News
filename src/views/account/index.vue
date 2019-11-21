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
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
            :show-file-list="false"
            :http-request="onUploadHead"
            >
            <img
            width="80"
            height="80"
            style="border-radius:50%"
            :src="accountData.photo"><br>
            <i class="el-icon-plus avatar-uploader-icon"></i>
            点击编辑用户头像
        </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="accountData.name"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="accountData.intro"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
          v-model="accountData.mobile"
          :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="accountData.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
          type="primary"
          @click="onEditAccount"
          >保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入定义的传值组件
// 也就是自己定义的新的空 Vue 实例
import eventBus from '@/utils/event-bus'

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
    // 加载个人用户信息
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
    },

    // 编辑个人用户信息
    onEditAccount () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: this.accountData
      }).then(res => {
        this.$message.success('编辑完成')

        // 修改更新信息完成后，通知头部组件
        // 传入修改后的参数
        eventBus.$emit('event-bus', this.accountData)
      }).catch(err => {
        console.log(err)
        this.$message.success('编辑失败')
      })
    },

    // 编辑个人头像信息
    // 这里接收一个参数 config ，也就是文件对象
    onUploadHead (config) {
      console.log(config)
      const formData = new FormData()
      formData.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then(res => {
        this.$message.success('头像修改成功')
        eventBus.$emit('event-bus', this.accountData)
        this.accountData.photo = res.data.data.photo
      }).catch(err => {
        console.log(err)
        this.$message.danger('头像修改失败')
      })
    }
  }
}
</script>

<style>
</style>
