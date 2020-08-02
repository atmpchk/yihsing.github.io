Vue.component('product', {
  template: `
  <div class="card border-0 shadow-sm">
    <img :src="product.imageUrl[0]" class="card-img-top">
    <div class="card-body">
      <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.content }}</p>
      <p class="card-text text-right">{{ product.price | formatCurrency }}</p>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-around row">
        <button type="button" class="col-5 btn btn-outline-secondary btn-sm">詳細資訊</button>
        <button type="button" class="col-5 btn btn-outline-primary btn-sm">加入購物車</button>
      </div>
    </div>
  </div>
  `,
  props: [ 'product' ],
  computed: {
  },
  methods: {
  }
})
