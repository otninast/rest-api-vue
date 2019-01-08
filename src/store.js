import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: null,
  profile: null,
}

const mutations = {
  setUser (state, userData) {
    state.user = userData
  },
  setProfile (state, profileData) {
    state.profile = profileData
  },
}

const actions = {

}


export default new Vuex.Store({
  state,
  mutations,
  actions,
})
