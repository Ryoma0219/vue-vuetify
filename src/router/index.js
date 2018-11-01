import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'top',
      component: require('@/components/Top').default
    },
    // 以下を追加
    {
      path: '/todo',
      name: 'todo',
      component: require('@/components/Todo').default
    },
    // 以上を追加
    // 以下を追加
    {
      path: '/device',
      name: 'device',
      component: require('@/components/Device').default
    },
    // 以上を追加
    {
      path: '/result',
      name: 'result',
      component: require('@/components/Video').default
    }
    // 以上を追加
  ]
})
