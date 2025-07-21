import type { Root } from 'react-dom/client'
import type { ExcalidrawProps } from '@excalidraw/excalidraw/types/types'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ExcalidrawWrapper from '@/components/ExcalidrawWrapper'
import { generateMaxiumIcon } from '@/components/ExcalidrawTopRight'

const containers = document.querySelectorAll('.excalidraw-container')

// TODO: 切换主题时如和动态更改
containers.forEach((container) => {
  const jsonString = (container as HTMLElement).dataset.excalidrawJson
  if (jsonString) {
    try {
      const jsonData = JSON.parse(jsonString)
      const initialData = {
        elements: jsonData.elements,
        appState: jsonData.appState,
        files: jsonData.files,
      }
      const root: Root = ReactDOM.createRoot(container)
      const opts: ExcalidrawProps = {
        initialData,
        zenModeEnabled: false,
        viewModeEnabled: true,
        gridModeEnabled: false,
        objectsSnapModeEnabled: false,
        UIOptions: {
          canvasActions: {
            changeViewBackgroundColor: true,
            clearCanvas: false,
            export: false,
            loadScene: false,
            saveToActiveFile: false,
            toggleTheme: true,
            saveAsImage: false,
          },
          tools: {
            image: false,
          },
        },
        excalidrawAPI: (api: any) => {
          setTimeout(() => {
            api.scrollToContent(undefined, {
              fitToContent: true,
            })
          }, 100)
        },
        // zenmode开启时不会展示
        renderTopRightUI: generateMaxiumIcon({}),
      }

      root.render(React.createElement(ExcalidrawWrapper, opts))
    } catch (e) {
      container.textContent = '手绘不见了'
    }
  }
})
