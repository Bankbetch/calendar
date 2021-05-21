const state = () => ({
  events: [],
  searchOptions: [],
})

const getters = {}

const actions = {
  async getSearch({ commit }, search) {
    try {
      const result = await this.$axios.get('/api/calendars/event/search', {
        params: {
          q: search,
        },
      })
      commit('setSearch', result.data.result)
    } catch (error) {
      console.log(error.response)
      return commit('setSearch', [])
    }
  },
  async getEvent({ commit }, search) {
    try {
      const result = await this.$axios.get('/api/calendars/event', {
        params: {
          q: search,
        },
      })
      commit('setEvent', result.data.result)
    } catch (error) {
      console.log(error.response)
      return commit('setEvent', [])
    }
  },
  async createEvent({ commit }, data) {
    try {
      data.class = data.class.id
      const result = await this.$axios.post('/api/calendars/event', data)
      return result.data
    } catch (error) {
      return error.response.data
    }
  },
  async editEvent({ commit }, data) {
    try {
      data.class = data.class.id || data.class
      const result = await this.$axios.put(`/api/calendars/event/${data._id}`, data)
      return result.data
    } catch (error) {
      return error.response.data
    }
  },
}
const mutations = {
  setEvent(state, data) {
    state.events = data
  },
  setSearch(state, data) {
    state.searchOptions = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
