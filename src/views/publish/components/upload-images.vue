<template>
  <div class="upload-image">
    <div class="preview" @click="onVisible">
      <!-- <img
      v-if=""
      src=""
      class="avatar"> -->
      <i class="el-icon-plus avatar-uploader-icon"></i>
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
              'img-border':index
            }"
            >
              <img
              height="100"
              width="100"
              :src="item.url">
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="用户上传" name="second">配置管理</el-tab-pane>
    </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  components: {},
  props: {},
  data () {
    return {
      centerDialogVisible: false, // 对话框的显示与隐藏
      activeName: 'first', // 激活的标签页
      activeImages: 'all', // 图片的状态选择
      images: []
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
        this.$emit()
      }).catch(err => {
        console.log('获取素材失败', err)
      })
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
  border: 1px solid #000;
  text-align: center;
}
</style>
