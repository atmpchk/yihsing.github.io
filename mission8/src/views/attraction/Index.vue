<template>
  <div id="index">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 mt-md-4">
          <div class="card border-0 mb-4">
            <div class="responsive-rectangle">
              <img
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/cSYtrAzitF1ra1W4KKyRDbVIVZl8GGQ2kyEnBTSaT12nHZsyttFxbTlezrBtgMUR8teYoygLX79HQeY3FU2tYBAw3bRv0jBdrtFcTMw06wdCHV0HKAOjdkxsO5OOE55x.jpg"
                class="card-img-top rounded-0"
                alt="..."
              />
            </div>
            <div class="card-body text-center">
              <h4>純粹巧克力</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  百分百的純粹、體驗那箇中的滋味、適合忠於原味的您
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-md-4">
          <div class="card border-0 mb-4">
            <div class="responsive-rectangle">
              <img
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/bMpVHmFCpY71yfhgamLHlUozlikTrjOxJs86kji1zJ8wEY11EIuNmLEqfOJLPc5yFzUy0hnd1zsBt2zQfJFp89iskg4WRy7ZjizH95QEU3gVhid18a7JBbGvaUsPbma4.jpg"
                class="card-img-top rounded-0"
                alt="..."
              />
            </div>
            <div class="card-body text-center">
              <h4>牛奶巧克力</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  當純粹巧克力碰上香醇牛奶、美妙的融合一起、教人如何拒絕
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-md-4">
          <div class="card border-0 mb-4">
            <div class="responsive-rectangle">
              <img
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/8QpJ6wLdL4MqQZumpTKyQ0u6e5L8H2kN4zLV9qJ0ItU55HQfy7QFVrG2fsRnFGn4dPbXATaJONcN84v0CO6uNCCaOiCsp8DBEhpjLA5e8Fott7spnu0l8FJuPkV7PKSQ.jpg"
                class="card-img-top rounded-0"
                alt="..."
              />
            </div>
            <div class="card-body text-center">
              <h4>典藏巧克力</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  榛果、巧心、酥脆表皮、灑上可可粉、淋上特製可可醬...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <carousel></carousel>
    <before-footer></before-footer>
  </div>
</template>

<script>
import Carousel from '@/components/attraction/Carousel.vue';
import BeforeFooter from '@/components/attraction/BeforeFooter.vue';

export default {
  name: 'Index',
  components: {
    Carousel,
    BeforeFooter,
  },
};
</script>

<style lang="scss" scoped>
.responsive-rectangle {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}

.card {
  transition: all .3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0,0,0,.2);
}
</style>
