<template>
  <div id="couponModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="couponModal"
    aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-info text-white">
          <h5 class="modal-title">{{ modalMode === mode.new ? '新增優惠卷' : '編輯優惠卷' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="title">優惠卷名稱</label>
            <input type="text"
              id="title"
              v-model="formData.title"
              class="form-control"
              placeholder="請輸入優惠卷名稱">
          </div>
          <div class="form-group">
            <label for="code">優惠卷代碼</label>
            <input type="text"
              id="code"
              v-model="formData.code"
              class="form-control"
              placeholder="請輸入優惠卷代碼">
          </div>
          <div class="form-group">
            <label for="percent">折扣 %</label>
            <input type="number"
              id="percent"
              v-model="formData.percent"
              min="30"
              max="95"
              class="form-control"
              placeholder="請輸入優惠卷說明">
          </div>
          <div class="form-group">
            <label for="deadline_date">到期日</label>
            <input type="date"
              id="deadline_date"
              v-model="formData.deadlineDate"
              class="form-control"
              placeholder="請輸入到期日">
          </div>
          <div class="form-group">
            <label for="deadline_time">到期時間</label>
            <input type="time"
              id="deadline_time"
              v-model="formData.deadlineTime"
              step="1"
              class="form-control"
              placeholder="請輸入到期時間">
          </div>
          <div class="form-group">
            <div class="form-check">
              <input type="checkbox"
                id="enabled"
                class="form-check-input"
                v-model="formData.enabled">
              <label for="enabled" class="form-check-label">是否開放</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="submitCoupon">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalMode'],
  data() {
    return {
      apiInfo: {
        forSingleCoupon: '/admin/ec/coupon',
      },
      mode: {
        new: 0,
        edit: 1,
      },
      cleanData: {
        id: 0,
        title: '',
        code: '',
        percent: 80,
        enabled: false,
        deadlineDate: '2020-01-01',
        deadlineTime: '00:00:00',
        deadline: {},
      },
      formData: {
        id: 0,
        title: '',
        code: '',
        percent: 80,
        enabled: false,
        deadlineDate: '2020-01-01',
        deadlineTime: '00:00:00',
        deadline: {},
      },
    };
  },
  methods: {
    clearFormData() {
      this.formData = JSON.parse(JSON.stringify(this.cleanData));
    },
    async prepareCoupon(id) {
      try {
        const result = await this.axios.get(`${this.apiInfo.forSingleCoupon}/${id}`);
        this.formData = result.data.data;
        [this.formData.deadlineDate, this.formData.deadlineTime] = this.formData.deadline.datetime.split(' ');
      } catch (err) {
        console.log(err);
      }
    },
    submitCoupon() {
      if (this.modalMode === this.mode.new) {
        this.newCoupon();
      } else {
        this.editCoupon();
      }
    },
    newCoupon() {
      this.$emit('set-loading', true);
      this.formData.deadline_at = `${this.formData.deadlineDate} ${this.formData.deadlineTime}`;
      this.axios.post(this.apiInfo.forSingleCoupon, this.formData).then(() => {
        this.$emit('set-loading', false);
        this.$emit('refresh-content');
        this.hideSelf();
      }).catch((err) => {
        this.$emit('set-loading', false);
        console.log(err);
      });
    },
    editCoupon() {
      this.$emit('set-loading', true);
      this.formData.deadline_at = `${this.formData.deadlineDate} ${this.formData.deadlineTime}`;
      this.axios.patch(`${this.apiInfo.forSingleCoupon}/${this.formData.id}`, this.formData).then(() => {
        this.$emit('set-loading', false);
        this.$emit('refresh-content');
        this.hideSelf();
      }).catch((err) => {
        this.$emit('set-loading', false);
        console.log(err);
      });
    },
    hideSelf() {
      $('#couponModal').modal('hide');
    },
  },
};
</script>
