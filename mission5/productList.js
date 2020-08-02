new Vue({
  el: '#app',
  data: {
    apiInfo: {
      UUID: '840d218c-ef17-4e49-90d3-cfef6170a5e5',
      token: '',
      forProductList: '/ec/products'
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
    this.getProductList()
  },
  methods: {
    getProductList (page) {
      if (!page) {
        page = this.pagination.current_page || 1
      }
      this.isLoading = true
      axios.get(`${this.apiInfo.forProductList}?page=${page}`).then((result) => {
        this.products = result.data.data
        this.pagination = result.data.meta.pagination
        this.isLoading = false
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      })
    },
    onCancelLoading () {
      console.log('User cancelled the loader.')
    }
  }
})