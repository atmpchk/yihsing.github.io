new Vue({
  el: '#app',
  data: {
    title: 'hello from Vue',
    products: [
      {
        id: 1586934917210,
        title: 'string',
        category: 'string',
        content: 'string',
        description: 'string',
        imageUrl: 'string',
        enabled: true,
        originPrice: 123,
        price: 234,
        unit: 'string'
      }
    ]
  },
  methods: {
    openModal () {
      $('#productModal').modal('show')
    }
  }
})