import { createStore } from 'vuex'

export default createStore({
  state: {

    isAuthentcated : false,
    token : '',

  },

  mutations: {

    initializeStore(state){
    
    if (localStorage.getItem('token')) {
      state.token = localStorage.getItem('token')
      state.isAuthentcated = true
    } else {
        state.token = ''
        state.isAuthentcated = false
    }
  
    }, 
   
      setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },  
      removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
    },
  
  },
  actions: {
  },
  modules: {
  }
})
