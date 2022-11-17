export const createTable = (
  headings,
  items,
  { address, name, total_price, key_line, idx } = {}
) => {
  return {
    headings,
    items,
    address,
    name,
    total_price,
    key_line,
    idx,
  }
}
