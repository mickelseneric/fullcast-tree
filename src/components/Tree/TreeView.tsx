import React from 'react';
import TreeNode from './TreeNode';
import { useTree } from '../../context/TreeContext';

const TreeView: React.FC = () => {
    const { treeState } = useTree();

    return (
        <div>
            {treeState.nodes.map(node => (
                <TreeNode key={node.id} node={node} />
            ))}
        </div>
    );
};

export default TreeView;
