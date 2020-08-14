const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

function formatCurrency(value) {
  if (value === null || value === undefined) return '';
  return formatter.format(value);
}

export default formatCurrency;
