<template>
  <div id="cart" class="container">
    <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
    <div class="container">
      <div class="mt-3">
        <h3 class="mt-3 mb-4">購物清單</h3>
        <div class="row">
          <div class="col-md-8">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 pl-0">產品</th>
                  <th scope="col" class="border-0">數量</th>
                  <th scope="col" class="border-0">單價</th>
                  <th scope="col" class="border-0"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-bottom"
                  :class="{ 'border-top': index === 0 }"
                  v-for="(item, index) in cart"
                  :key="item.product.id"
                >
                  <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                    <img :src="item.product.imageUrl[0]"
                      alt=""
                      style="width: 72px; height: 72px; object-fit: cover;"
                    >
                    <p class="mb-0 font-weight-bold ml-3 d-inline-block">
                      {{ item.product.title }}
                    </p>
                  </th>
                  <td class="border-0 align-middle" style="max-width: 160px;">
                    <div class="input-group pr-5">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-dark border-0 py-2"
                          type="button"
                          id="button-addon1"
                          @click="minusItemQuantity(item)"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                      </div>
                      <input type="text"
                        class="form-control border-0 text-center my-auto shadow-none bg-white"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        v-model="item.quantity"
                        readonly
                      >
                      <div class="input-group-append">
                        <button class="btn btn-outline-dark border-0 py-2"
                          type="button"
                          id="button-addon2"
                          @click="addItemQuantity(item)"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="border-0 align-middle">
                    <p class="mb-0 ml-auto">
                      {{ item.product.price | formatCurrency }}
                    </p>
                  </td>
                  <td class="border-0 align-middle">
                    <a href="#" @click="deleteItem(item)">
                      <i class="fas fa-times"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="input-group w-50">
              <input type="text"
                class="form-control rounded-0
                  border-bottom border-top-0 border-left-0 border-right-0 shadow-none"
                placeholder="折扣代碼"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              >
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark
                    border-bottom border-top-0 border-left-0 border-right-0 rounded-0"
                  type="button"
                  id="button-addon2"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border p-4 mb-4">
              <h4 class="font-weight-bold mb-4">訂單試算</h4>
              <table class="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                    <td class="text-right border-0 px-0 pt-4">
                      {{ priceSummary | formatCurrency }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">付款方式</th>
                    <td class="text-right border-0 px-0 pt-0 pb-4">ApplePay</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 font-weight-bold">總計</p>
                <p class="mb-0 h4 font-weight-bold">{{ priceSummary | formatCurrency }}</p>
              </div>
              <a href="./checkout.html" class="btn btn-dark btn-block mt-4">訂單確定</a>
            </div>
          </div>
        </div>
        <div class="my-5">
          <h3 class="font-weight-bold">Lorem ipsum dolor sit amet</h3>
          <div class="swiper-container mt-4 mb-5">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="card border-0 mb-4 position-relative position-relative">
                  <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
                  <a href="#" class="text-dark">
                  </a>
                  <div class="card-body p-0">
                    <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                    <p class="card-text mb-0">
                      NT$1,080 <span class="text-muted "><del>NT$1,200</del></span>
                    </p>
                    <p class="text-muted mt-3"></p>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="card border-0 mb-4 position-relative position-relative">
                  <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
                  <a href="#" class="text-dark">
                  </a>
                  <div class="card-body p-0">
                    <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                    <p class="card-text mb-0">
                      NT$1,080 <span class="text-muted "><del>NT$1,200</del></span>
                    </p>
                    <p class="text-muted mt-3"></p>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="card border-0 mb-4 position-relative position-relative">
                  <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
                  <a href="#" class="text-dark">
                  </a>
                  <div class="card-body p-0">
                    <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                    <p class="card-text mb-0">
                      NT$1,080 <span class="text-muted "><del>NT$1,200</del></span>
                    </p>
                    <p class="text-muted mt-3"></p>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="card border-0 mb-4 position-relative position-relative">
                  <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
                  <a href="#" class="text-dark">
                  </a>
                  <div class="card-body p-0">
                    <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                    <p class="card-text mb-0">
                      NT$1,080 <span class="text-muted "><del>NT$1,200</del></span>
                    </p>
                    <p class="text-muted mt-3"></p>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="card border-0 mb-4 position-relative position-relative">
                  <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
                  <a href="#" class="text-dark">
                  </a>
                  <div class="card-body p-0">
                    <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                    <p class="card-text mb-0">
                      NT$1,080 <span class="text-muted "><del>NT$1,200</del></span>
                    </p>
                    <p class="text-muted mt-3"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="text-right mt-4">
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
            <select class="form-control" v-model="item.quantity" @change="editItemQuantity(item)">
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
    </div> -->
  </div>
</template>

<script>
export default {
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
        if (this.cart.length === 0) {
          this.$router.replace('/');
        }
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    addItemQuantity(item) {
      return item.quantity < 10 && this.editItemQuantity(item, 1);
    },
    minusItemQuantity(item) {
      return item.quantity > 1 && this.editItemQuantity(item, -1);
    },
    editItemQuantity(item, quantity) {
      this.isLoading = true;
      this.axios.patch(this.apiInfo.forCart, {
        product: item.product.id,
        quantity: item.quantity + quantity,
      }).then(() => {
        this.$bus.$emit('addProductToCart', { id: item.product.id, quantity });
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
        this.$bus.$emit('removeProductFromCart', item.product.id);
        this.getCart();
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
  },
};
</script>

<style lang="scss">
</style>
