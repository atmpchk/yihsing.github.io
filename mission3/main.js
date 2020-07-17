new Vue({
  el: '#app',
  data: {
    mode: {
      new: 0,
      edit: 1
    },
    modalMode: 0,
    cleanData: {
      id: 0,
      title: '',
      category: '',
      content: '',
      description: '',
      imageUrl: '',
      enabled: true,
      originPrice: 0,
      price: 0,
      unit: '',
      options: {
        stars: 0
      }
    },
    formData: {
      id: 0,
      title: '',
      category: '',
      content: '',
      description: '',
      imageUrl: '',
      enabled: true,
      originPrice: 0,
      price: 0,
      unit: '',
      options: {
        stars: 0
      }
    },
    products: [
      {
        id: 1586934917210,
        title: '靜謐幽谷',
        category: '心靈',
        content: `你是否，也有許多不為人知的一面？
          願意分享？抑或無法言語？`,
        description: '幽谷像是表現出每個人的心裏不為人知的一面',
        imageUrl: 'https://images.unsplash.com/photo-1594672011116-298182da5f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80',
        enabled: true,
        originPrice: 50000,
        price: 100000,
        unit: '帖',
        options: {
          stars: 5
        }
      }
    ],
    toBeDeleteItem: {}
  },
  methods: {
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
      this.clearFormData()
    },
    prepareEditProduct (item) {
      this.modalMode = this.mode.edit
      this.formData = JSON.parse(JSON.stringify(item))
    },
    submitProduct () {
      $('#productModal').modal('hide')

      if (this.modalMode === this.mode.new) {
        this.newProduct()
      } else {
        this.editProduct()
      }
      this.clearFormData()
    },
    newProduct () {
      this.products.push(Object.assign(this.formData, {
        id: Date.now()
      }))
    },
    editProduct () {
      const index = this.products.findIndex(product => product.id === this.formData.id)
      this.products[index] = this.formData
    },
    clearFormData () {
      this.formData = JSON.parse(JSON.stringify(this.cleanData))
    },
    openDeleteModal (item) {
      this.toBeDeleteItem = item

      $('#deleteModal').modal('show')
    },
    deleteProduct () {
      const index = this.products.findIndex(product => product.id === this.toBeDeleteItem.id)
      this.products.splice(index, 1)

      $('#deleteModal').modal('hide')
    },
  }
})