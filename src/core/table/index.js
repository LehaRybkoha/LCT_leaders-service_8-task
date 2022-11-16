export const createTable = (
  headings,
  items,
  address = '',
  name = '',
  total_price = null
) => {
  return {
    headings,
    items,
    address,
    name,
    total_price,
  }
}
