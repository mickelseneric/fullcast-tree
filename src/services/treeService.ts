import axios from 'axios';
import { TreeNode } from '../types/treeTypes';

const API_BASE_URL = 'http://localhost:3001'; // Replace with your API base URL

export const treeService = {
    addNode: async (parentId: string, node: TreeNode): Promise<TreeNode> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/tree/nodes`, { parentId, node });
            return response.data;
        } catch (error) {
            console.error('Error adding node:', error);
            throw error;
        }
    },

    removeNode: async (nodeId: string): Promise<void> => {
        console.log('removeNode', nodeId);
        try {
            await axios.delete(`${API_BASE_URL}/tree/nodes/${nodeId}`);
        } catch (error) {
            console.error('Error removing node:', error);
            throw error;
        }
    },

    editNode: async (nodeId: string, newNodeData: Partial<TreeNode>): Promise<TreeNode> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/tree/nodes/${nodeId}`, newNodeData);
            return response.data;
        } catch (error) {
            console.error('Error editing node:', error);
            throw error;
        }
    },

    fetchNodes: async (): Promise<TreeNode[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tree/nodes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching nodes:', error);
            throw error;
        }
    }
};
