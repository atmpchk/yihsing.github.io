Vue.component('product-editor', {
  template: `
  <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="productModal" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-info text-white">
          <h5 class="modal-title">{{ modalMode === mode.new ? '新增產品' : '編輯產品' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group" v-for="n in 5" :key="'imageUrl' + n">
                <label :for="'imageUrl' + n">{{ '圖片網址 ' + n }}</label>
                <input type="text" :id="'imageUrl' + n" v-model="formData.imageUrl[n - 1]" class="form-control" placeholder="請輸入圖片連結">
              </div>

              <div class="form-group">
                <label for="fileUpload">
                  或 上傳圖片
                  <i v-if="fileUploading" class="fas fa-spinner fa-spin"></i>
                </label>
                <input id="fileUpload" ref="file" type="file" class="form-control" @change="uploadFile">
              </div>

              <img class="img-fluid" :src="formData.imageUrl[0]">
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">產品名稱</label>
                <input type="text" id="title" v-model="formData.title" class="form-control" placeholder="請輸入產品名稱">
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" id="category" v-model="formData.category" class="form-control" placeholder="請輸入分類">
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位</label>
                  <input type="text" id="unit" v-model="formData.unit" class="form-control" placeholder="請輸入單位">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input type="number" id="origin_price" v-model="formData.origin_price" class="form-control" placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" id="price" v-model="formData.price" class="form-control" placeholder="請輸入售價">
                </div>
              </div>
              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea id="description" v-model="formData.description" class="form-control" placeholder="請輸入產品描述">
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">產品說明</label>
                <textarea id="content" v-model="formData.content" class="form-control" placeholder="請輸入產品說明">
                </textarea>
              </div>
              <div class="form-group" v-if="formData.options">
                <label for="stars">產品評價</label>
                <input type="number" id="stars" v-model="formData.options.stars" min="0" max="5" class="form-control" placeholder="請輸入評價等級">
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input type="checkbox" id="enabled" class="form-check-input" v-model="formData.enabled">
                  <label for="enabled" class="form-check-label">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="submitProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
  `,
  props: [ 'modalMode' ],
  data () {
    return {
      apiInfo: {
        forSingleProduct: '/admin/ec/product',
        forFileUpload: '/admin/storage'
      },
      mode: {
        new: 0,
        edit: 1
      },
      cleanData: {
        id: 0,
        title: '',
        category: '',
        content: '',
        description: '',
        imageUrl: [],
        enabled: true,
        origin_price: 0,
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
        imageUrl: [],
        enabled: true,
        origin_price: 0,
        price: 0,
        unit: '',
        options: {
          stars: 0
        }
      },
      fileUploading: false
    }
  },
  methods: {
    clearFormData () {
      this.formData = JSON.parse(JSON.stringify(this.cleanData))
    },
    prepareProduct (id) {
      axios.get(`${this.apiInfo.forSingleProduct}/${id}`).then((result) => {
        this.formData = result.data.data
        this.formData.options = JSON.parse(result.data.data.options)
      }).catch((err) => {
        console.log(err)
      })

    },
    submitProduct () {
      if (this.modalMode === this.mode.new) {
        this.newProduct()
      } else {
        this.editProduct()
      }
    },
    newProduct () {
      this.formData.options = JSON.stringify(this.formData.options)
      axios.post(this.apiInfo.forSingleProduct, this.formData).then(() => {
        this.$emit('refresh-product-list')
        this.hideSelf()
      }).catch((err) => {
        console.log(err)
      })
    },
    editProduct () {
      this.formData.options = JSON.stringify(this.formData.options)
      axios.patch(`${this.apiInfo.forSingleProduct}/${this.formData.id}`, this.formData).then(() => {
        this.$emit('refresh-product-list')
        this.hideSelf()
      }).catch((err) => {
        console.log(err)
      })
    },
    hideSelf () {
      $('#productModal').modal('hide')
    },
    uploadFile () {
      if (this.$refs.file.files.length === 0) {
        return
      }

      this.fileUploading = true

      const fileReference = this.$refs.file.files[0]
      const form = new FormData()
      form.append('file', fileReference)
      axios.post(this.apiInfo.forFileUpload, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.fileUploading = false
        if (res.status === 200) {
          this.formData.imageUrl.push(res.data.data.path)
        }
      }).catch(() => {
        console.log('上傳不可超過 2 MB')
        this.fileUploading = false
      })
    }
  }
})
