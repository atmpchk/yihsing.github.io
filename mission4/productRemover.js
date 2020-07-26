Vue.component('product-remover', {
  template: `
  <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除產品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          確認刪除
          <strong>{{ toBeDeleteProduct.title }}</strong>
          此項產品？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
  `,
  data () {
    return {
      toBeDeleteProduct: {}
    }
  },
  methods: {
    setToBeDeleteProduct (product) {
      this.toBeDeleteProduct = product
    },
    deleteProduct () {
      axios.delete(`/admin/ec/product/${this.toBeDeleteProduct.id}`).then(() => {
        this.$emit('refresh-product-list')
        this.hideSelf()
      }).catch((err) => {
        console.log(err)
      })
    },
    hideSelf () {
      $('#deleteModal').modal('hide')
    }
  }
})