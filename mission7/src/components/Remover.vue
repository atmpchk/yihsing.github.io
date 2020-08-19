<template>
  <div id="removerModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="removerModal"
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
          <strong>{{ toBeDeleteItem.title }}</strong>
          此項產品？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="deleteItem">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['api'],
  data() {
    return {
      toBeDeleteItem: {},
    };
  },
  methods: {
    setToBeDeleteItem(item) {
      this.toBeDeleteItem = item;
    },
    deleteItem() {
      this.$emit('set-loading', true);
      this.axios.delete(`${this.api}/${this.toBeDeleteItem.id}`).then(() => {
        this.$emit('set-loading', false);
        this.$emit('refresh-content');
        this.hideSelf();
      }).catch((err) => {
        this.$emit('set-loading', false);
        console.log(err);
      });
    },
    hideSelf() {
      $('#removerModal').modal('hide');
    },
  },
};
</script>
