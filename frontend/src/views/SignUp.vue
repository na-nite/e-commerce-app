<template>
  <div class="page-sign-up">
    <div class="notification is-danger" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </div>

    <section
      class="flex h-screen w-screen flex-col md:flex-row h-screen items-center"
    >
      <div
        class="bg-indigo-600 p-10 hidden lg:block w-full md:w-1/2 xl:w-2/3 bg-auth h-screen"
        style="background-size: cover; background-position: center center;"
      ></div>

      <div
        class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div class="w-full h-100">
          <h1 class="text-3xl font-bold text-center">Emploitic SPA.</h1>
          <h4 class=" text-xl text-center font-extralight">
            Please Login in or Sign up
          </h4>

          <form class="mt-6" @submit.prevent="submitForm">
            <div>
              <label class="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullname"
                v-model="fullname"
                id=""
                placeholder="Enter Your Full Name"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mb-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />

              <div class=" ">

              <div
                class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
              >
                <input
                  type="checkbox"
                  name="toggle"
                  v-model="is_recruiter"
                  id="toggle"
                  class="toggle-checkbox object-right  absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  for="toggle"
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
              <label for="toggle" class="text-xs text-gray-700"
                >Recruiteur.</label
              >
              </div>
            </div>



            <div>
              <label class="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                v-model="email"
                id=""
                placeholder="Enter Email Address"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">Password</label>
              <input
                type="password"
                v-model="password"
                name="password"
                id=""
                placeholder="Enter Password"
                minlength="6"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">Password Confirmation</label>
              <input
                type="password"
                v-model="re_password"
                name="re_password"
                id=""
                placeholder="Enter Password"
                minlength="6"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Registre
            </button>
          </form>

          <p class="mt-8 text-center">
            Already Have an account?
            <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">
              <router-link to="/log-in">click here to login !</router-link></a
            >
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "SignUp",


  data() {
    return {
      email: "",
      fullname: "",
      type: "",
      password: "",
      re_password: "",
      errors: [],
      is_recruiter: false,
    };
  },

    watch: {
    // whenever question changes, this function will run
    is_recruiter: function () {
      console.log(this.is_recruiter)
    }},

  mounted() {
    document.title = "Sign Up | E-matcher ";
  },
  methods: {
    submitForm() {
      this.username = this.email
      this.errors = [];

      if (this.email === "") {
        this.errors.push("The email is missing");
      }
       if (this.fullname === "") {
        this.errors.push("The fullname is missing");
      }
      if (this.password === "") {
        this.errors.push("The password is too short");
      }
      if (this.password !== this.re_password) {
        this.errors.push("The passwords doesn't match");
      }
      if (!this.errors.length) {

        if (this.is_recruiter) { this.type = "Recruiter" }
        else { this.type = "Condidat"}

        const formData = {
          
          username: this.username,
          email:this.email,
          fullname:this.fullname,
          re_password:this.re_password,
          password: this.password,
          type:this.type,
          
        };

        axios
          .post("/auth/users/", formData)
          .then((response) => {
            toast({
              message: "Account created, please log in!",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
            this.$router.push("/log-in");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>

<style>
/* CHECKBOX TOGGLE SWITCH */
/* @apply rules for documentation, these do not work as inline style */
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #5558dd;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #5558dd;
}
</style>
