# react-sj-tree-view

## Install

    yarn add react-sj-tree-view

or

    npm install --save react-sj-tree-view


## Usage
    // Data
    [
        {
            id: '1',
            label: 'root',
            type: 'root',
            children: [
                {
                    id: '2',
                    label: 'Foo',
                    type: 'foo',
                    children: []
                }
            ]
        }
    ]


    // ItemTreeView
    import React, {FC, useMemo} from 'react'
    import {TreeView, TreeViewItem} from "react-sj-tree-view";
    import {FaAngleDoubleUp, FaHome, FaMinus, FaPlus} from "react-icons/fa";
    
    interface ItemTreeViewProps {
    items: TreeViewItem[]
    onItemSelect: (pattern: number[]) => void
    }
    
    export const ItemTreeView: FC<ItemTreeViewProps> = props => {
    
        const typeIcons = useMemo(() => ({
            foo: <FaAngleDoubleUp />,
            root: <FaHome/>
        }), [])
    
        const expansionIcon = useMemo(() =>({
            open: <FaMinus/>,
            close: <FaPlus/>
        }), [])
        
        return (
            <TreeView items={props.items}
                      onItemSelect={props.onItemSelect}
                      typeIconMap={typeIcons}
                      expansionIcons={expansionIcon}/>
        );
    }




## Development

    yarn
    yarn rollup -c [-w]

## License

react-sj-tree-view is released under the MIT license.

