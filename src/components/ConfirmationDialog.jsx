import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationDialog = ({ questionText, impact, setIsConfirmed, show, setShow, functionToContinue }) => {
    const handleClose = () => {
        setIsConfirmed(false)
        setShow(false)
    }
    const handleConfirm = () => {
        setIsConfirmed(true)
        setShow(false)
        functionToContinue(true)
    }
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title className='w-100'><p className='text-center'>Підтвердження дії</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='text-center'>{questionText}</p>
                <p className='text-center'>{impact}</p>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <div className='d-flex w-50 justify-content-between'>
                    <div>
                        <Button title='Відхилити дію' variant="success" onClick={handleClose}>
                            Ні
                        </Button>
                    </div>
                    <div>
                        <Button title='Підтвердити дію' variant="secondary" onClick={handleConfirm}>
                            Підтвердити
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationDialog;
