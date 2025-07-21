import fs from 'node:fs'
import path from 'node:path'
import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'

function parseExcalidraw(filePath: string): string | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const ast = unified().use(remarkParse).parse(fileContent)

    let rawjson = null
    visit(ast, 'code', (node) => {
      if (node.lang === 'json') {
        rawjson = node.value
      }
    })

    return rawjson
  } catch (error) {
    return null
  }
}

export function remarkExcalidraw() {
  return (tree: Root, file: VFile) => {
    visit(tree, 'link', (node) => {
      if (node.url.endsWith('.excalidraw.md')) {
        const currentDir = path.dirname(file.path)
        const excalidrawFilePath = path.resolve(currentDir, node.url)
        const jsonData = parseExcalidraw(excalidrawFilePath)

        const anyNode = node as any
        anyNode.type = 'html'
        delete anyNode.url
        if (jsonData) {
          const escapedJsonData = jsonData.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
          anyNode.value = `<div class="excalidraw-container" data-excalidraw-json='${escapedJsonData}'></div>`
        } else {
          anyNode.value = `<div></div>`
        }
      }
    })
  }
}
