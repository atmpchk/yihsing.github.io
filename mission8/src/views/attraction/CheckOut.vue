<template>
  <div id="checkOut" class="container">
    <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="font-weight-bold mb-4 pt-3">訂單填寫</h3>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-center pb-5">
      <div class="col-md-4">
        <div class="border p-4 mb-4">
          <div class="d-flex"
            v-for="(item, index) in cart"
            :key="'item' + index"
            :class="{ 'mt-2': index > 0 }"
          >
            <img :src="item.product.imageUrl[0]"
              alt=""
              class="mr-2"
              style="width: 48px; height: 48px; object-fit: cover"
            >
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 font-weight-bold">{{ item.product.title }}</p>
                <p class="mb-0">{{ item.product.price | formatCurrency }}</p>
              </div>
              <p class="mb-0 font-weight-bold">{{ `x${item.quantity}` }}</p>
            </div>
          </div>
          <table class="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                <td class="text-right border-0 px-0 pt-4">{{ priceSummary | formatCurrency }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">付款方式</th>
                <td class="text-right border-0 px-0 pt-0 pb-4">{{ formData.payment }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">總計</p>
            <p class="mb-0 h4 font-weight-bold">{{ priceSummary | formatCurrency }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <validation-observer v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(submitForm)">
            <p>聯絡資訊</p>
            <div class="form-group mb-0">
              <validation-provider rules="required|email" v-slot="{ errors, classes }">
                <label for="email">電子郵件</label>
                <input type="email"
                  id="email"
                  v-model="formData.email"
                  class="form-control"
                  placeholder="example@gmail.com"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <p class="mt-4">運送地址</p>
            <div class="form-group mb-2">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="name" class="text-muted mb-0">收件人姓名</label>
                <input type="text"
                  id="name"
                  v-model="formData.name"
                  class="form-control"
                  placeholder="請輸入收件人姓名"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="tel" class="text-muted mb-0">聯絡電話</label>
                <input type="tel"
                  id="tel"
                  v-model="formData.tel"
                  class="form-control"
                  placeholder="請輸入聯絡電話"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="address" class="text-muted mb-0">收件人地址</label>
                <input type="text"
                  id="address"
                  v-model="formData.address"
                  class="form-control"
                  placeholder="請輸入收件人地址"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <label for="message" class="text-muted mb-0">備註</label>
              <textarea id="message"
                v-model="formData.message"
                class="form-control"
                rows="3"
                placeholder="請留下額外想說的話..."
              >
              </textarea>
            </div>
            <div class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between
              align-items-md-center align-items-end w-100"
            >
              <router-link to="/cart" class="text-dark mt-md-0 mt-3">
                <i class="fas fa-chevron-left mr-2"></i> 購物清單
              </router-link>
              <button type="submit" class="btn btn-dark py-3 px-7" :disabled="invalid">送出訂單</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>

  <!-- <div id="checkOut" class="container">
    <div class="row justify-content-center my-4">
      <div class="col-md-6">
        <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
        <validation-observer v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(submitForm)">
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="name">收件人姓名</label>
                <input type="text"
                  id="name"
                  v-model="formData.name"
                  class="form-control"
                  placeholder="請輸入收件人姓名"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required|email" v-slot="{ errors, classes }">
                <label for="email">E-mail</label>
                <input type="email"
                  id="email"
                  v-model="formData.email"
                  class="form-control"
                  placeholder="請輸入E-mail"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="tel">電話</label>
                <input type="tel"
                  id="tel"
                  v-model="formData.tel"
                  class="form-control"
                  placeholder="請輸入電話"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="address">地址</label>
                <input type="text"
                  id="address"
                  v-model="formData.address"
                  class="form-control"
                  placeholder="請輸入地址"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <label for="payment">付款方式</label>
              <select id="payment" v-model="formData.payment" class="form-control">
                <option v-for="payment in paymentMethods"
                  :key="payment"
                  :value="payment">
                  {{ payment }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">備註</label>
              <textarea id="message"
                v-model="formData.message"
                  class="form-control"
                  placeholder="請留下額外想說的話">
              </textarea>
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-primary" :disabled="invalid">送出訂單</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-12">
        <router-link to="/cart">&#x25C1; 回到購物車</router-link>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      apiInfo: {
        forCart: '/ec/shopping',
        forOrder: '/ec/orders',
      },
      cart: [],
      paymentMethods: [
        'WebATM', 'ATM', 'CVS', 'Barcode', 'Credit', 'ApplePay', 'GooglePay',
      ],
      formData: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: 'Credit',
        message: '',
      },
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
  created() {
    const payment = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchoolPayment\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (payment) {
      this.formData.payment = payment;
    }
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
    submitForm() {
      this.isLoading = true;
      this.axios.post(this.apiInfo.forOrder, this.formData).then(() => {
        this.isLoading = false;
        this.$bus.$emit('resetCart');
        this.$router.push('/checkOutFinished');
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss">
</style>
