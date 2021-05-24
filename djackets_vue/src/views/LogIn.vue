<template>
  <div class="page-log-in">
    <div class="notification is-danger" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </div>
    <div class=" h-screen w-screen">
      <div
        class="flex flex-col items-center flex-1 h-full justify-center px-0 sm:px-0"
      >
        <div
          class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style="height: 500px"
        >
          <div class="flex flex-col w-full md:w-1/2 p-4">
            <div class="flex flex-col flex-1 justify-center mb-8">
              <h1 class="text-4xl text-center font-thin">Welcome Back</h1>
              <div class="w-full mt-4">
                <form
                  class="form-horizontal w-3/4 mx-auto"
                  @submit.prevent="submitForm"
                >
                  <div class="flex flex-col mt-4">
                    <input
                      v-model="username"
                      type="text"
                      class="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                  <div class="flex flex-col mt-4">
                    <input
                      v-model="password"
                      type="password"
                      class="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="password"
                      required
                      placeholder="Password"
                    />
                  </div>

                  <div class="flex flex-col mt-8">
                    <button
                      type="submit"
                      class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div class="text-center mt-4">
                  <a
                    class="no-underline hover:underline text-blue-dark text-xs"
                  >
                    <router-link to="/sign-up"
                      >Or click here to sign up!</router-link
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="hidden md:block md:w-1/2 rounded-r-lg"
            style="background: url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'); background-size: cover; background-position: center center;"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LogIn",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Log In | Djackets";
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const formData = {
        username: this.username,
        password: this.password,
      };
      await axios
        .post("/api/v1/token/login/", formData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);

          const toPath = this.$route.query.to || "/cart";
          this.$router.push(toPath);
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
