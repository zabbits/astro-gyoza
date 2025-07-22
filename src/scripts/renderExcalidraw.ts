import type { Root } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ExcalidrawWrapper, { type ExcalidrawWrapperProps } from '@/components/ExcalidrawWrapper'
import { generateMaxiumIcon } from '@/components/ExcalidrawTopRight'

const containers = document.querySelectorAll('.excalidraw-container')

const renderedInstances = new Map<Element, { root: Root; jsonData: any }>()

function getCurrentTheme(): 'dark' | 'light' {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function defaultOpts(theme: 'dark' | 'light'): ExcalidrawWrapperProps {
  return {
    zenModeEnabled: false,
    viewModeEnabled: true,
    gridModeEnabled: false,
    objectsSnapModeEnabled: false,
    theme,
    UIOptions: {
      canvasActions: {
        changeViewBackgroundColor: true,
        clearCanvas: false,
        export: false,
        loadScene: false,
        saveToActiveFile: false,
        toggleTheme: false,
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
  }
}

function renderOrUpdateInstance(container: Element, jsonData: any) {
  const theme = getCurrentTheme()

  const initialData = {
    ...jsonData,
  }

  const root = renderedInstances.get(container)?.root || ReactDOM.createRoot(container)

  const rawopts = { className: 'h-full', initialData, ...defaultOpts(theme) }
  const opts: ExcalidrawWrapperProps = {
    ...rawopts,
    className: 'h-[500px]',
    renderTopRightUI: generateMaxiumIcon(rawopts),
  }

  root.render(React.createElement(ExcalidrawWrapper, opts))

  if (!renderedInstances.has(container)) {
    renderedInstances.set(container, { root, jsonData })
  }
}

function updateAllExcalidrawThemes() {
  for (const [container, { jsonData }] of renderedInstances.entries()) {
    renderOrUpdateInstance(container, jsonData)
  }
}

containers.forEach((container) => {
  const jsonString = (container as HTMLElement).dataset.excalidrawJson
  if (jsonString) {
    try {
      const jsonData = JSON.parse(jsonString)
      renderOrUpdateInstance(container, jsonData)
    } catch (e) {
      container.textContent = '手绘不见了'
    }
  }
})

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      updateAllExcalidrawThemes()
    }
  }
})

observer.observe(document.documentElement, { attributes: true })

document.addEventListener(
  'swup:willReplaceContent',
  () => {
    observer.disconnect()
    renderedInstances.clear()
  },
  { once: true },
)
