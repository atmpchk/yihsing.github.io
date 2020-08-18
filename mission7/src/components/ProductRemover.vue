<template>
  <div id="productRemoverModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="productRemoverModal"
    aria-hidden="true">
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
</template>

<script>
export default {
  data() {
    return {
      apiInfo: {
        forSingleProduct: '/admin/ec/product',
      },
      toBeDeleteProduct: {},
    };
  },
  methods: {
    setToBeDeleteProduct(product) {
      this.toBeDeleteProduct = product;
    },
    deleteProduct() {
      this.$emit('set-loading', true);
      this.axios.delete(`${this.apiInfo.forSingleProduct}/${this.toBeDeleteProduct.id}`).then(() => {
        this.$emit('set-loading', false);
        this.$emit('refresh-content');
        this.hideSelf();
      }).catch((err) => {
        this.$emit('set-loading', false);
        console.log(err);
      });
    },
    hideSelf() {
      $('#productRemoverModal').modal('hide');
    },
  },
};
</script>
