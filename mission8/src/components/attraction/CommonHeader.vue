<template>
  <div class="container">
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
            <div class="badge badge-pill badge-danger cart-badge">9</div>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
};
</script>

<style lang="scss" scoped>
</style>
