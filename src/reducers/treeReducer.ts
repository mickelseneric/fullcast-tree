import { TreeNode, TreeAction, TreeState } from '../types/treeTypes';

const initialState: TreeState = {
    nodes: []
};

const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
        if (node.id === id) {
            return node;
        }
        if (node.nodes) {
            const foundNode = findNodeById(node.nodes, id);
            if (foundNode) return foundNode;
        }
    }
    return null;
};

export const treeReducer = (state: TreeState = initialState, action: TreeAction): TreeState => {
    console.log('Current state:', state);
    console.log('Action:', action);
    let newState;

    switch (action.type) {
        case 'ADD_NODE':
            console.log('ADD_NODE', action.payload);
            const { parentId, newNode } = action.payload;
            if (parentId) {
                let parentNode = findNodeById(state.nodes, parentId);

                if (!parentNode) {
                    throw new Error(`Parent node with id ${parentId} not found`);
                }

                if (!parentNode.nodes) {
                    parentNode.nodes = [];
                }
                if (!parentNode.nodes.find(n => n.id === newNode.id)) {
                    parentNode.nodes.push(newNode);
                }
            } else {
                if (!state.nodes.find(n => n.id === newNode.id)) {
                    state.nodes.push(newNode);
                }
            }

            newState = {
                ...state,
                nodes: [...state.nodes]
            };
            console.log('New state:', newState);
            return newState;

        case 'REMOVE_NODE':
            console.log('REMOVE_NODE', action.payload);
            const removeNodeId = action.payload;
            const removeNode = (nodes: TreeNode[]): TreeNode[] => nodes.filter(node => node.id !== removeNodeId)
                .map(node => node.nodes ? {...node, nodes: removeNode(node.nodes)} : node);
            newState = {
                ...state,
                nodes: removeNode(state.nodes)
            };
            console.log('New state:', newState);
            return newState;

        case 'EDIT_NODE':
            console.log('EDIT_NODE', action.payload);
            const editNodeId = action.payload.id;
            const newNodeData = action.payload;
            const editNode = (nodes: TreeNode[]): TreeNode[] => nodes.map(node => {
                if (node.id === editNodeId) {
                    return { ...node, ...newNodeData };
                } else if (node.nodes) {
                    return { ...node, nodes: editNode(node.nodes) };
                } else {
                    return node;
                }
            });
            newState = {
                ...state,
                nodes: editNode(state.nodes)
            };
            console.log('New state:', newState);
            return newState;

        case 'SET_NODES':
            console.log('SET_NODES', action.payload);
            newState = {
                ...state,
                nodes: action.payload
            };
            console.log('New state:', newState);
            return newState;

        default:
            return state;
    }
};
