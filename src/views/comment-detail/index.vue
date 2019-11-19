<template>
  <div class="comment-detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论详情列表</span>
      </div>
      <el-table
      :data="commentData"
      style="width: 100%">
        <el-table-column
        prop="aut_photo"
        label="作者头像"
        width="180"
        >
       <template slot-scope="scope">
          <img width="100" :src="scope.row.aut_photo" >
       </template>
        </el-table-column>
        <el-table-column
        prop="aut_name"
        label="评论内容"
        width="180"></el-table-column>
        <el-table-column
        prop="is_liking"
        label="点赞"
        >
        <template slot-scope="scope">
          <el-tag
          v-if="scope.row.is_liking===1"
          type="success"
          >已点赞</el-tag>
          <el-tag
          v-else
          type="danger"
          >未点赞</el-tag>
        </template>
        </el-table-column>
        <el-table-column
        prop="like_count"
        label="点赞数量"
        ></el-table-column>
        <el-table-column
        prop="pubdate"
        label="评论日期"
        >
        <template slot-scope="scope">
          {{ scope.row.pubdate | dataFormat }}
        </template>
        </el-table-column>
        <el-table-column
        prop="reply_count"
        label="回复数量"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 引入日期组件包
// import Moment from 'moment'

export default {
  name: 'CommentDetail',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      commentData: []
    }
  },

  /*
  实例选项: 过滤器
  全局:实例中的任何一个组件
  局部:只能在当前组件

  ***
    作用:常用于一些简单的文本格式化,例如:日期格式化处理

  ***
    过滤器函数可以直接在模板中调用
  ***
    调用方式: {{ 数据 | 过滤器函数 }}
  */
  //  局部过滤器
  // filters: {
  //   dataFormat (value) {
  //     return Moment(value).format('YYYY-MM-DD')
  //   }
  // },
  created () {
    this.loadComment()
  },
  methods: {
    loadComment () {
      this.$axios({
        method: 'GET',
        url: `/comments`,
        params: {
          type: 'a',
          source: this.articleId
        }
      }).then(res => {
        const commentData = res.data.data.results
        /** ** moment 组件的内置方法 ***
        commentData.forEach(element => {
        // Moment(指定时间).format('格式')
            element.pubdate = Moment(element.pubdate).format(`YYYY年MM月DD日`)
         }) */
        console.log(res)
        this.commentData = commentData
      }).catch(err => {
        console.log(err)
        this.$message.danger('请求失败了o(╥﹏╥)o')
      })
    }
  }
}
</script>

<style>
</style>
