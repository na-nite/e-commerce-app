<template>
  <div id="wrapper">
    <div
      class="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs"
    >
      <div class="ml-8 text-lg text-black-500 hidden md:flex">
        <router-link to="/" class="navbar-item ">
          <strong class="ml-8 text-2xl "
            >NaNite</strong
          >
        </router-link>
      </div>

      <form
        class="w-screen md:w-1/3 bg-medium-sea-green text-white h-11 bg-gray-300  cursor-pointer border border-black-400 text-sm rounded-full flex"
        method="get"
        action="/search"
      >
        <input
          type="search"
          placeholder="What are you looking for?"
          name="query"
          class="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
        />
        <i class="fas fa-search  mr-5 mt-2 ml-3 mb-3 text-lg  text-grey-700 w-4 h-3">
      </i>
      </form>

      <div
        @click="showMobileMenu = !showMobileMenu"
        class="flex flex-row-reverse mr-4 ml-4 md:hidden"
      >
        <i class="fas fa-bars"></i>
      </div>

      <div class="flex flex-row-reverse mr-8 hidden md:flex">
        <nav class="navbar ">
          <div class="navbar-brand">
            <a
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar-menu"
              @click="showMobileMenu = !showMobileMenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            class="navbar-menu"
            id="navbar-menu"
            v-bind:class="{ 'is-active': showMobileMenu }"
          >
            <div class="navbar-end">
              <router-link to="/summer" class="text-mg text-black-500 navbar-item">Summer</router-link>
              <router-link to="/winter" class="text-mg text-black-500 navbar-item">Winter</router-link>

              <div class="navbar-item">
                <div class="buttons">
                  <template v-if="$store.state.isAuthenticated">
                    <router-link to="/my-account" class="button text-mg text-black-500 is-light"
                      >My account</router-link
                    >
                  </template>

                  <template v-else>
                    <router-link to="/log-in" class="button text-mg text-black-500 is-light"
                      >Log in</router-link
                    >
                  </template>

                  <router-link to="/cart" class="button  text-mg text-black-500 bg-medium-sea-green text-white">
                    <span class="icon"
                      ><i class="fas fa-shopping-cart"></i
                    ></span>
                    <span>Cart ({{ cartTotalLength }})</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div
      class="is-loading-bar has-text-centered"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>

    <section class="px-2">
      <router-view />
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021 by Nedjme Eddine</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      },
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
    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
</style>
