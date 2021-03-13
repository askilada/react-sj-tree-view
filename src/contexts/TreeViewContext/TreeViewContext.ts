import React, {createContext} from "react";

export interface TreeViewContextProps {
    expansionIcons: {
        open: React.ReactNode
        close: React.ReactNode
    }
    typeIconMap: {
        [key:string]: React.ReactNode
    }
    selectedId: string | null
    setSelectedId: (id: string) => void
}
// @ts-ignore
export const TreeViewContext = createContext<TreeViewContextProps>(null)
