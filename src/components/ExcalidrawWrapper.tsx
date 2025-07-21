import type { ExcalidrawProps } from '@excalidraw/excalidraw/types/types';
import { Excalidraw } from '@excalidraw/excalidraw'

// TODO: 添加放大模式
export default function ExcalidrawWrapper(props: ExcalidrawProps) {
    props = props || {}
    return <div className="h-[500px]"> <Excalidraw {...props} /> </div>
}
