export const createTable = (
  headings,
  items,
  { address, name, total_price, key_line } = {}
) => {
  return {
    headings,
    items,
    address,
    name,
    total_price,
    key_line,
  }
}
