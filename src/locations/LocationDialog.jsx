import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useGlobalContext } from '../store/GlobalContext';

const LocationDialog = ({ showFlag, setShowFlag, data, setData }) => {

    const { globalData, addLocation, addToastMessage, updateLocation } = useGlobalContext();

    // Initialize state for form data
    const [formData, setFormData] = useState({
        id: data?.id,
        name: data?.name ?? '',
        description: data?.description ?? '',
        imageUrl: data?.imageUrl ?? '',
    });
    
    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const fillData = () => {
        setFormData({
            id: data?.id,
            name: data?.name ?? '',
            description: data?.description ?? '',
            imageUrl: data?.imageUrl ?? '',
        });
    }
    const resetFormData = () => {
        setFormData({
            id: data?.id,
            name: data?.name ?? '',
            description: data?.description ?? '',
            imageUrl: data?.imageUrl ?? '',
        })
    }

    const handleClose = () => { 
        setShowFlag(false); 
        resetFormData();
        setValidated(false);
        setData(null);
    };

    const [validated, setValidated] = useState(false);

    const submitForm = () => {
        const form = document.getElementById('modal-form-3');

        if (form.checkValidity() === true) {
            if (formData.id) {
                updateLocation(formData)
                addToastMessage({ variant: 'success', header: 'Успіх', text: 'Локацію успішно оновлено'})
            }
            else {
                const newLocation = {
                    id: globalData.locations.length + 1,
                    name: formData.name,
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                }
                addLocation(newLocation)
                addToastMessage({ variant: 'success', header: 'Успіх', text: 'Локацію успішно додано'})
            }
            handleClose();
        }
        setValidated(true)
    };

    return (
        <Modal show={showFlag} onHide={handleClose} onShow={fillData}>
            <Modal.Header closeButton>
                <Modal.Title>
                {formData.id ? 'Оновити локацію' : 'Додати локацію'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='modal-form-3' noValidate validated={validated}>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Назва локації</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Назва локації..."
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Введіть назву локації.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom02">
                        <Form.Label>Посилання на зображення</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Посилання на зображення..."
                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            name="description"
                            value={formData.description}
                            onChange={handleChange} 
                            as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрити
                </Button>
                <Button variant="primary" onClick={submitForm}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LocationDialog;
