<template>
  <div class="position-relative">
    <div class="position-absolute" style="top:0; bottom:0; left:0; right:0; background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
    background-position: center center; opacity: 0.1;"></div>
    <div class="container d-flex flex-column" style="min-height: 100vh;">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link to="/" class="navbar-brand">
          Chocolate
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
            </router-link>
          </div>
        </div>
      </nav>
      <div class="row justify-content-center my-auto">
        <div class="col-md-4 text-center">
          <h2>Lorem ipsum.</h2>
          <p class="text-muted mb-0">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
          </p>
          <button class="btn btn-dark rounded-0 mt-6">Lorem ipsum.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>
