<template>
  <div class="material">
    <el-card class="box-card">
      <div
      slot="header"
      class="clearfix upload">
        <span>素材管理</span>

        <!-- 自己手动上传标签 -->
        <el-button
        type="success"
        @click="onSelfUpload"
        >自己手动上传的标签</el-button>
        <input
        type="file"
        hidden
        ref="file"
        @change="onSelfChange"
        >
        <!--
          action 上传文件的请求地址
          上传组件能帮我们自动发送请求，我们只需要把接口相关参数配置给它们
          上传组件内部会自己去发送请求提交文件，它内部使用不是我们项目中的axios
          所以也不会有拦截器和基础路径
           -->
        <el-upload
        class="upload-demo"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUpload"
        :show-file-list="false"
        >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      </div>

      <!-- 选择框选择状态（全部或收藏） -->
      <div>
        <el-radio-group
        v-model="status"
        @change="onFind"
        >
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="collect">收藏</el-radio-button>
        </el-radio-group>
      </div>

      <!--分栏偏移式 LayOut布局
         el-row 行
         el-col 列
      -->
      <el-row :gutter="20">
        <el-col
        :xs="24"
        :sm="12"
        :md="4"
        v-for="item in images"
        :key="item.id"
        class="col-style"
        >
          <el-card
          :body-style="{ padding: '0px' }"
          style="text-align:center"
          >
            <img
              :src="item.url"
              class="image"
              height='150'
            />
            <div
            style="padding: 14px;" class="operation">
            <!-- 收藏图片 -->
              <!-- class 的对象语法 -->
              <i
              :class="{
                'el-icon-star-on':item.is_collected,
                'el-icon-star-off':!item.is_collected
              }"
              @click="onCollect(item)"
              ></i>
              <!-- class 的普通判断语法 -->
              <!-- <i :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"></i> -->

            <!-- 删除图片 -->
              <i
              class="el-icon-delete-solid"
              @click="onDelete(item)"
              ></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
      @current-change="changePage"
      background
      layout="prev, pager, next"
      :total="total_count">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'MaterialConnect',
  data () {
    return {
      images: [],
      status: this.collect,
      page: 1,
      total_count: 0,
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  created () {
    this.loadMaterial()
  },
  methods: {
    // 加载素材列表
    loadMaterial (isFind, page) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isFind,
          page,
          per_page: 20
        }
      }).then(res => {
        // console.log('获取素材成功', res)
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      }).catch(err => {
        console.log('获取素材失败', err)
      })
    },

    // 查看列表状态数据
    onFind (value) {
      // value 是 radio 标签自带参数，可以获得label中的值
      this.loadMaterial(value !== 'all')
    },

    // 换页时的操作
    changePage (page) {
      this.loadMaterial(page)
      this.page = page
    },

    // 收藏图片
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message.success('操作成功')
        item.is_collected = !item.is_collected
      }).catch(err => {
        console.log('收藏失败', err)
        this.$message.danger('收藏失败o(╥﹏╥)o')
      })
    },

    // 删除图片
    onDelete (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.loadMaterial(this.status === 'all')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(err => {
          console.log(err)
          this.$message.danger('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 上传图片素材
    onUpload () {
      this.loadMaterial()
    },

    // 自己手动上传素材
    onSelfUpload () {
      this.$refs.file.click()
    },

    onSelfChange () {
      // 这项是为了获取到上传文件时，上传的第一个文件
      const fileObj = this.$refs.file.files[0]

      // 建立一个新的 FormData 实例对象
      const formData = new FormData()

      // 将新的文件添加到这个接口所需要的请求参数的实例对象中
      formData.append('image', fileObj)

      // 用 $axios 发送数据
      this.$axios({
        method: 'POST',
        url: '/user/images',

        // 这里axios会自动转换提交数据的类型
        data: formData
      }).then(res => {
        this.$message.success('上传成功')
        this.loadMaterial(this.status === 'all')
      }).catch(err => {
        console.log(err)
        this.$message.success('上传失败')
      })
    }
  }
}
</script>

<style lang='less'>
.upload{
  display: flex;
  justify-content: space-between
}
.col-style{
  margin-bottom: 20px;
  .operation{
    display: flex;
    justify-content: space-around;
    font-size: 24px;
  }
}
</style>
