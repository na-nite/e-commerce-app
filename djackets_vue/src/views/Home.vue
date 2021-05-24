<template>
  <div class="home">
    <div class="hero-body has-text-centered">
      <carousel
      
        transition="200"
        wrapAround="true"
        snapAlign="center"
        :items-to-show="1.5"
      >
        <slide  v-for="photo in photos" :key="photo">
          <img :src="photo" />
        </slide>

        <template #addons>
          <pagination />
        </template>
      </carousel>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <ProductBox
        v-for="product in latestProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import ProductBox from "@/components/ProductBox.vue";
import axios from "axios";

export default {
  name: "Home",
  components: { ProductBox, Carousel, Slide, Pagination, Navigation },
  data() {
    return {
      latestProducts: [],
      photos: [
        "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      ],
    };
  },
  mounted() {
    this.getLatestProducts();
    document.title = "HOME | DJACKETS";
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/api/v1/latest-products")
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
