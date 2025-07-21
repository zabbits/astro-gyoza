import type { ExcalidrawProps } from '@excalidraw/excalidraw/types/types';
import { Excalidraw } from '@excalidraw/excalidraw'

export default function ExcalidrawWrapper(props: ExcalidrawProps) {
    props = props || {}
    return <div className="h-[500px]"> <Excalidraw {...props} /> </div>
}
