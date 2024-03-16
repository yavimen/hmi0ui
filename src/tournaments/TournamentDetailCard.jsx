import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Card, Spinner, Button, Col, Row } from 'react-bootstrap';
import bin from '../assets/bin.png';
import pen from '../assets/pen.png';
import { useGlobalContext } from '../store/GlobalContext';
import ConfirmationDialog from '../components/ConfirmationDialog';
import TournamentDialog from './TournamentDialog';

const TournamentDetailCard = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const [isConfirmed, setIsConfirmed] = useState(false);

    const { id } = useParams();
    const { globalData, addToastMessage, deleteTournament } = useGlobalContext();
    const tournament = globalData.tournaments.find(x => x.id == id);
    if (!tournament) {
        navigate.push('/not-found');
        return null;
    }
    const cardStyle = { backgroundColor: "#F6F6F6", border: 'none' };
    const handleDelete = () => {
        setShowConfirmationDialog(true)
    }
    const onDeleteTournament = (isConfirmed) => {
        if (!isConfirmed) return;
        setLoading(true)
        setTimeout(() => {
            if (tournament.participants.length) {
                addToastMessage({ 
                    variant: 'danger', 
                    header: 'Невдача', 
                    text: `Турнір ${tournament.name} не було видалено через те, що учасники уже приймають участь у турнірі. Видаліть усіх учасників, перед тим, як видаляти турнір`
                })
            }
            else {
                deleteTournament(tournament);
                addToastMessage({ 
                    variant: 'success', 
                    header: 'Успіх', 
                    text: `Турнір ${tournament.name} успішно видалено`
                })
                navigate('/tournaments');
            }

            setLoading(false)
        }, 1000);
    };
    return (
        <div>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between w-100'>
                        <div>{tournament.name}</div>
                        <div className='d-flex'>
                            <Button className='d-flex align-items-center shadow-sm mx-3' style={{ borderRadius: '15px' }} size="sm" variant='light' onClick={() => setShowEditDialog(true)}>
                                <img src={pen} style={{ width: '18px', height: "auto" }} />
                                Редагувати
                            </Button>
                            <Button disabled={loading} className='d-flex align-items-center shadow-sm' style={{ borderRadius: '15px' }} size="sm" variant={loading ? 'secondary' : 'danger'} onClick={handleDelete}>
                                {loading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    <img src={bin} style={{ width: '18px', height: "auto" }} />
                                )}
                                Видалити
                            </Button>
                        </div>
                    </Card.Title>
                    <Row className='mb-2'>
                        <Col className='fw-bold'>Сезон:</Col>
                        <Col>{tournament.season.name}</Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col className='fw-bold'>Тип:</Col>
                        <Col>{tournament.type.name}</Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col sm={12} className='fw-bold'>Опис:</Col>
                        <Col>
                            <Card.Text>{tournament.description}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <ConfirmationDialog 
                questionText={`Ви впевнені, що хочете видалити турнір ${tournament.name} ? `}
                setIsConfirmed={setIsConfirmed}
                show={showConfirmationDialog}
                setShow={setShowConfirmationDialog}
                functionToContinue={onDeleteTournament}
            />
            <TournamentDialog showFlag={showEditDialog} setShowFlag={setShowEditDialog} data={tournament}/>
        </div>
    );
};

export default TournamentDetailCard;
