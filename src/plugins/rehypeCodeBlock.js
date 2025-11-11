import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

export function rehypeCodeBlock() {
  return function (tree) {
    visit(tree, { tagName: 'pre' }, (node, index, parent) => {
      const child = node.children[0]
      if (!child || child.type !== 'element' || child.tagName !== 'code' || !child.properties) {
        return
      }
      const lang = (node.properties && node.properties.codeLang) || 'text'
      const file = (node.properties && node.properties.codeFile) || ''

      const codeBlock = h(
        'div',
        {
          class: 'code-block',
        },
        // [h('span', { class: 'lang-tag' }, lang), node],
        [h('div', { class: 'lang-tag' }, [h('span', {}, file), h('span', {}, lang)])],
        node,
      )

      parent.children[index] = codeBlock
    })
  }
}
