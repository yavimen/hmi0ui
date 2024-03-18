import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useGlobalContext } from '../store/GlobalContext';
import { Link } from 'react-router-dom';
import bin from '../assets/bin.png';
import { useParams  } from 'react-router-dom';
import AddParticipantToTournamentDialog from './AddParticipantToTournamentDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';
const TournamentParticipantsCard = () => {
    const { globalData, deleteParticipant, addToastMessage } = useGlobalContext();
    const { id } = useParams();
    const tournament = globalData.tournaments.find(x => x.id == id);
    const cardStyle = { backgroundColor: "#F6F6F6", border: 'none' };
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [confirmationData, setConfirmationData] = useState(null);
    const handleDeleteParticipant = (item) => {
        setConfirmationData(item);
        setShowConfirmationDialog(true);
    }
    const onDelete = (confirmed, item) => {
        deleteParticipant(item, +id);
        addToastMessage({ variant: 'success', header: 'Успіх', text: 'Учасник успішно видалений'})
    }
    return (
        <div>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between w-100'>
                        <div>Учасники</div>
                        <div><Button style={{ borderRadius: '15px' }} size="sm" variant='success' onClick={() => setShowAddDialog(true)}>+ Додати учасника</Button></div>
                    </Card.Title>
                        <table className='w-100'>
                            <thead>
                                <tr style={{ borderBottom: "1px solid black" }}>
                                    <td>Учасник</td>
                                    <td></td>
                                </tr>
                                {tournament.participants?.map((x) => (
                                    <tr key={x.id}>
                                        <td>{x.person.fullName}</td>
                                        <td>
                                        <div className='d-flex justify-content-end'>
                                        <Button className='px-1' style={{ borderRadius: '10px' }} size="sm" variant='danger' onClick={() => handleDeleteParticipant(x)}>
                                            <img src={bin} style={{ width: '18px', height: "auto" }} />
                                        </Button>
                                        </div>
                                        </td>
                                        {/* Add more columns based on your data structure */}
                                    </tr>
                                ))}
                            </thead>
                        </table>
                </Card.Body>
            </Card>
            <AddParticipantToTournamentDialog showFlag={showAddDialog} setShowFlag={setShowAddDialog} data={{tournamentId: tournament.id}} />
            <ConfirmationDialog 
                questionText='Ви впевнені, що хочете видалити цього учасника ?' 
                impact='Цю дію не можна буде відмінити'
                show={showConfirmationDialog}
                setShow={setShowConfirmationDialog}
                confirmationData={confirmationData}
                functionToContinue={onDelete}
            />
        </div>
    );
};

export default TournamentParticipantsCard;
