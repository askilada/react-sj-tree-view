import React, {FC, useEffect, useMemo, useState} from 'react'
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

    onItemSelect?: (pattern: number[]) => void
}

export const TreeView: FC<TreeViewProps> = (props) => {
    const [selectedIndex, setSelectedIndex] = useState<number[]>([])

    const value = useMemo((): TreeViewContextProps => {
        return {
            expansionIcons: props.expansionIcons,
            typeIconMap: props.typeIconMap,
            selectedIndex: selectedIndex,
            changeSelectedIndex: pattern => setSelectedIndex(p => {
                if (JSON.stringify(p) === JSON.stringify(pattern)) {
                    return p
                }
                return pattern
            })
        }
    }, [props.expansionIcons, props.typeIconMap, selectedIndex])

    const handleIndexSelect = (pattern: number[]) => {
        console.log('[handleIndexSelect]', pattern)
        setSelectedIndex(pattern)
    }

    useEffect(() => {
        props.onItemSelect && props.onItemSelect(selectedIndex)
    }, [JSON.stringify(selectedIndex)])

    return (
        <TreeViewContext.Provider value={value}>
            <div>
                {props.items.map((item, i) => (
                    <TreeViewNode id={item.id}
                                  key={item.id}
                                  index={[i]}
                                  onSelect={handleIndexSelect}
                                  label={item.label}
                                  itemType={item.type}>
                        {item.children}
                    </TreeViewNode>
                ))}
            </div>
        </TreeViewContext.Provider>
    )
}


