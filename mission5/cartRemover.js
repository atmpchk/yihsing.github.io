Vue.component('cart-remover', {
  template: `
  <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除整份購物清單</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <strong>確認要刪除整份購物清單？</strong>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="deleteCart">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
  `,
  data () {
    return {
      apiInfo: {
        forEntireCart: '/ec/shopping/all/product'
      }
    }
  },
  methods: {
    deleteCart () {
      this.$emit('set-loading', true)
      axios.delete(this.apiInfo.forEntireCart).then(() => {
        this.$emit('refresh-cart')
        this.hideSelf()
        window.location = 'products.html'
      }).catch((err) => {
        this.$emit('set-loading', false)
        console.log(err)
      })
    },
    hideSelf () {
      $('#deleteModal').modal('hide')
    }
  }
})