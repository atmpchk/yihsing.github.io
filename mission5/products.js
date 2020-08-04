new Vue({
  el: '#app',
  data: {
    apiInfo: {
      UUID: '840d218c-ef17-4e49-90d3-cfef6170a5e5',
      token: '',
      forCart: '/ec/shopping',
      forProducts: '/ec/products'
    },
    productIdsInCart: [],
    products: [],
    isLoading: false,
    isFullPageLoading: true,
    pagination: {}
  },
  computed: {
    isInCart () {
      return (product) => {
        return this.productIdsInCart.includes(product.id)
      }
    }
  },
  created () {
    axios.defaults.baseURL = `https://course-ec-api.hexschool.io/api/${this.apiInfo.UUID}/`
  },
  mounted () {
    this.getProductIdsInCart()
    this.getProducts()
  },
  methods: {
    getProductIdsInCart (page) {
      if (!page) {
        page = this.pagination.current_page || 1
      }
      this.isLoading = true
      axios.get(`${this.apiInfo.forCart}?page=${page}`).then((result) => {
        this.productIdsInCart = result.data.data.map(item => item.product.id)
        this.isLoading = false
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      })
    },
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
    putToCart (id) {
      this.productIdsInCart.push(id)
    },
    viewCart () {
      window.location = 'cart.html'
    }
  }
})