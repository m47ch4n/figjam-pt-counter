const re = /\[(\d+\.?\d*|\.\d+) ?(pt)?\]/g 

type Countable = StickyNode | ShapeWithTextNode

function findAllCountable(node: SceneNode): Countable[] {
  switch (node.type) {
    case "GROUP":
    case "SECTION":
      return node.findAll(n => n.type === "STICKY" || n.type === "SHAPE_WITH_TEXT") as Countable[]
    case "SHAPE_WITH_TEXT":
    case "STICKY":
      return [node]
    default:
      return []
  }
}

const count = figma.currentPage.selection.reduce((acc, node) => {
  const countables = findAllCountable(node)
  for (const countable of countables)
    for (const match of countable.text.characters.matchAll(re))
      acc += parseFloat(match[1])
  return acc
}, 0)

figma.notify(`${count} pt`)
figma.closePlugin()