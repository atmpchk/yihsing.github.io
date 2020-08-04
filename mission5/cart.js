new Vue({
  el: '#app',
  data: {
    apiInfo: {
      UUID: '840d218c-ef17-4e49-90d3-cfef6170a5e5',
      token: '',
      forCart: '/ec/shopping'
    },
    cart: [],
    isLoading: false,
    isFullPageLoading: true,
    pagination: {}
  },
  computed: {
    priceSummary () {
      return this.cart.reduce((accumulated, currItem) => {
        return accumulated + (currItem.product.price * currItem.quantity)
      }, 0)
    }
  },
  created () {
    axios.defaults.baseURL = `https://course-ec-api.hexschool.io/api/${this.apiInfo.UUID}/`
  },
  mounted () {
    this.getCart()
  },
  methods: {
    getCart (page) {
      if (!page) {
        page = this.pagination.current_page || 1
      }
      this.isLoading = true
      axios.get(`${this.apiInfo.forCart}?page=${page}`).then((result) => {
        this.cart = result.data.data
        this.pagination = result.data.meta.pagination
        this.isLoading = false
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      })
    },
    editItemAmount (item) {
      this.isLoading = true
      axios.patch(this.apiInfo.forCart, {
        product: item.product.id,
        quantity: item.quantity
      }).then((result) => {
        this.isLoading = false
        this.getCart()
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      })
    },
    deleteItem (item) {
      this.isLoading = true
      axios.delete(`${this.apiInfo.forCart}/${item.product.id}`).then((result) => {
        this.isLoading = false
        this.getCart()
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      })
    },
    openDeleteCartModal () {
      $('#cartRemoverModal').modal('show')
    },
    viewProducts () {
      window.location = 'products.html'
    },
    viewCheckOut () {
      window.location = 'checkOut.html'
    },
    setLoading (isLoading) {
      this.isLoading = isLoading
    }
  }
})