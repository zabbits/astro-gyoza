import type { ExcalidrawProps, UIAppState } from "@excalidraw/excalidraw/types/types"
import ExcalidrawWrapper from "./ExcalidrawWrapper"
import { useState } from "react";

export function generateMaxiumIcon(opts: ExcalidrawProps) {
    return (isMobile: boolean, appState: UIAppState) => {
        const [isMaskVisible, setIsMaskVisible] = useState(false);

        const showMask = () => {
            setIsMaskVisible(true);
        };

        const hideMask = () => {
            setIsMaskVisible(false);
        };

        // 阻止事件冒泡，防止点击内容区时关闭遮罩
        const handleContentClick = (e: any) => {
            e.stopPropagation();
        };

        // TODO: 使用Excalidraw展示数据
        return (
            <>
                <i onClick={showMask} className="iconfont icon-search"></i>
                {isMaskVisible && (
                    <div className="mask" onClick={hideMask}>
                        <div className="w-[100px] h-[100px]" onClick={handleContentClick}>
                            <h3>这是一个遮罩层</h3>
                            <p>点击背景或关闭按钮可以关闭它。</p>
                            <button onClick={hideMask}>关闭</button>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

// 这里如何动态添加一个drawer, 在drawer中渲染excaliraw
function maxiumExcalidraw(opts: ExcalidrawProps) {
    console.log("oops")
}
