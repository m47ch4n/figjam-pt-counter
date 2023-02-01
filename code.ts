const re = /\[(\d+\.?\d*|\.\d+) ?(pt)?\]/g 

const count = figma.currentPage.selection.reduce((acc, node) => {
  if (node.type !== "STICKY") return acc
  for (const match of node.text.characters.matchAll(re))
    acc += parseFloat(match[1])
  return acc
}, 0)

figma.notify(`${count} pt`)
figma.closePlugin()