<template>
  <div>
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/attraction/Header.vue';
import AppFooter from '@/components/attraction/Footer.vue';

export default {
  name: 'Attraction',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
