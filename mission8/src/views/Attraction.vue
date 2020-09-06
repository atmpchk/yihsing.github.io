<template>
  <div class="h-100 d-flex flex-column">
    <div class="attraction-body">
      <landing-header v-if="$route.path === '/'"></landing-header>
      <common-header v-else></common-header>
      <router-view/>
    </div>
    <app-footer class="flex-shrink-0"></app-footer>
  </div>
</template>

<script>
import LandingHeader from '@/components/attraction/LandingHeader.vue';
import CommonHeader from '@/components/attraction/CommonHeader.vue';
import AppFooter from '@/components/attraction/Footer.vue';

export default {
  name: 'Attraction',
  components: {
    LandingHeader,
    CommonHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
.attraction-body {
  flex: 1 0 auto;
}

.cart-badge {
  display: inline-block;
  font-size: 0.6em;
  margin-top: 0em;
  margin-left: -0.4em;
  position: absolute;
}

</style>
