<template>
  <div>
    <div class="container">
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
            <router-link to="/admin/pictures">圖片資源管理</router-link>
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
};
</script>
