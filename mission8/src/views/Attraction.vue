<template>
  <div class="h-100 d-flex flex-column">
    <loading :active.sync="isLoading"
      :is-full-page="isFullPageLoading">
    </loading>
    <div class="attraction-body">
      <app-header></app-header>
      <router-view/>
    </div>
    <app-footer class="flex-shrink-0"></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/attraction/Header.vue';
import AppFooter from '@/components/attraction/Footer.vue';

export default {
  name: 'Attraction',
  components: {
    AppHeader,
    AppFooter,
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
  created() {
    this.isLoading = true;
    this.getProductIdsInCart().then((result) => {
      this.setProductIdsInCart(result);
      this.broadcastProductInCartCount();
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
    broadcastProductInCartCount() {
      this.$bus.$emit('productInCartCount', this.productIdsInCart.length);
    },
  },
};
</script>

<style lang="scss">
.attraction-body {
  flex: 1 0 auto;
}
</style>
