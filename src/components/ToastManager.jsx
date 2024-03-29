import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useGlobalContext } from '../store/GlobalContext';

const ToastManager = () => {
    const { globalData, deleteToastMessage } = useGlobalContext();
    const { toastMessages } = globalData;
    const handleClose = (key) => {
        deleteToastMessage(key);
    }
    return (
        <div style={{ position: 'sticky', top: '0', zIndex: '9999' }}>
        <ToastContainer
            className="p-3"
            position="top-center"
        >
            {toastMessages.map(({ key, variant, header, text, visibility }) => (
                <Toast onClose={() => handleClose(key)} show={visibility} key={key} bg={variant} animation delay={5000} autohide close>
                    <Toast.Header className='bg-color-red'>
                        <strong className="me-auto text-center">{header}</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>
                        <p className='text-center'>{text}</p>
                    </Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
        </div>
    );
};

export default ToastManager;
