<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{this.$route.params.articleId?'编辑文章':'发布文章'}}</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- 富文本编辑器 -->
          <quill-editor
            style="height:200px;margin-bottom:100px"
            v-model="publishForm.content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group v-model="publishForm.cover">
            <el-radio label="1">单图</el-radio>
            <el-radio label="3">三图</el-radio>
            <el-radio label="0">无图</el-radio>
            <el-radio label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item label="频道">
          <!-- <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
            <el-option
              v-for="item in articleChannel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->

          <channel-select v-model="publishForm.channel_id"></channel-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">提交</el-button>
          <el-button @click="onSubmit(true)">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 加载富文本编辑器核心组件
import { quillEditor } from 'vue-quill-editor'
import ChannelSelect from '../../components/channel-select/index'
export default {
  components: {
    quillEditor,
    ChannelSelect
  },
  name: 'PublishArticle',
  data () {
    return {
      editorOption: {}, // 富文本编辑器的配置选项对象
      publishForm: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      }
      // articleChannel: []
    }
  },
  created () {
    // this.loadChannel()
    /*
    判断是否为编辑状态
    也就是判断所传过来的地址里面是否携带ID
    */
    if (this.$route.params.articleId) {
      this.loadArticles()
    }
  },
  methods: {
    // 添加文章
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        // 编辑文章
        this.updataArticle(draft)
      } else {
      // 添加文章
        this.addArticle(draft)
      }
    },

    // 添加文章
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',

        // headers参数
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },

        // Query参数
        params: {
          draft
        },

        // body参数
        data: this.publishForm
      })
        .then(res => {
          console.log('添加成功', res)
          this.$message({
            type: 'success',
            message: '添加成功了哦O(∩_∩)O~'
          })
          this.$router.push('/article')
        })
        .catch(err => {
          console.log('添加失败', err)
          this.$message({
            type: 'error',
            message: '添加失败了o(╥﹏╥)o'
          })
        })
    },

    // 编辑文章
    updataArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.publishForm
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '修改成功了哦O(∩_∩)O~'
        })
        this.$router.push('/article')
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '修改失败了o(╥﹏╥)o'
        })
      })
    },

    // 加载编辑文章信息内容
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        console.log(res.data)
        this.publishForm = res.data.data
      })
    }

    // 获取类别信息
    // loadChannel () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   })
    //     .then(res => {
    //       console.log('接收成功')
    //       this.articleChannel = res.data.data.channels
    //     })
    //     .catch(err => {
    //       console.log('接受失败', err)
    //     })
    // }
  }
}
</script>

<style>
</style>
