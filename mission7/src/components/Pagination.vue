<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': isPreviousNotAvailable }">
        <a class="page-link"
          href="#"
          @click.prevent="goToPage(currentPage - 1)"
          aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item"
        :class="{ 'active': isCurrentPageMatch(n) }"
        v-for="n in totalPages"
        :key="'page' + n">
        <a class="page-link"
          href="#"
          @click.prevent="goToPage(n)">
          {{ n }} <span v-if="isCurrentPageMatch(n)" class="sr-only">(current)</span>
        </a>
      </li>
      <li class="page-item" :class="{ 'disabled': isNextNotAvailable }">
        <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination'],
  computed: {
    totalPages() {
      return this.pagination.total_pages || 0;
    },
    currentPage() {
      return this.pagination.current_page || 0;
    },
    isCurrentPageMatch() {
      return (anotherPage) => this.currentPage === anotherPage;
    },
    isPreviousNotAvailable() {
      return this.currentPage === 0 || this.currentPage === 1;
    },
    isNextNotAvailable() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    goToPage(page) {
      this.$emit('refresh-content', page);
    },
  },
};
</script>
