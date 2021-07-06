<template>
  <div id="wrapper">
    <div
      class="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs"
    >
    <router-view>
    </router-view>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
    
    };
  },
  beforeCreate() {

    this.$store.commit("initializeStore");
    const token = this.$store.state.token;


    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }

   
  },
  mounted() {
  
  },
  computed: {
  
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";

</style>
