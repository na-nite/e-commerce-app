<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My account</h1>
                <h3 class="title">{{fullname}}</h3>
                <h3 class="title">{{email}}</h3>
                <h3 class="title">{{type}}</h3>

            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Log out</button>
            </div>

        </div>
    </div>
</template>

<script>
import authMixin from '@/mixins/authMixin'

export default {
    name: 'MyAccount',
    mixins: [authMixin],

    data() {
        return {
            fullname : "",
            type : "" , 
            email : ""
    
        }
    },mounted() {
        document.title = 'My account | E-matcher'
        this.getuser()
    },
    methods: {
        
         getuser () {
        this.fullname = localStorage.getItem('fullname')
        this.email = localStorage.getItem('email')
        this.type = localStorage.getItem('type')
         }
        
        }}
       
      
</script>