const hasParentId = (node: HTMLElement, id: string) => {
  while (true) {
    if (node.id === id) {
      return true
    }
    if (!node.parentNode) return false
    node = node.parentNode as HTMLElement
  }
}
export default hasParentId
