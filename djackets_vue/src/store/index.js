import { createStore } from 'vuex'

export default createStore({
  state: {

    cart : { items : [] , },
    isAuthentcated : false,
    token : '',
    isLoading : false,

  },

  mutations: {

    initializeStore(state){
    
    if (localStorage.getItem('cart')) {

      state.cart = JSON.parse(localStorage.getItem('cart'))

    } else { localStorage.setItem('cart' , JSON.stringify(state.cart)) }

    if (localStorage.getItem('toekn')) {
      state.token = localStorage.getItem('toekn')
      state.isAuthentcated = true
    } else {
        state.token = ''
        state.isAuthentcated = false
    }
  
    }, 

    addToCart(state , item){

        const exists = state.cart.items.filter(i => i.product.id === item.product.id )
        if (exists.length) {

          exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)

        } else {state.cart.items.push(item)}

        localStorage.setItem('cart' , JSON.stringify(state.cart))
   
      },
      
      setIsLoading(state , status){
        state.isLoading = status
      }, 
      setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },  
      removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
    },
    clearCart(state) {
      state.cart = { items: [] }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
  },
  actions: {
  },
  modules: {
  }
})