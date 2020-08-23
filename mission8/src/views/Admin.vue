<template>
  <div>
    <div class="container">
      <loading :active.sync="isLoading"
        :is-full-page="isFullPageLoading">
      </loading>
      <div class="row">
        <div class="col-md-3">
          <div id="nav">
            <router-link to="/">回到前台</router-link>
          </div>
        </div>
        <div class="col-md-6">
          <div id="nav">
            <router-link to="/admin/">首頁</router-link> |
            <router-link to="/admin/products">產品管理</router-link> |
            <router-link to="/admin/orders">訂單管理</router-link> |
            <router-link to="/admin/coupons">優惠券管理</router-link> |
            <router-link to="/admin/storages">圖片資源管理</router-link> |
            <a href="#" @click.prevent="logout">登出</a>
          </div>
        </div>
        <div class="col-md-3">
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      apiInfo: {
        forAuthCheck: `${process.env.VUE_APP_APIPATH}auth/check`,
        forLogout: `${process.env.VUE_APP_APIPATH}auth/logout`,
      },
      isLoading: false,
      isFullPageLoading: true,
    };
  },
  created() {
    this.setTimeoutContinuously('hexAuthCheck', this.checkAuthToken, 15000, this.checkAuthTokenFailed);
  },
  beforeDestroy() {
    window.clearTimeout(document.hexAuthCheck);
  },
  methods: {
    findToken() {
      return document.cookie.replace(/(?:(?:^|.*;\s*)hexSchoolToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    },
    async setTimeoutContinuously(refName, fn, timeout, failFn) {
      try {
        await fn();
        document[refName] = setTimeout(() => {
          this.setTimeoutContinuously(refName, fn, timeout, failFn);
        }, timeout);
      } catch (err) {
        if (typeof failFn === 'function') {
          failFn();
        }
      }
    },
    resetTokenInCookie() {
      document.cookie = 'hexSchoolToken=;max-age=0; path=/';
    },
    checkAuthToken() {
      return new Promise((resolve, reject) => {
        const token = this.findToken();
        this.axios.post(this.apiInfo.forAuthCheck, { api_token: token }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    checkAuthTokenFailed() {
      this.resetTokenInCookie();
      this.$router.push('/login');
    },
    logout() {
      this.isLoading = true;
      const token = this.findToken();
      this.resetTokenInCookie();
      this.axios.post(this.apiInfo.forLogout, { api_token: token }).then(() => {
        this.isLoading = false;
        this.$router.push('/login');
      }).catch((err) => {
        this.isLoading = false;
        this.$router.push('/login');
        console.log(err);
      });
    },
  },
};
</script>
