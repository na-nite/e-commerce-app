<template>

<div class="page-log-in">
    <div class="notification is-danger" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </div>

<section class="flex h-screen w-screen flex-col md:flex-row h-screen items-center">

  <div class="bg-indigo-600 p-10 hidden lg:block w-full md:w-1/2 xl:w-2/3 bg-auth h-screen"
   style="background-size: cover; background-position: center center;">
  </div>

  <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div class="w-full h-100">


       <h1 class="text-3xl font-bold text-center">Emploitic SPA.</h1>
        <h4 class=" text-xl text-center font-extralight">Please Login in or Sign up</h4>

      <form class="mt-6" @submit.prevent="submitForm">
        <div>
          <label class="block text-gray-700">Email Address</label>
          <input type="email" name="username"  v-model="email" id="" placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required>
        </div>

        <div class="mt-4">
          <label class="block text-gray-700">Password</label>
          <input type="password"  v-model="password" name="password" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required>
        </div>

   

        <button type="submit" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log In</button>
      </form>

      <p class="mt-8 text-center">Need an account? <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold"><router-link to="/sign-up"
                      >click here to sign up!</router-link
                    ></a></p>


    </div>
  </div>

</section>

 </div>

   
</template>

<script>
import axios from "axios";
export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Log In | E-matcher";
  },
  methods: {

     async getuser() {

        await axios
        .get("/auth/users/me/")
        .then((response) => {
    
          localStorage.setItem("fullname", response.data.fullname);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("type", response.data.type);


             let toPath = ""

          if (response.data.type!="Recruiter"){
               toPath = this.$route.query.to || "/my-account";
           } else {
               toPath = this.$route.query.to || "/recruiter";
          }
       
          this.$router.push(toPath);

        }).catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push("Something went wrong. Please try again");
            console.log(JSON.stringify(error));
          }
        });

        
        },
    
    async submitForm() {

      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const formData = {
        email: this.email,
        password: this.password,
      };
      await axios
        .post("/auth/token/login/", formData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);

          this.getuser()


        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push("Something went wrong. Please try again");

            console.log(JSON.stringify(error));
          }
        });

        
    },
  },
};
</script>
