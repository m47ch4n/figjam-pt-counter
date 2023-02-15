const re = /\[(\d+\.?\d*|\.\d+) ?(pt)?\]/g 

function findAllSticky(node: SceneNode): StickyNode[] {
  switch (node.type) {
    case "GROUP":
    case "SECTION":
      return node.findAll(n => n.type === "STICKY") as StickyNode[]
    case "STICKY":
      return [node]
    default:
      return []
  }
}

const count = figma.currentPage.selection.reduce((acc, node) => {
  const stickies = findAllSticky(node)
  for (const sticky of stickies)
    for (const match of sticky.text.characters.matchAll(re))
      acc += parseFloat(match[1])
  return acc
}, 0)

figma.notify(`${count} pt`)
figma.closePlugin()