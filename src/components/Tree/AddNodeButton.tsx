import React, { useState, KeyboardEvent } from 'react';

interface AddNodeButtonProps {
    addNewNode: (nodeName: string) => void;
}

const AddNodeButton: React.FC<AddNodeButtonProps> = ({ addNewNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log('handleKeyPress', e.key);
        if (e.key === 'Enter') {
            handleAdd();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setInputValue('');
    };

    const handleAdd = () => {
        if (inputValue) {
            addNewNode(inputValue);
            setIsEditing(false);
            setInputValue('');
        }
    }

    const iconStyle = {
        width: '24px',
        cursor: 'pointer'
    };
    const buttonStyle = {
        marginLeft: '20px',
        marginBottom: '10px',
        cursor: 'pointer'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyUp={handleKeyPress}
                        autoFocus
                    />
                    <span
                        className="material-symbols-outlined"
                        style={iconStyle}
                        onClick={handleAdd}
                    >save</span>
                    <span
                        className="material-symbols-outlined"
                        style={iconStyle}
                        onClick={handleCancel}
                    >delete</span>
                </>
            ) : (
                <div onClick={() => setIsEditing(true)} style={buttonStyle}>
                    <span className="material-symbols-outlined" style={iconStyle}>add</span>
                    <span className="node-name">Add to List</span>
                </div>
            )}
        </div>
    );
};

export default AddNodeButton;
