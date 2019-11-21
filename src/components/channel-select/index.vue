<template>
  <div class="channel-select">
    <el-select
    placeholder="请选择频道"
    :value='value'
    @input="onInput"
    >
      <el-option
      v-if="notAll"
      :value="null"
      label="全部频道"></el-option>
      <el-option
      v-for="item in articleChannel"
      :key="item.id"
      :label="item.name"
      :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',

  // 对象方法接收Query参数
  props: {
    value: {
      type: [String, Number] // 数据类型
      // require: true //必填项
      // default:  //默认值
      // validator:function (param) {  }  //自定义验证
    },
    notAll: {
      type: Boolean,
      default: true
    }
  },

  // 数组方法接收Query参数 （不推荐）
  // props: ['value'],
  data () {
    return {
      articleChannel: [] // 存储频道列表
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    loadChannel () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(res => {
          // console.log('接收成功')
          this.articleChannel = res.data.data.channels
        })
        .catch(err => {
          console.log('接受失败', err)
        })
    },

    // 这个函数传的参数是整个input中的值
    onInput (data) {
      this.$emit('input', data)
    }
  }
}
</script>

<style>
</style>
