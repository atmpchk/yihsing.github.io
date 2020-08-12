<template>
  <div id="cart" class="container">
    <loading :active.sync="isLoading"
      :is-full-page="isFullPageLoading">
    </loading>
    <div class="text-right mt-4">
      <button class="btn btn-danger" :disabled="cart.length === 0" @click="openDeleteCartModal">
        刪除整份購物清單
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="text-center">產品名稱</th>
          <th width="150" class="text-center">數量</th>
          <th width="70" class="text-center">單位</th>
          <th width="100" class="text-center">售價</th>
          <th width="70" class="text-center">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.product.id">
          <td class="text-center align-middle">{{ item.product.title }}</td>
          <td class="text-center">
            <select class="form-control" v-model="item.quantity" @change="editItemAmount(item)">
              <option v-for="n in 10" :key="'amount' + n">{{ n }}</option>
            </select>
          </td>
          <td class="text-center align-middle">{{ item.product.unit }}</td>
          <td class="text-right align-middle">{{ item.product.price | formatCurrency }}</td>
          <td class="text-center align-middle">
            <button class="btn btn-outline-danger btn-sm" @click="deleteItem(item)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td class="text-right">總計</td>
          <td class="text-right" colspan="2">{{ priceSummary | formatCurrency }}</td>
        </tr>
      </tbody>
    </table>
    <cart-remover ref="cartRemover"
      @refresh-cart="getCart"
      @set-loading="setLoading">
    </cart-remover>
    <div class="row my-4">
      <div class="col-6">
        <router-link to="/products">&#x25C1; 回到產品列表</router-link>
      </div>
      <div class="col-6 text-right">
        <router-link v-if="cart.length > 0" to="/checkOut">前往結帳 &#x25B7;</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import cartRemover from '@/components/cartRemover.vue';

export default {
  components: {
    cartRemover,
  },
  data() {
    return {
      apiInfo: {
        forCart: '/ec/shopping',
      },
      cart: [],
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
    };
  },
  computed: {
    priceSummary() {
      return this.cart.reduce(
        (accumulated, currItem) => accumulated + (currItem.product.price * currItem.quantity), 0,
      );
    },
  },
  mounted() {
    this.getCart();
  },
  methods: {
    givePage(page) {
      if (page) return page;
      return this.pagination.current_page || 1;
    },
    getCart(page) {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forCart}?page=${this.givePage(page)}`).then((result) => {
        this.cart = result.data.data;
        this.pagination = result.data.meta.pagination;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    editItemAmount(item) {
      this.isLoading = true;
      this.axios.patch(this.apiInfo.forCart, {
        product: item.product.id,
        quantity: item.quantity,
      }).then(() => {
        this.isLoading = false;
        this.getCart();
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    deleteItem(item) {
      this.isLoading = true;
      this.axios.delete(`${this.apiInfo.forCart}/${item.product.id}`).then(() => {
        this.isLoading = false;
        this.getCart();
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    openDeleteCartModal() {
      $('#cartRemoverModal').modal('show');
    },
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
  },
};
</script>

<style lang="scss">
</style>
