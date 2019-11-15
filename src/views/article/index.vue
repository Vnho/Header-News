<template>
  <div class="article">
    <!-- 数据筛选框 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道选择">
          <el-select placeholder="请选择活动区域" v-model="filterForm.channel_id">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <div class="block">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card class="box-card search">
      <div slot="header" class="clearfix">
        <span>共找到5680056条符合条件的内容</span>
      </div>
      <el-table :data="articals" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180">
          <!--
            1.自定义表格列获取图片地址
            2.在template上声明 slot-scope="scpoe"就可以用scope.row获取遍历项
            注意:只有当你需要在自定义表格列模板中访问遍历项的时候才这么做
          -->
          <template slot-scope="scope">
            <!-- scope.row就相当于我们写的 v-for 里面的item -->
            <!-- 取到数组对象中的图片相对应的地址(第一个)赋给图片地址 -->
            <img :src="scope.row.cover.images[0]" width="50px" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="发布状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="articalStatus[scope.row.status].type" effect='dark'>
              <span>{{articalStatus[scope.row.status].label}}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template>
            <el-button type="danger" size="mini">删除</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'filterform',
  data () {
    return {
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      articals: [],
      articalStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ]
    }
  },
  created () {
    this.loadArtical()
  },
  methods: {
    loadArtical () {
      // 在项目中,除了登录页'/login'不需要token,其他接口都需要token
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // 这里是因为需要token数据验证要需要设置请求头，格式在文档中有显示
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          console.log(res)
          this.articals = res.data.data.results
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.search {
  margin: 20px 0;
}
</style>
