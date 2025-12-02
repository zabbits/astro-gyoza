import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

export function rehypeLink() {
  return (tree) => {
    visit(tree, { tagName: 'a' }, (node, index, parent) => {
      const link = node.properties.href
      if (link.endsWith('.md')) {
        node.properties.href = link.slice(0, -3)
      }
      const isExternal = link.startsWith('http')
      if (isExternal) {
        node.properties = {
          ...node.properties,
          rel: 'noopener noreferrer',
          target: '_blank',
        }
        parent.children[index] = node
        const icon = h('i', { class: 'iconfont icon-external-link' })
        parent.children.splice(index + 1, 0, icon)
      }
    })
  }
}
