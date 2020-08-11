<template>
  <div id="products" class="container">
    <loading :active.sync="isLoading"
      :is-full-page="isFullPageLoading">
    </loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <product :product="product"
          :in-cart="isInCart(product)"
          @put-to-cart="putToCart"
          @update-description="updateDescription">
        </product>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-12 text-right">
        <router-link to="/cart">查看購物車 &#x25B7;</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/views/attraction/Product.vue';

export default {
  components: {
    Product,
  },
  data() {
    return {
      apiInfo: {
        forCart: '/ec/shopping',
        forProducts: '/ec/products',
      },
      productIdsInCart: [],
      products: [],
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
    };
  },
  computed: {
    isInCart() {
      return (product) => this.productIdsInCart.includes(product.id);
    },
  },
  mounted() {
    this.getProductIdsInCart();
    this.getProducts();
  },
  methods: {
    getProductIdsInCart(page) {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forCart}?page=${this.givePage(page)}`).then((result) => {
        this.productIdsInCart = result.data.data.map((item) => item.product.id);
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    givePage(page) {
      if (page) return page;
      return this.pagination.current_page || 1;
    },
    getProducts(page) {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forProducts}?page=${this.givePage(page)}`).then((result) => {
        this.products = result.data.data;
        this.pagination = result.data.meta.pagination;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    putToCart(id) {
      this.productIdsInCart.push(id);
    },
    updateDescription(product) {
      this.products.find((item) => item.id === product.id).description = product.description;
    },
  },
};
</script>

<style>
</style>
