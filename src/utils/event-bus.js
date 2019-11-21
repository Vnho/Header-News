import Vue from 'vue'

// 该模块导出了一个新的空的 Vue 实例
export default new Vue()

/*
操作方法:
    Vue 实例中有两个用于通信的方法:
    1.发布订阅:
    ① 在通信的 a端(组件)使用 event-bus 订阅一个自定义事件
        eventBus.$on('事件名称',()=>{
            ***自己定义的逻辑和代码
        })
    ② 在通信的 b端(组件),根据之前的业务发布(调用)自定义事件
        eventBus.$emit('事件名称',如果有数据需要传递直接在在这里)
    2.通知
*/
