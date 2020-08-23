<template>
  <div id="storages" class="container">
    <loading :active.sync="isLoading"
      :is-full-page="isFullPageLoading">
    </loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120" class="text-center">編號</th>
          <th class="text-center">圖片預覽</th>
          <th width="120" class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in storages" :key="item.id">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">
            <img :src="item.path" width="100px">
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-danger btn-sm"
                @click="openStorageRemoverModal(addSequenceNumberToItem(item, index))">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <remover ref="storageRemover"
      @set-loading="setLoading"
      @refresh-content="getStorages"
      :api="apiInfo.forStorage"
      :item-general-name="'圖片'">
    </remover>
    <pagination ref="pagination"
      @refresh-content="getStorages"
      :pagination="pagination">
    </pagination>
  </div>
</template>

<script>
import Remover from '@/components/Remover.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Remover,
    Pagination,
  },
  data() {
    return {
      apiInfo: {
        forStorage: '/admin/storage',
      },
      storages: [],
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
    };
  },
  mounted() {
    this.getStorages();
  },
  methods: {
    givePage(page) {
      if (page) return page;
      return this.pagination.current_page || 1;
    },
    getStorages(page) {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forStorage}?page=${this.givePage(page)}`).then((result) => {
        this.storages = result.data.data;
        this.pagination = result.data.meta.pagination;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    openStorageRemoverModal(item) {
      this.$refs.storageRemover.setToBeDeleteItem(item);

      $('#removerModal').modal('show');
    },
    addSequenceNumberToItem(item, index) {
      return { title: `編號${index + 1}`, ...item };
    },
    setLoading(toggle) {
      this.isLoading = toggle;
    },
  },
};
</script>

<style lang="scss">
</style>
