<template>
  <div id="coupons" class="container">
    <loading :active.sync="isLoading"
      :is-full-page="isFullPageLoading">
    </loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal('new')">
        建立新的優惠卷
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="text-center">名稱</th>
          <th width="120" class="text-center">代碼</th>
          <th width="120" class="text-center">折扣 %</th>
          <th width="100" class="text-center">是否開放</th>
          <th width="120" class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center">{{ item.code }}</td>
          <td class="text-center">{{ item.percent }}</td>
          <td class="text-center">
            <span v-if="item.enabled" class="text-success">已開放</span>
            <span v-else>未開放</span>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                @click="openCouponModal('edit', item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm"
                @click="openCouponRemoverModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <coupon-editor ref="couponEditor"
      @set-loading="setLoading"
      @refresh-content="getCoupons"
      :modal-mode="modalMode">
    </coupon-editor>
    <remover ref="couponRemover"
      @set-loading="setLoading"
      @refresh-content="getCoupons"
      :api="apiInfo.forSingleCoupon"
      :item-general-name="'優惠券'">
    </remover>
    <pagination ref="pagination"
      @refresh-content="getCoupons"
      :pagination="pagination">
    </pagination>
  </div>
</template>

<script>
import CouponEditor from '@/components/CouponEditor.vue';
import Remover from '@/components/Remover.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    CouponEditor,
    Remover,
    Pagination,
  },
  data() {
    return {
      apiInfo: {
        forCoupons: '/admin/ec/coupons',
        forSingleCoupon: '/admin/ec/coupon',
      },
      mode: {
        new: 0,
        edit: 1,
      },
      modalMode: 0,
      coupons: [],
      isLoading: false,
      isFullPageLoading: true,
      pagination: {},
    };
  },
  mounted() {
    this.getCoupons();
  },
  methods: {
    givePage(page) {
      if (page) return page;
      return this.pagination.current_page || 1;
    },
    getCoupons(page) {
      this.isLoading = true;
      this.axios.get(`${this.apiInfo.forCoupons}?page=${this.givePage(page)}`).then((result) => {
        this.coupons = result.data.data;
        this.pagination = result.data.meta.pagination;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
    openCouponModal(action, item) {
      if (action === 'new') {
        this.prepareNewCoupon();
      } else {
        this.prepareEditCoupon(item);
      }
    },
    prepareNewCoupon() {
      this.modalMode = this.mode.new;
      this.$refs.couponEditor.clearFormData();

      $('#couponModal').modal('show');
    },
    async prepareEditCoupon(item) {
      this.modalMode = this.mode.edit;
      this.isLoading = true;
      await this.$refs.couponEditor.prepareCoupon(item.id);
      this.isLoading = false;
      $('#couponModal').modal('show');
    },
    openCouponRemoverModal(item) {
      this.$refs.couponRemover.setToBeDeleteItem(item);

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
