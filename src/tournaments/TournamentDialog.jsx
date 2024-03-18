import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useGlobalContext } from '../store/GlobalContext';

const TournamentDialog = ({ showFlag, setShowFlag, data }) => {

    const { globalData, addNewTournament, updateTournament, addToastMessage } = useGlobalContext();

    // Initialize state for form data
    const [formData, setFormData] = useState({
        id: data?.id,
        name: data?.name ?? '',
        locationId: data?.location.id ?? '',
        seasonId: data?.season.id ?? '',
        typeId: data?.type.id ?? '',
        description: data?.description ?? '',
        participants: data?.participants ?? [],
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
            locationId: data?.location.id ?? '',
            seasonId: data?.season.id ?? '',
            typeId: data?.type.id ?? '',
            description: data?.description ?? '',
            participants: data?.participants ?? [],
        });
    }
    const resetFormData = () => {
        setFormData({
            id: null,
            name: '',
            locationId: '',
            seasonId: '',
            typeId: '',
            participants: [],
        })
    }

    const handleClose = () => { 
        setShowFlag(false); 
        resetFormData();
        setValidated(false);
    };

    const [validated, setValidated] = useState(false);

    const submitForm = () => {
        const form = document.getElementById('modal-form');

        if (form.checkValidity() === true) {
            if (formData.id) {
                const updatedTournament = {
                    ...formData,
                    name: formData.name,
                    location: globalData.locations.find(x => x.id === +formData.locationId),
                    season: globalData.seasons.find(x => x.id === +formData.seasonId),
                    type: globalData.types.find(x => x.id === +formData.typeId),
                };
                updateTournament(updatedTournament)
                addToastMessage({ variant: 'success', header: 'Успіх', text: 'Турнір успішно оновлено'})
            }
            else {
                const newTournament = {
                    id: Math.max(globalData.tournaments.map(x => x.id)) + 1,
                    name: formData.name,
                    location: globalData.locations.find(x => x.id === +formData.locationId),
                    season: globalData.seasons.find(x => x.id === +formData.seasonId),
                    type: globalData.types.find(x => x.id === +formData.typeId),
                    participants: [],
                }
                addNewTournament(newTournament)
                addToastMessage({ variant: 'success', header: 'Успіх', text: 'Турнір успішно доданий'})
            }
            handleClose();
        }
        setValidated(true)
    };

    return (
        <Modal show={showFlag} onHide={handleClose} onShow={fillData}>
            <Modal.Header closeButton>
                <Modal.Title>
                {formData.id ? 'Оновити турнір' : 'Додати турнір'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='modal-form' noValidate validated={validated}>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Назва турніру</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Назва турніру..."
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Введіть назву турніру.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom02">
                        <Form.Label>Локація</Form.Label>
                        <Form.Select
                            name="locationId"
                            value={formData.locationId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Оберіть локацію...</option>
                            {globalData.locations.map((location) => (
                                <option value={location.id} key={location.id}>{location.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Оберіть локацію.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom03">
                        <Form.Label>Сезон</Form.Label>
                        <Form.Select
                            name="seasonId"
                            value={formData.seasonId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Оберіть сезон...</option>
                            {globalData.seasons.map((season) => (
                                <option value={season.id} key={season.id}>{season.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Оберіть сезон.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom04">
                        <Form.Label>Тип</Form.Label>
                        <Form.Select
                            name="typeId"
                            value={formData.typeId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Оберіть тип...</option>
                            {globalData.types.map((type) => (
                                <option value={type.id} key={type.id}>{type.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Оберіть тип.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {formData.id ? 
                    (<Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            name="description"
                            value={formData.description}
                            onChange={handleChange} 
                            as="textarea" rows={3} />
                    </Form.Group>) 
                    : null }
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

export default TournamentDialog;
