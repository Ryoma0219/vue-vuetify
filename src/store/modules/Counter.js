const state = {
  main: 0,
  message: 'hoshino',
  points: {
    function: '',
    device: 0
  },
  progress: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  setMessage (state, payload) {
    state.message = payload
  },
  setProgress (state, page) {
    switch (page) {
      case 'top':
        state.progress = 0
        break
      case 'function':
        state.progress = 30
        break
      case 'device':
        state.progress = 60
        break
      case 'result':
        state.progress = 100
        break
    }
  },
  setFunction (state, payload) {
    state.points.function = payload
  },
  setDevice (state, payload) {
    state.points.device = payload
  }
}

const getters = {
  message: (state) => state.message,
  progress: (state) => state.progress,
  result: (state) => `機能は` + state.points.function + `で、端末は` + state.points.device + `だよー`

}

const actions = {
  someAsyncTask ({
    commit
  }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
