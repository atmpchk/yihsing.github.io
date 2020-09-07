<template>
  <div id="checkOut" class="container">
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
  </div>
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
