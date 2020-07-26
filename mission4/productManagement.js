new Vue({
  el: '#app',
  data: {
    apiInfo: {
      UUID: '840d218c-ef17-4e49-90d3-cfef6170a5e5',
      token: ''
    },
    mode: {
      new: 0,
      edit: 1
    },
    modalMode: 0,
    products: [
    ]
  },
  created () {
    this.apiInfo.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchoolToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    if (this.apiInfo.token === '') {
      window.location = 'login.html';
    }
    axios.defaults.baseURL = `https://course-ec-api.hexschool.io/api/${this.apiInfo.UUID}/`
    axios.defaults.headers.common.Authorization = `Bearer ${this.apiInfo.token}`
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    getProductList () {
      axios.get('/admin/ec/products').then((result) => {
        this.products = result.data.data
      })
    },
    openProductModal (action, item) {
      if (action === 'new') {
        this.prepareNewProduct()
      } else {
        this.prepareEditProduct(item)
      }

      $('#productModal').modal('show')
    },
    prepareNewProduct () {
      this.modalMode = this.mode.new
      this.$refs.productEditor.clearFormData()
    },
    prepareEditProduct (item) {
      this.modalMode = this.mode.edit
      this.$refs.productEditor.prepareProduct(item.id)
    },
    openDeleteModal (item) {
      this.$refs.productRemover.setToBeDeleteProduct(item)

      $('#deleteModal').modal('show')
    }
  }
})