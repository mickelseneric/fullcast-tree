export interface TreeNode {
    id: string;
    name: string;
    nodes?: TreeNode[];
}

export interface TreeState {
    nodes: TreeNode[];
}

export type TreeAction =
    | { type: 'SET_NODES'; payload: TreeNode[] }
    | { type: 'ADD_NODE'; payload: { parentId: string, newNode: TreeNode } }
    | { type: 'REMOVE_NODE'; payload: string }
    | { type: 'EDIT_NODE'; payload: { id: string; name: string } };
