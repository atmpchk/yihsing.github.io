<template>
  <div>
    <div class="position-relative" v-if="$route.path === '/'">
      <div class="position-absolute jumbotron-img"></div>
      <div class="container d-flex flex-column" style="min-height: 100vh;">
        <nav class="navbar navbar-expand-lg navbar-light">
          <router-link to="/" class="navbar-brand">
            Sweety
          </router-link>
          <button class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link to="/" class="nav-item nav-link mr-4" exact>
                首頁 <span class="sr-only">(current)</span>
              </router-link>
              <router-link to="/products" class="nav-item nav-link mr-4">
                產品
              </router-link>
              <router-link to="/cart" class="nav-item nav-link mr-4">
                <i class="fas fa-shopping-cart"></i>
                <div class="badge badge-pill badge-danger cart-badge" v-if="productInCartCount">
                  {{ productInCartCount }}
                </div>
              </router-link>
            </div>
          </div>
        </nav>
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center">
            <h2>就是享要...<br><span class="navbar-brand">Sweety</span></h2>
            <p class="text-muted mb-0">
              只溶於口、不溶於手
            </p>
            <button class="btn btn-dark rounded-0 mt-6" @click="viewProducts">選購產品</button>
          </div>
        </div>
      </div>
    </div>

    <div class="position-relative d-flex" v-else-if="$route.path.endsWith('checkOutFinished')">
      <div class="container d-flex flex-column" style="min-height: 100vh;">
        <nav class="navbar navbar-expand-lg navbar-light px-0">
          <router-link to="/" class="navbar-brand">
            Sweety
          </router-link>
        </nav>
        <div class="row my-auto pb-7">
          <div class="col-md-4 d-flex flex-column">
            <div class="my-auto">
              <h2>訂購完成</h2>
              <p>已送出您的訂購單，歡迎您再次選購，謝謝！</p>
              <router-link to="/" class="btn btn-dark mt-4 px-5" exact>回到首頁</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="w-md-50 w-100 position-absolute opacity-1 checkout-finished-img">
      </div>
    </div>

    <div class="container" v-else-if="$route.path.includes('checkOut')">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <nav class="navbar navbar-expand-lg navbar-light px-0">
            <router-link to="/" class="navbar-brand">
              Sweety
            </router-link>
            <ul class="list-unstyled mb-0 ml-md-auto d-flex align-items-center
              justify-content-between justify-content-md-end w-100 mt-md-0 mt-4"
            >
              <li class="mr-md-6 mr-3 position-relative custom-step-line">
                <i class="fas fa-check-circle d-md-inline d-block text-center">
                </i> <span class="text-nowrap">購物清單</span>
              </li>
              <li class="mr-md-6 mr-3 position-relative custom-step-line">
                <i class="fas fa-check-circle d-md-inline d-block text-center">
                </i> <span class="text-nowrap">訂單填寫</span>
              </li>
              <li>
                <i class="fas fa-dot-circle d-md-inline d-block text-center">
                </i> <span class="text-nowrap">訂單完成</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="container" v-else>
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link to="/" class="navbar-brand">
          Sweety
        </router-link>
        <button class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link mr-4" exact>
              首頁 <span class="sr-only">(current)</span>
            </router-link>
            <router-link to="/products" class="nav-item nav-link mr-4">
              產品
            </router-link>
            <router-link to="/cart" class="nav-item nav-link mr-4">
              <i class="fas fa-shopping-cart"></i>
              <div class="badge badge-pill badge-danger cart-badge" v-if="productInCartCount">
                {{ productInCartCount }}
              </div>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      productInCartCount: 0,
    };
  },
  created() {
    this.$bus.$on('productInCartCount', (count) => {
      this.productInCartCount = count;
    });
  },
  beforeDestroy() {
    this.$bus.$off('productInCartCount');
  },
  methods: {
    viewProducts() {
      this.$router.push('/products');
    },
  },
};
</script>

<style lang="scss" scoped>
.jumbotron-img {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9lkw3NZPCM09C05IruMP7z7AeuYRhImFry8QFtjOzljjeTMo92kGrCu6GSe4ijurmxDxI4hZOj9r0ftiljsBaWufPpvUYNyLuExnwX8KvrVGKqyzbjIKaoTjrhnUDLgE.png);
  background-position: center center;
  opacity: 0.15;
}

.cart-badge {
  display: inline-block;
  font-size: 0.6em;
  margin-top: 0em;
  margin-left: -0.4em;
  position: absolute;
}

.checkout-finished-img {
  z-index: -1;
  min-height: 100vh;
  right: 0;
  background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9lkw3NZPCM09C05IruMP7z7AeuYRhImFry8QFtjOzljjeTMo92kGrCu6GSe4ijurmxDxI4hZOj9r0ftiljsBaWufPpvUYNyLuExnwX8KvrVGKqyzbjIKaoTjrhnUDLgE.png);
  background-position: center center;
}
</style>
