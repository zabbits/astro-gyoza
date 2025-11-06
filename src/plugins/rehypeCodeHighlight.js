import rehypeShiki from '@shikijs/rehype'

const codeFile = (meta) => {
  const attrs = meta.split(/\s+/).filter(Boolean)
  for (const attr of attrs) {
    const [key, value] = attr.split('=', 2)
    if (key && key === 'file') {
      return value
    }
  }
}

export const rehypeCodeHighlight = [
  rehypeShiki,
  {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          node.properties.codeLang = this.options.lang
          if (this.options.meta.__raw) {
            node.properties.codeFile = codeFile(this.options.meta.__raw)
          }
        },
      },
    ],
  },
]
