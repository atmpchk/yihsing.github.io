<template>
  <div class="h-100 d-flex flex-column">
    <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
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
      productsInCart: [],
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
    };
  },
  created() {
    this.registerBusEvents();
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
  beforeDestroy() {
    this.destroyBusEvents();
  },
  methods: {
    registerBusEvents() {
      this.$bus.$on('isProductInCart', (id) => {
        setTimeout(() => {
          this.$bus.$emit('productInCart', this.getProductQuantity(id));
        }, 1000);
      });

      this.$bus.$on('addProductToCart', ({ id, quantity }) => {
        if (this.productIdsInCart.includes(id)) {
          const cartItem = this.productsInCart.find((item) => item.product.id === id);
          cartItem.quantity += quantity;
        } else {
          this.productIdsInCart.push(id);
          this.productsInCart.push({ product: { id }, quantity });
          this.broadcastProductInCartCount();
        }
      });

      this.$bus.$on('removeProductFromCart', (id) => {
        if (this.productIdsInCart.includes(id)) {
          this.productIdsInCart.splice(this.productIdsInCart.indexOf(id), 1);
          this.productsInCart.splice(
            this.productsInCart.findIndex((item) => item.product.id === id), 1,
          );
          this.broadcastProductInCartCount();
        }
      });

      this.$bus.$on('resetCart', () => {
        this.productIdsInCart.splice(0, this.productIdsInCart.length);
        this.productsInCart.splice(0, this.productsInCart.length);
        this.broadcastProductInCartCount();
      });
    },
    destroyBusEvents() {
      this.$bus.$off('isProductInCart');
      this.$bus.$off('addProductToCart');
      this.$bus.$off('removeProductFromCart');
      this.$bus.$off('resetCart');
    },
    getProductQuantity(id) {
      return this.productIdsInCart.includes(id)
        ? this.productsInCart.find((item) => item.product.id === id).quantity
        : 0;
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
      this.productsInCart = result.data.data;
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
