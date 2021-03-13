import React, {FC, useCallback, useMemo, useState} from 'react'
import {TreeViewContext, TreeViewContextProps} from '../../contexts/TreeViewContext';
import {TreeViewNode} from "../TreeViewNode";

export interface TreeViewItem {
    id: string
    label: string
    type: string
    children: TreeViewItem[]
}

export interface TreeViewProps {
    expansionIcons: {
        open: React.ReactNode
        close: React.ReactNode
    }
    typeIconMap: {
        [key:string]: React.ReactNode
    }
    items: TreeViewItem[]
}

export const TreeView: FC<TreeViewProps> = (props) => {
    const [selectedId, setSelectedId] = useState<string|null>(null)

    const changeSelectedId = useCallback((id: string) => {
        setSelectedId(p => {
            if (p === id) {
                return null
            }
            return id
        })
    }, [])

    const value = useMemo((): TreeViewContextProps => {
        return {
            expansionIcons: props.expansionIcons,
            typeIconMap: props.typeIconMap,
            selectedId,
            setSelectedId: changeSelectedId,
        }
    }, [props.expansionIcons, props.typeIconMap, selectedId])

    return (
        <TreeViewContext.Provider value={value}>
            <div>
                {props.items.map(item => (
                    <TreeViewNode id={item.id}
                                  key={item.id}
                                  label={item.label}
                                  itemType={item.type}>
                        {item.children}
                    </TreeViewNode>
                ))}
            </div>
        </TreeViewContext.Provider>
    )
}


