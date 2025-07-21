import type { ExcalidrawInitialDataState, ExcalidrawProps, UIAppState } from "@excalidraw/excalidraw/types/types"
import ExcalidrawWrapper from "./ExcalidrawWrapper"
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export function generateMaxiumIcon(opts: ExcalidrawProps) {
    return (isMobile: boolean, appState: UIAppState) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);

        return (
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="rounded-md px-4 py-2 font-semibold text-blue shadow-md hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        <i className="iconfont icon-search"></i>
                    </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
                    <Dialog.Content className="
                        fixed left-1/2 top-1/2 z-50 w-11/12 h-[90vh] -translate-x-1/2 -translate-y-1/2
                        rounded-xl border bg-white px-6 py-4 shadow-lg dark:bg-gray-800
                        ">
                        <ExcalidrawWrapper {...opts} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        )
    }
}
