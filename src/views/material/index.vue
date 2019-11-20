<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button>
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
              <i class="el-icon-delete-solid"></i>
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
export default {
  name: 'MaterialConnect',
  data () {
    return {
      images: [],
      status: this.collect,
      page: 1,
      total_count: 0
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
        console.log('获取素材成功', res)
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

    // 收藏时的操作
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
