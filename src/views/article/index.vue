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
          <!-- 单选框会把选中的radio的label传给 -->
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道选择">
          <el-select placeholder="请选择文章分类" v-model="filterForm.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option
              v-for="item in articleChannel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="loadArticle()" type="primary" round>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card class="box-card search">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
      </div>
      <el-table
        :data="articals"
        v-loading="loading"
        element-loading-text="着什么急啊！越着急越慢！"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
        <el-table-column prop="date" label="封面" width="180">
          <!--
            1.自定义表格列获取图片地址
            2.在template上声明 slot-scope="scpoe"就可以用scope.row获取遍历项
            注意:只有当你需要在自定义表格列模板中访问遍历项的时候才这么做
          -->
          <template slot-scope="scope">
            <!-- scope.row就相当于我们写的 v-for 里面的item -->
            <!-- 取到数组对象中的图片相对应的地址(第一个)赋给图片地址 -->
            <img :src="scope.row.cover.images[0]" width="100px" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="发布状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="articalStatus[scope.row.status].type" effect="dark" size="mini">
              <span>{{articalStatus[scope.row.status].label}}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <!-- 此处需要遍历，将每一个数组遍历出来后，查找出所需要的ID -->
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页组件
    默认按照10条每页划分页码-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="onPageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'filterform',
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null
      },
      rangeDate: '',
      articals: [],
      articalStatus: [
        {
          type: 'primary',
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
          type: 'danger',
          label: '已删除'
        },
        {
          type: '',
          label: '全部'
        }
      ],
      totalCount: 0,
      loading: true,
      articleChannel: []
    }
  },
  created () {
    this.loadArticle()
    this.loadChannel()
  },
  methods: {
    // 加载所有文章并渲染
    loadArticle (page) {
      // 设置默认页为第一页
      this.loading = true
      // 在项目中,除了登录页'/login'不需要token,其他接口都需要token
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // 这里是因为需要token数据验证要需要设置请求头，格式在文档中有显示
        headers: {
          Authorization: `Bearer ${token}`
        },

        /*
        Query参数,请求数据列表参数
         */
        params: {
          page, // 页码
          // axios中有个功能，当参数值为null的时候不发送
          per_page: 10, // 每页显示的内容条数,后端默认每页十条
          status: this.filterForm.status,
          channel_id: this.filterForm.channel_id,
          begin_pubdate: this.rangeDate[0],
          end_pubdate: this.rangeDate[1]
        }
      })
        .then(res => {
          this.totalCount = res.data.data.total_count
          this.articals = res.data.data.results
        })
        .catch(err => {
          console.log(err, '查询失败')
        })
        .finally(() => {
          // 无论成功还是失败都会执行
          this.loading = false
        })
    },

    // 加载所有文章类型
    loadChannel () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.articleChannel = res.data.data.channels
      })
    },

    // 换页时加载文章数据
    onPageChange (page) {
      this.loadArticle(page)
    }
    // onDelete (ID) {
    //   const token = window.localStorage.getItem('user-token')
    //   this.$axios({
    //     method: 'DELETE',
    //     url: `/articles/${ID}`,
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //     .then(res => {
    //       console.log(res)
    //       this.loadArticle()
    //     })
    //     .catch(err => {
    //       console.log(err, '删除失败')
    //     })
    // }
  }
}
</script>

<style>
.search {
  margin: 20px 0;
}
</style>
