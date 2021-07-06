// src/mixins/clickMixin.js
import axios from 'axios'
export default {
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")
            localStorage.removeItem("email")
            localStorage.removeItem("type")
            localStorage.removeItem("fullname")
            this.$store.commit('removeToken')
            this.$router.push('/')
        } , 
       
    }
  };