<template>
  <div id="products" class="container">
    <loading :active.sync="isLoading"
      :is-full-page="isFullPageLoading">
    </loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openProductModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120" class="text-center">分類</th>
          <th class="text-center">產品名稱</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">售價</th>
          <th width="100" class="text-center">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-center">{{ item.category }}</td>
          <td class="text-center">{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td class="text-center">
            <span v-if="item.enabled" class="text-success">已啟用</span>
            <span v-else>未啟用</span>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                @click="openProductModal('edit', item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm"
                @click="openRemoverModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <product-editor ref="productEditor"
      @set-loading="setLoading"
      @refresh-content="getProducts"
      :modal-mode="modalMode">
    </product-editor>
    <remover ref="productRemover"
      @set-loading="setLoading"
      @refresh-content="getProducts">
    </remover>
    <pagination ref="pagination"
      @refresh-content="getProducts"
      :pagination="pagination">
    </pagination>
  </div>
</template>

<script>
import ProductEditor from '@/components/ProductEditor.vue';
import Remover from '@/components/Remover.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductEditor,
    Remover,
    Pagination,
  },
  data() {
    return {
      apiInfo: {
        forProducts: '/admin/ec/products',
      },
      mode: {
        new: 0,
        edit: 1,
      },
      modalMode: 0,
      products: [],
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    givePage(page) {
      if (page) return page;
      return this.pagination.current_page || 1;
    },
    getProducts(page) {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forProducts}?page=${this.givePage(page)}`).then((result) => {
        this.products = result.data.data;
        this.pagination = result.data.meta.pagination;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    openProductModal(action, item) {
      if (action === 'new') {
        this.prepareNewProduct();
      } else {
        this.prepareEditProduct(item);
      }
    },
    prepareNewProduct() {
      this.modalMode = this.mode.new;
      this.$refs.productEditor.clearFormData();

      $('#productModal').modal('show');
    },
    async prepareEditProduct(item) {
      this.modalMode = this.mode.edit;
      this.isLoading = true;
      await this.$refs.productEditor.prepareProduct(item.id);
      this.isLoading = false;
      $('#productModal').modal('show');
    },
    openRemoverModal(item) {
      this.$refs.productRemover.setToBeDeleteItem(item);

      $('#removerModal').modal('show');
    },
    setLoading(toggle) {
      this.isLoading = toggle;
    },
  },
};
</script>

<style lang="scss">
</style>
