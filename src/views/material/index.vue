<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button>
      </div>

      <!-- 选择框选择状态（全部或收藏） -->
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
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
            <!-- class 的对象语法 -->
            <i :class="{
              'el-icon-star-on':item.is_collected,
              'el-icon-star-off':!item.is_collected
            }"></i>
            <!-- class 的普通判断语法 -->
              <!-- <i :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"></i> -->
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MaterialConnect',
  data () {
    return {
      images: []
    }
  },
  created (page) {
    this.loadMaterial()
  },
  methods: {
    loadMaterial (page) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: false,
          page
        }
      }).then(res => {
        console.log('获取素材成功', res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log('获取素材失败', err)
      })
    }
  }
}
</script>

<style lang='less'>
.col-style{
  margin-bottom: 20px;
  .operation{
    display: flex;
    justify-content: space-around;
    font-size: 24px;
  }
}
</style>
