<template>
  <div id="checkOutFinished" class="container">
    <div id="checkOutFinishedModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="checkOutFinishedModal"
      aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title">訂購完成</h5>
          </div>
          <div class="modal-body">
            已送出您的訂購單，歡迎您再次選購，謝謝！
          </div>
          <div class="modal-footer">
            <button type="button"
              class="btn btn-default"
              @click="hideSelf">回到產品列表
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    $('#checkOutFinishedModal').on('hide.bs.modal', () => {
      this.viewProducts();
    });
    $('#checkOutFinishedModal').modal('show');
  },
  methods: {
    hideSelf() {
      $('#checkOutFinishedModal').modal('hide');
    },
    viewProducts() {
      this.$router.push('/products');
    },
  },
};
</script>

<style lang="scss">
</style>
