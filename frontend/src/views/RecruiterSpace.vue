<template>
     <NavBar :fullname ="this.fullname"/>
    <ProfileCard :name ="this.fullname"/>

     


    

</template>

<script>

import NavBar from "@/components/NavBar.vue"
import ProfileCard from "@/components/ProfileCard.vue"

export default {
    name: 'RecruiterSpace',
    components: {NavBar , ProfileCard} ,

    data() {
        return {
            fullname : "",
            type : "" , 
            email : ""
    
        }
    },mounted() {
        document.title = 'RecruiterSpace | E-matcher'
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

