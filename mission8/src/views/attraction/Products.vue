<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
    <div class="position-relative d-flex align-items-center justify-content-center"
      style="min-height: 400px;"
    >
      <div class="position-absolute jumbotron-img"></div>
      <h2 class="font-weight-bold">只溶於口、不溶於手</h2>
    </div>

    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <div class="col-md-4">
          <div class="list-group list-group-flush">
            <button type="button"
              class="list-group-item list-group-item-action border-top"
              :class="{ active: currGroup === '*'}"
              @click="switchGroup('*')"
            >
              所有產品
            </button>
            <button type="button"
              v-if="haveFavorites"
              class="list-group-item list-group-item-action"
              :class="{ active: currGroup === 'favorited'}"
              @click="switchGroup('favorited')"
            >
              我享要
              <i class="fas fa-heart"></i>
            </button>
            <button type="button"
              class="list-group-item list-group-item-action"
              v-for="(key, index) in Object.keys(groupedProducts)"
              :key="key"
              :class="listGroupStyles(index)"
              @click="switchGroup(index)"
            >
              {{ key }}
            </button>
          </div>
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6" v-for="product in filteredProducts" :key="product.id">
              <product :product="product"
                :in-cart="isInCart(product)"
                @put-to-cart="putToCart"
                :favorited="isFavorite(product)"
                @toggle-favorite="toggleFavorite">
              </product>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/views/attraction/Product.vue';
import arrayUtils from '@/assets/js/arrayUtils';

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
      currGroup: '*',
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
      favoriteInfo: {
        key: 'hexSchoolFavorites',
        content: [],
      },
    };
  },
  computed: {
    isInCart() {
      return (product) => this.productIdsInCart.includes(product.id);
    },
    groupedProducts() {
      return arrayUtils(this.products, 'category');
    },
    filteredProducts() {
      if (this.currGroup === '*') {
        return this.products;
      }

      if (this.currGroup === 'favorited') {
        return this.products.filter((product) => this.favoriteInfo.content.includes(product.id));
      }

      return this.groupedProducts[Object.keys(this.groupedProducts)[this.currGroup]];
    },
    listGroupStyles() {
      return (index) => ({
        active: index === this.currGroup,
        'border-bottom': index === Object.keys(this.groupedProducts).length - 1,
      });
    },
    isFavorite() {
      return (product) => this.favoriteInfo.content.includes(product.id);
    },
    haveFavorites() {
      return this.favoriteInfo.content.length > 0;
    },
  },
  created() {
    this.favoriteInfo.content = window.localStorage.getItem(this.favoriteInfo.key)
      ? window.localStorage.getItem(this.favoriteInfo.key).split(',')
      : [];
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
    switchGroup(index) {
      this.currGroup = index;
    },
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
    toggleFavorite(id) {
      const targetIndex = this.favoriteInfo.content.indexOf(id);
      if (targetIndex > -1) {
        this.favoriteInfo.content.splice(targetIndex, 1);
      } else {
        this.favoriteInfo.content.push(id);
      }
      this.trySwitchFilterWhenFavoritesEmpty();
      const storage = window.localStorage;
      storage.setItem(this.favoriteInfo.key, this.favoriteInfo.content.toString());
    },
    trySwitchFilterWhenFavoritesEmpty() {
      if (!this.haveFavorites) {
        this.currGroup = '*';
      }
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
