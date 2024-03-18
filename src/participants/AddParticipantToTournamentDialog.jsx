import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useGlobalContext } from '../store/GlobalContext';

const AddParticipantToTournamentDialog = ({ showFlag, setShowFlag, data }) => {

    const { globalData, addToastMessage, updateTournament } = useGlobalContext();
 
    // Initialize state for form data
    const [formData, setFormData] = useState({
        id: data?.id,
        personId: data?.person?.id ?? '',
    }); 
    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }; 
    const fillData = () => {
        setFormData({
            id: data?.id,
            personId: data?.person?.id ?? '',
        });
    } 
    const resetFormData = () => {
        setFormData({
            id: null,
            personId: '',
        })
    } 

    const handleClose = () => { 
        setShowFlag(false); 
        resetFormData();
        setValidated(false);
    }; 

    const [validated, setValidated] = useState(false); 

    const tournament = globalData.tournaments
        .find(x => x.id === data.tournamentId);

    const submitForm = () => {
        const form = document.getElementById('modal-form-2');

        if (form.checkValidity() === true) {

            if (formData.id) {
            }
            else {
                tournament.participants.push({
                    id: tournament.participants.length + 1,
                    person: globalData.persons.find(x => x.id === +formData.personId),
                });
                updateTournament(tournament)
                addToastMessage({ variant: 'success', header: 'Успіх', text: 'Учасник успішно доданий'})
            }
            handleClose();
        }
        setValidated(true)
    };

    return (
        <Modal show={showFlag} onHide={handleClose} onShow={fillData}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Дадати учасника до турніру
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='modal-form-2' noValidate validated={validated}>
                    <Form.Group controlId="validationCustom04">
                        <Form.Label>Особа</Form.Label>
                        <Form.Select
                            name="personId"
                            value={formData.typeId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Оберіть особу...</option>
                            {globalData.persons.filter(x => !tournament.participants?.map(p => p.person.id).includes(x.id)).map((person) => (
                                <option value={person.id} key={person.id}>{person.fullName}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Оберіть особу.
                        </Form.Control.Feedback>
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

export default AddParticipantToTournamentDialog;
