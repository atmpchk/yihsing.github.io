<template>
  <div id="coupon">
    <div class="position-relative d-flex align-items-center justify-content-center"
      style="min-height: calc(100vh - 4rem);"
    >
      <div class="position-absolute jumbotron-img"></div>
      <div class="border-top border-bottom">
        <div class="mt-5 mr-6 mb-5 ml-6">
          <h3 class="text-center mb-3">慶祝 20 20 雙十</h3>
          <p class="text-center mb-3">即日起到 2020.10.10 止享有八折專屬折扣</p>
          <p class="text-center mb-3">不限金額以及購物次數</p>
          <p class="text-center mb-3">結帳時請輸入</p>
          <p class="text-center mb-3"><span class="brand-font">2020</span></p>
          <p class="text-center mb-3"><i class="fas fa-heart"></i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbotron-img {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9lkw3NZPCM09C05IruMP7z7AeuYRhImFry8QFtjOzljjeTMo92kGrCu6GSe4ijurmxDxI4hZOj9r0ftiljsBaWufPpvUYNyLuExnwX8KvrVGKqyzbjIKaoTjrhnUDLgE.png);
  background-position: center center;
  opacity: 0.15;
}

.brand-font {
  font-family: 'Great Vibes', cursive;
  font-size: 1.5em;
}
</style>
