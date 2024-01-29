import React, {createContext, useContext, ReactNode, useReducer, useEffect, useCallback} from 'react';
import { TreeNode } from '../types/treeTypes';
// import { useTreeActions } from '../hooks/useTreeActions';
import { treeReducer } from "../reducers/treeReducer";
import { treeService } from "../services/treeService";

// Define the context shape
interface TreeContextProps {
    treeState: {
        nodes: TreeNode[];
    };
    addNode: (parentId: string, node: TreeNode) => Promise<void>;
    removeNode: (nodeId: string) => Promise<void>;
    editNode: (nodeId: string, updatedData: Partial<TreeNode>) => Promise<void>;
}

// Create the context
const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

interface TreeProviderProps {
    children: ReactNode;
}

// Export the provider component
export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
    const [treeState, dispatch] = useReducer(treeReducer, { nodes: [] });
    // const { addNode, removeNode, editNode } = useTreeActions();

    const addNode = useCallback(async (parentId: string, node: TreeNode) => {
        console.log('addNode', parentId, node);
        try {
            const newNode = await treeService.addNode(parentId, node);
            dispatch({ type: 'ADD_NODE', payload: { parentId, newNode } });
        } catch (error) {
            console.error('Error adding node:', error);
        }
    }, []);

    const removeNode = useCallback(async (nodeId: string) => {
        console.log('removeNode', nodeId);
        try {
            await treeService.removeNode(nodeId);
            dispatch({ type: 'REMOVE_NODE', payload: nodeId });
        } catch (error) {
            console.error('Error removing node:', error);
        }
    }, []);

    const editNode = useCallback(async (nodeId: string, updatedData: Partial<TreeNode>) => {
        try {
            const updatedNode = await treeService.editNode(nodeId, updatedData);
            dispatch({ type: 'EDIT_NODE', payload: updatedNode });
        } catch (error) {
            console.error('Error editing node:', error);
        }
    }, []);

    useEffect(() => {
        const initTreeData = async () => {
            try {
                const data = await treeService.fetchNodes();
                dispatch({ type: 'SET_NODES', payload: data });
            } catch (err) {
                console.error('Error initializing tree data', err);
            }
        };

        initTreeData();
    }, []);

    console.log('treeState', treeState);

    return (
        <TreeContext.Provider value={{ treeState, addNode, removeNode, editNode }}>
            {children}
        </TreeContext.Provider>
    );
};

// Custom hook to use the tree context
export const useTree = () => {
    const context = useContext(TreeContext);
    if (!context) {
        throw new Error('useTree must be used within a TreeProvider');
    }
    return context;
};
