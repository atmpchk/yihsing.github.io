Vue.filter('formatCurrency', function (value) {
  if (value === null || value === undefined) return ''
  return formatter.format(value)
})

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})