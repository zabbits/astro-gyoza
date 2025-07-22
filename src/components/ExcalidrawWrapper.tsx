import type { ExcalidrawProps } from '@excalidraw/excalidraw/types/types';
import { Excalidraw } from '@excalidraw/excalidraw'

// 定义我们组件接收的 props 类型
export interface ExcalidrawWrapperProps extends ExcalidrawProps {
  className?: string;
}

export default function ExcalidrawWrapper({className, ...props}: ExcalidrawWrapperProps) {
    return <div className={className}> <Excalidraw {...props} /> </div>
}
