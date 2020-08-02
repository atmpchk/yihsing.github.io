new Vue({
  el: '#app',
  data: {
    apiInfo: {
      UUID: '840d218c-ef17-4e49-90d3-cfef6170a5e5',
      token: '',
      forProducts: '/ec/products'
    },
    products: [],
    isLoading: false,
    isFullPageLoading: true,
    pagination: {}
  },
  created () {
    axios.defaults.baseURL = `https://course-ec-api.hexschool.io/api/${this.apiInfo.UUID}/`
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts (page) {
      if (!page) {
        page = this.pagination.current_page || 1
      }
      this.isLoading = true
      axios.get(`${this.apiInfo.forProducts}?page=${page}`).then((result) => {
        this.products = result.data.data
        this.pagination = result.data.meta.pagination
        this.isLoading = false
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