<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <!-- 表格 -->
      <el-table :data="this.articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数据"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="评论状态" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" round size="mini">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="totalPage"
    @change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ArticleComment',
  data () {
    return {
      articles: [],
      totalPage: null
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page
        }
      })
        .then(res => {
          // console.log(res.data)
          this.articles = res.data.data.results
          this.totalPage = res.data.data.results.length
        })
        .catch(err => {
          console.log(err, '获取数据失败')
        })
    },
    changePage (page) {
      this.loadArticle(page)
      this.page = page
    },
    onStatusChange (article) {
      console.log(article)
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        console.log(res)
        this.$message.success('修改成功了哟O(∩_∩)O~')
      }).catch(err => {
        console.log(err)
        this.$message.error('修改失败了o(╥﹏╥)o')
      })
    }
  }
}
</script>

<style>
</style>
