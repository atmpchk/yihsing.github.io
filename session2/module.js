export default {
  myName: '小明',
  fn: function () {
    console.log(this.myName)
  }
}

export function fn() {
  console.log('named export')
}

export const a = 1