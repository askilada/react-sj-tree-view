import React, {FC, useCallback, useContext, useMemo, useState} from 'react'
import cn from 'classnames'
import styles from './TreeViewNode.module.scss'
import {TreeViewContext} from "../../contexts/TreeViewContext";
import {TreeViewItem} from "../TreeView";


export interface TreeViewNodeProps {
    id: string
    label: string
    itemType: string
    children: TreeViewItem[]
    index: number[]
    onSelect: (pattern: number[]) => void
}

export const TreeViewNode: FC<TreeViewNodeProps> = props => {
    const treeCtx = useContext(TreeViewContext)
    const [isExpanded, setIsExpanded] = useState(false)

    const isSelected = useMemo(() => JSON.stringify(treeCtx.selectedIndex) === JSON.stringify(props.index), [treeCtx.selectedIndex, props.index])

    const expansionIcon = useMemo(() => {
        if (isExpanded) {
            return treeCtx.expansionIcons.open
        } else {
            return treeCtx.expansionIcons.close
        }
    }, [isExpanded, treeCtx.expansionIcons])

    const typeIcon = useMemo(() => {
        return treeCtx.typeIconMap[props.itemType] || null
    }, [treeCtx.typeIconMap, props.itemType])

    const handleLabelClicked = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
        console.log('[handleLabelClicked] fired')
        ev.preventDefault()
        props.onSelect(props.index)
    }, [props])

    return (
        <div className={styles.root}>
            <div className={cn(styles.itemContainer, {[styles.itemContainerSelected]: isSelected})}>
                <div className={styles.expansionIconContainer} onClick={() => setIsExpanded(p => !p)}>
                    {props.children.length > 0 && expansionIcon}
                </div>
                <div className={styles.itemIconContainer}>
                    {typeIcon}
                </div>
                <div className={styles.labelContainer} onClick={handleLabelClicked}>
                    {props.label}
                </div>
            </div>
            {isExpanded && (
                <div style={{paddingLeft: 28}}>
                    {props.children.map((child, i) => (
                        <TreeViewNode id={child.id}
                                      key={child.id}
                                      label={child.label}
                                      index={[...props.index, i]}
                                      onSelect={props.onSelect}
                                      itemType={child.type}>{child.children}</TreeViewNode>
                    ))}
                </div>
            )}
        </div>
    )
}

