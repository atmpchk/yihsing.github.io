<template>
  <div id="orders" class="container">
    <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120" class="text-center">下單時間</th>
          <th class="text-center">購買項目</th>
          <th width="120" class="text-center">付款方式</th>
          <th width="120" class="text-center">應付款項</th>
          <th width="120" class="text-center">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orders" :key="item.id">
          <td class="text-center">{{ item.created.datetime }}</td>
          <td class="text-center">
            <span v-for="(content, index) in item.products" :key="'idx' + index">
              {{ `${content.product.title} X ${content.quantity} ${content.product.unit}` }}<br>
            </span>
          </td>
          <td class="text-center">{{ item.payment }}</td>
          <td class="text-right">{{ item.amount | formatCurrency }}</td>
          <td class="text-center">
            <div class="custom-control custom-switch">
              <input type="checkbox"
                class="custom-control-input"
                :id="`paid${index}`"
                v-model="item.paid"
                @change="togglePaid(item)">
              <label class="custom-control-label" :for="`paid${index}`">
                <span v-if="item.paid" class="text-success">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination ref="pagination"
      @refresh-content="getOrders"
      :pagination="pagination">
    </pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    // OrderEditor,
    Pagination,
  },
  data() {
    return {
      apiInfo: {
        forOrders: '/admin/ec/orders',
      },
      mode: {
        new: 0,
        edit: 1,
      },
      modalMode: 0,
      orders: [],
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    givePage(page) {
      if (page) return page;
      return this.pagination.current_page || 1;
    },
    getOrders(page) {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forOrders}?page=${this.givePage(page)}&paged=10`).then((result) => {
        this.orders = result.data.data;
        this.pagination = result.data.meta.pagination;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    openOrderModal(action, item) {
      if (action === 'new') {
        this.prepareNewOrder();
      } else {
        this.prepareEditOrder(item);
      }
    },
    prepareNewOrder() {
      this.modalMode = this.mode.new;
      this.$refs.orderEditor.clearFormData();

      $('#orderModal').modal('show');
    },
    async prepareEditOrder(item) {
      this.modalMode = this.mode.edit;
      this.isLoading = true;
      await this.$refs.orderEditor.prepareOrder(item.id);
      this.isLoading = false;
      $('#orderModal').modal('show');
    },
    togglePaid(item) {
      this.isLoading = true;
      this.axios.patch(`${this.apiInfo.forOrders}/${item.id}/${item.paid ? 'paid' : 'unpaid'}`).then(() => {
        this.isLoading = false;
      }).catch((err) => {
        this.orders.find((order) => order.id === item.id).paid = !item.paid;
        console.log(err);
        this.isLoading = false;
      });
    },
    openRemoverModal(item) {
      this.$refs.orderRemover.setToBeDeleteItem(item);

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
