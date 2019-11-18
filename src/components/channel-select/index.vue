<template>
  <div class="channel-select">
    <el-select
    placeholder="请选择频道"
    :value='value'
    @input="onInput"
    >
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
  components: {},
  // props: {
  //   value: {
  //     type: [String, Number],
  //     require: true
  //   }
  // },
  props: ['value'],
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
          console.log('接收成功')
          this.articleChannel = res.data.data.channels
        })
        .catch(err => {
          console.log('接受失败', err)
        })
    },
    onInput (data) {
      this.$emit('input', data)
    }
  }
}
</script>

<style>
</style>
