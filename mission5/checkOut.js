Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)

new Vue({
  el: '#app',
  data: {
    apiInfo: {
      UUID: '840d218c-ef17-4e49-90d3-cfef6170a5e5',
      token: '',
      forOrder: '/ec/orders'
    },
    cart: [],
    paymentMethods: [
      'WebATM', 'ATM', 'CVS', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'
    ],
    formData: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: 'Credit',
      message: ''
    },
    isLoading: false,
    isFullPageLoading: true,
    pagination: {}
  },
  computed: {
  },
  created () {
    axios.defaults.baseURL = `https://course-ec-api.hexschool.io/api/${this.apiInfo.UUID}/`
  },
  mounted () {
  },
  methods: {
    submitForm () {
      this.isLoading = true
      axios.post(this.apiInfo.forOrder, this.formData).then((result) => {
        this.isLoading = false
        $('#checkOutFinishedModal').modal('show')
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      })
    },
    viewCart () {
      window.location = 'cart.html'
    }
  }
})