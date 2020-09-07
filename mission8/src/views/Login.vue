<template>
  <div id="login" class="container mt-4">
    <loading :active.sync="isLoading" :is-full-page="isFullPageLoading"></loading>
    <form class="form-sign-in" @submit.prevent="signIn">
      <h3 class="mb-3 font-weight-normal">請先登入</h3>
      <div class="form-group">
        <label for="title" class="sr-only">電子郵件</label>
        <input type="email"
          id="email"
          v-model="formData.email"
          class="form-control"
          placeholder="請輸入電子郵件">
      </div>
      <div class="form-group">
        <label for="title" class="sr-only">密碼</label>
        <input type="password"
          id="password"
          v-model="formData.password"
          class="form-control"
          placeholder="請輸入密碼">
      </div>
      <button type="submit"
        class="btn btn-primary btn-lg btn-block">
        登入
      </button>
    </form>
  </div>
</template>

<script>
import { setDefaultAuthorizationToken } from '@/assets/js/vue/axios';

export default {
  name: 'Login',
  data() {
    return {
      apiInfo: {
        forLogin: `${process.env.VUE_APP_APIPATH}auth/login`,
      },
      formData: {
        email: '',
        password: '',
      },
      isLoading: false,
      isFullPageLoading: true,
    };
  },
  mounted() {
    this.checkTokenAndOptionalRedirect();
  },
  methods: {
    checkTokenAndOptionalRedirect() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchoolToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$router.push('/admin');
      }
    },
    signIn() {
      this.isLoading = true;
      this.axios.post(this.apiInfo.forLogin, this.formData).then((res) => {
        const { token, expired } = res.data;
        document.cookie = `hexSchoolToken=${token};expires=${new Date(expired * 1000)}; path=/`;
        setDefaultAuthorizationToken(token);
        this.$router.push(`${this.$route.query.redirect || '/admin'}`);
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss">
#login {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
}

.form-sign-in {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
