<template>
  <div>
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">產品列表</router-link> |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/checkOut">結帳</router-link> |
      <router-link to="/checkOutFinished">結帳完成</router-link> |
      <router-link to="/about">關於我們</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Attraction',
};
</script>
