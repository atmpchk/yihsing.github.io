<template>
  <div>
    <loading :active.sync="isLoading"
      :is-full-page="isFullPageLoading">
    </loading>
    <div class="position-relative d-flex align-items-center justify-content-center"
      style="min-height: 400px;"
    >
      <div class="position-absolute jumbotron-img"></div>
      <h2 class="font-weight-bold">精選產品</h2>
    </div>

    <div id="products" class="container">
      <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
          <product :product="product"
            :in-cart="isInCart(product)"
            @put-to-cart="putToCart">
          </product>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-12 text-right">
          <router-link to="/cart">查看購物車 &#x25B7;</router-link>
        </div>
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
    this.isLoading = true;
    Promise.all([this.getProductIdsInCart(), this.getProducts()]).then((results) => {
      this.setProductIdsInCart(results[0]);
      this.setProducts(results[1]);
      this.isLoading = false;
    }).catch((reason) => {
      this.isLoading = false;
      console.log(reason);
    });
  },
  methods: {
    givePage(page) {
      if (page) return page;
      return this.pagination.current_page || 1;
    },
    getProductIdsInCart(page) {
      return this.axios.get(`${this.apiInfo.forCart}?page=${this.givePage(page)}`);
    },
    setProductIdsInCart(result) {
      this.productIdsInCart = result.data.data.map((item) => item.product.id);
    },
    getProducts(page) {
      return this.axios.get(`${this.apiInfo.forProducts}?page=${this.givePage(page)}`);
    },
    setProducts(result) {
      this.products = result.data.data;
      this.pagination = result.data.meta.pagination;
    },
    putToCart(id) {
      this.productIdsInCart.push(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.jumbotron-img {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9lkw3NZPCM09C05IruMP7z7AeuYRhImFry8QFtjOzljjeTMo92kGrCu6GSe4ijurmxDxI4hZOj9r0ftiljsBaWufPpvUYNyLuExnwX8KvrVGKqyzbjIKaoTjrhnUDLgE.png);
  background-position: center center;
  opacity: 0.25;
}
</style>
