<template>
  <div class="upload-image">
    <div class="preview" @click="onVisible">
      <img
      v-if="value"
      :src="value"
      class="avatar">
      <i
      v-else
      class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!--
      visible 控制对话框的显示和隐藏
     -->
    <el-dialog
      title="请选择文章封面图片"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <el-radio-group
          v-model="activeImages"
          @change="loadMaterial"
          >
            <el-radio label="all">全部</el-radio>
            <el-radio label="collect">收藏</el-radio>
          </el-radio-group>
          <el-row :gutter="20">
            <el-col
            :span="6" v-for="(item,index) in images"
            :key="item.id"
            :class="{
              'img-border':index===activeIndex
            }"
            @click.native="activeIndex=index"
            >
              <img
              height="100"
              width="100"
              :src="item.url">
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 自定义上传页面 -->
        <el-tab-pane label="用户上传" name="second">
          <el-upload
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            list-type="picture-card"
            :headers="uploadHeaders"
            :on-preview="onPreview"
            name="image"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-tab-pane>
    </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfrim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  components: {},
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      centerDialogVisible: false, // 对话框的显示与隐藏
      activeName: 'first', // 激活的标签页
      activeImages: 'all', // 图片的状态选择
      images: [],
      activeIndex: null, // 激活图片的索引
      previewImages: '',
      uploadHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
      }
    }
  },
  computed: {},
  watch: {
  },
  created () {},
  methods: {
    onVisible () {
      this.centerDialogVisible = true
      this.loadMaterial()
    },
    // 加载素材列表
    loadMaterial () {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: this.activeImages === 'collect'
        }
      }).then(res => {
        // console.log('获取素材成功', res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log('获取素材失败', err)
      })
    },

    // 选择自定义图片的时候传入一个参数来获取点击的对象内容
    onPreview (flie) {
      console.log(flie)
      this.previewImages = flie.response.data.url
      // this.$emit('input', this.previewImages)
    },
    // 上传文章封面框
    onConfrim () {
      // console.log(this.previewImages)
      if (this.activeName === 'first') {
        const image = this.images[this.activeIndex]
        if (image) {
          // 将所选图片的路径同步给父组件绑定的数据
          this.$emit('input', image.url)
        }
      } else if (this.activeName === 'second') {
        const preImages = this.previewImages
        if (preImages) {
          // console.log(preImages)
          this.$emit('input', preImages)
        }
      }
      this.centerDialogVisible = false
    }
  }
}
</script>

<style scoped>
.upload-image {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-image .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.img-border{
  box-shadow: 0 0 0 1px #000;
  text-align: center;
}
</style>
