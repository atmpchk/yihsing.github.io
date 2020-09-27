<template>
  <div class="container">
    <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
    <div class="row align-items-center">
      <div class="col-md-7">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active"
              v-for="(url, index) in product.imageUrl"
              :class="{ active: index === 0 }"
              :key="'url' + index"
            >
              <img :src="url" class="d-block w-100" alt="...">
            </div>
          </div>
          <a class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-md-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0 mb-0">
            <li class="breadcrumb-item">
              <router-link to="/" exact>首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products">產品</router-link>
            </li>
          </ol>
        </nav>
        <h2 class="font-weight-bold h1 mb-1">{{ product.title }}</h2>
        <p class="mb-0 text-muted text-right" v-if="inCartQuantity > 0">
          <!-- <del>{{ product.origin_price | formatCurrency }}</del> -->
          {{`已選購 ${inCartQuantity} ${product.unit}`}}
        </p>
        <p class="h4 font-weight-bold text-right">{{ product.price | formatCurrency }}</p>
        <div class="d-flex align-items-center">
          <div class="input-group my-3 mr-2 bg-light rounded">
            <div class="input-group-prepend">
              <button class="btn btn-outline-dark border-0 py-2"
                type="button"
                @click="quantity === 1 ? quantity : quantity--"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
            <money class="form-control border-0 text-center my-auto shadow-none bg-light"
              v-model="quantity"
              v-bind="money"
              readonly
            >
            </money>
            <div class="input-group-append">
              <button class="btn btn-outline-dark border-0 py-2"
                type="button"
                @click="quantity === 10 ? quantity : quantity++"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <button type="button"
            class="btn btn-dark btn-block py-2"
            @click="putToCart"
            :disabled="inCartQuantity >= 10"
          >
            加入購物車
          </button>
          <!-- <a href="./checkout.html" class="btn btn-dark btn-block py-2">前往結帳</a> -->
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-md-4">
        <p>{{ product.content }}</p>
      </div>
      <div class="col-md-3">
        <p class="text-muted">{{ product.description }}</p>
      </div>
    </div>
    <h3 class="font-weight-bold" v-if="haveRelatedProducts">更多相關產品</h3>
    <div class="swiper-container mt-4 mb-5" v-if="haveRelatedProducts">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="product in relatedProducts" :key="product.id">
          <div class="card border-0 mb-4 position-relative position-relative">
            <router-link :to="`/product/${product.id}`" class="text-dark">
              <img :src="product.imageUrl[0]" class="card-img-top rounded-0" alt="...">
            </router-link>
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                <router-link :to="`/product/${product.id}`">
                  {{ product.title }}
                </router-link>
              </h4>
              <p class="card-text mb-0">
                {{ product.price | formatCurrency }}
              </p>
              <p class="text-muted mt-3"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Money } from 'v-money';

export default {
  components: {
    Money,
  },
  data() {
    return {
      apiInfo: {
        forCart: '/ec/shopping',
        forProduct: '/ec/product',
        forProducts: '/ec/products',
      },
      isLoading: false,
      isFullPageLoading: true,
      product: {
        id: '',
      },
      quantity: 1,
      inCartQuantity: 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false,
      },
      relatedProducts: [],
    };
  },
  computed: {
    haveRelatedProducts() {
      return this.relatedProducts.length > 0;
    },
  },
  watch: {
    $route(to) {
      if (to.params.id !== this.product.id) {
        this.setAndQueryProduct();
      }
    },
  },
  created() {
    this.setAndQueryProduct();
  },
  mounted() {
  },
  beforeDestroy() {
    this.$bus.$off('productInCart');
  },
  methods: {
    setAndQueryProduct() {
      this.relatedProducts = [];

      this.product.id = this.$route.params.id;

      this.$bus.$emit('isProductInCart', this.product.id);

      this.$bus.$on('productInCart', (quantity) => {
        this.inCartQuantity = quantity;
      });

      this.queryProduct();
    },
    putToCart() {
      this.isLoading = true;
      const method = this.inCartQuantity > 0 ? 'patch' : 'post';
      this.axios[method](this.apiInfo.forCart, {
        product: this.product.id,
        quantity: method === 'patch' ? this.quantity + this.inCartQuantity : this.quantity,
      }).then(() => {
        this.$bus.$emit('addProductToCart', { id: this.product.id, quantity: this.quantity });
        this.inCartQuantity += this.quantity;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    queryProduct() {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forProduct}/${this.product.id}`).then((result) => {
        this.product = result.data.data;
        this.isLoading = false;
        this.findRelatedProducts();
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    findRelatedProducts() {
      this.axios.get(`${this.apiInfo.forProducts}`).then((result) => {
        this.relatedProducts = result.data.data.filter(
          (product) => product.category === this.product.category && product.id !== this.product.id,
        ).splice(0, 2);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style>
</style>
