import React, {KeyboardEvent, useState} from 'react';
import { TreeNode as TreeNodeType } from '../../types/treeTypes';
import { useTree } from '../../context/TreeContext';
import AddNodeButton from './AddNodeButton';
import {Simulate} from "react-dom/test-utils";
import cancel = Simulate.cancel;

interface TreeNodeProps {
    node: TreeNodeType;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(node.name);
    const { removeNode, editNode, addNode } = useTree();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    const handleEdit = async () => {
        if (!inputValue) return;

        await editNode(node.id, { name: inputValue });
        setIsEditing(false);
        setInputValue('');
    };
    const cancelEdit = () => {
        setIsEditing(false);
        setInputValue('');
    }

    const handleDelete = async () => {
        console.log('handleDelete', node.id);
        await removeNode(node.id);
    };

    const handleAddChild = async (name: string) => {
        if (!name) return;

        const newChildNode = { id: 'new-id', name, nodes: [] };
        await addNode(node.id, newChildNode);
    };

    const nameStyle = {
        marginBottom: '10px',
        cursor: 'pointer'
    };
    const chevronStyle = {
        transform: `rotate(${isExpanded ? '0deg' : '-90deg'})`,
        width: '24px'
    };
    const iconStyle = {
        width: '24px',
        cursor: 'pointer'
    };

    return (
        <>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        autoFocus
                        style={{marginBottom: '10px'}}
                    />
                    <span
                        className="material-symbols-outlined"
                        style={iconStyle}
                        onClick={handleEdit}
                    >save</span>
                    <span
                        className="material-symbols-outlined"
                        style={iconStyle}
                        onClick={cancelEdit}
                    >delete</span>
                </>
            ) : (
                <div style={nameStyle}>
                    <span onClick={() => setIsExpanded(!isExpanded)} className="material-symbols-outlined"
                      style={chevronStyle}>expand_more</span>
                    <span onClick={() => setIsExpanded(!isExpanded)} className="node-name">{node.name}</span>
                    <span className="material-symbols-outlined" onClick={() => setIsEditing(true)}>edit</span>
                    <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
                </div>
            )}
            {isExpanded && node.nodes && (
                <div style={{marginLeft: '20px'}}>
                    {node.nodes.map(childNode => (
                        <TreeNode key={childNode.id} node={childNode}/>
                    ))}
                </div>
            )}
            {isExpanded && <AddNodeButton addNewNode={handleAddChild}/>}
        </>
    );
};

export default TreeNode;
