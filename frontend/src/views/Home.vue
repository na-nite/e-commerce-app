<template>
  <div class="home">
    <div class="hero-body has-text-centered">
      <h1> You'll be redirected to Sign In </h1>
  </div>
   </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
    
    };
  },
  mounted() {
    document.title = "HOME | E-matcher";
    this.$router.push("/log-in");
   
  },
  methods: {
  
  },
};
</script>
