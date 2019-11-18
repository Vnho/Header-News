<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <!-- 表格 -->
      <el-table
      :data="this.articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="评论状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="total_comment-count"
        label="总评论数据">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: []
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.result
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
</style>
