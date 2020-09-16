<template>
  <div id="checkOut" class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="font-weight-bold mb-4 pt-3">訂單填寫</h3>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-center pb-5">
      <div class="col-md-4">
        <div class="border p-4 mb-4">
          <div class="d-flex">
            <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="mr-2" style="width: 48px; height: 48px; object-fit: cover">
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 font-weight-bold">Lorem ipsum</p>
                <p class="mb-0">NT$12,000</p>
              </div>
              <p class="mb-0 font-weight-bold">x1</p>
            </div>
          </div>
          <div class="d-flex mt-2">
            <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="mr-2" style="width: 48px; height: 48px; object-fit: cover">
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 font-weight-bold">Lorem ipsum</p>
                <p class="mb-0">NT$12,000</p>
              </div>
              <p class="mb-0 font-weight-bold">x1</p>
            </div>
          </div>
          <table class="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                <td class="text-right border-0 px-0 pt-4">NT$24,000</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                <td class="text-right border-0 px-0 pt-0 pb-4">ApplePay</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">Total</p>
            <p class="mb-0 h4 font-weight-bold">NT$24,000</p>
          </div>
        </div>
      </div>
      <validation-observer v-slot="{ invalid, handleSubmit }" class="col-md-6">
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
        </form>
        <div class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between
          align-items-md-center align-items-end w-100"
        >
          <router-link to="/cart" class="text-dark mt-md-0 mt-3">
            <i class="fas fa-chevron-left mr-2"></i> 購物清單
          </router-link>
          <button type="submit" class="btn btn-dark py-3 px-7" :disabled="invalid">送出訂單</button>
        </div>
      </validation-observer>
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
  methods: {
    submitForm() {
      this.isLoading = true;
      this.axios.post(this.apiInfo.forOrder, this.formData).then(() => {
        this.isLoading = false;
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
