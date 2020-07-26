new Vue({
  el: '#app',
  data: {
    api: {
      url: 'https://course-ec-api.hexschool.io/api/auth/login'
    },
    formData: {
      email: '',
      password: ''
    }
  },
  mounted () {
    this.checkTokenAndOptionalRedirect()
  },
  methods: {
    checkTokenAndOptionalRedirect () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchoolToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      if (token) {
        window.location = 'productManagement.html'
      }
    },
    signIn () {
      axios.post(this.api.url, this.formData).then((res) => {
        const token = res.data.token
        const expired = res.data.expired
        document.cookie = `hexSchoolToken=${token};expires=${new Date(expired * 1000)}; path=/`
        window.location = 'productManagement.html'
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})