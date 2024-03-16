import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useGlobalContext } from '../store/GlobalContext';
import { Link } from 'react-router-dom';
import bin from '../assets/bin.png';
import { useParams  } from 'react-router-dom';

const TournamentParticipantsCard = () => {
    const { globalData } = useGlobalContext();
    const { id } = useParams();
    const tournament = globalData.tournaments.find(x => x.id == id);
    const cardStyle = { backgroundColor: "#F6F6F6", border: 'none' };
    return (
        <div>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between w-100'>
                        <div>Учасники</div>
                        <div><Button style={{ borderRadius: '15px' }} size="sm" variant='success' onClick={() => {}}>+ Додати учасника</Button></div>
                    </Card.Title>
                        <table className='w-100'>
                            <thead>
                                <tr style={{ borderBottom: "1px solid black" }}>
                                    <td>Учасник</td>
                                    <td></td>
                                </tr>
                                {tournament.participants.map((x) => (
                                    <tr key={x.id}>
                                        <td>{x.person.fullName}</td>
                                        <td></td>
                                        {/* Add more columns based on your data structure */}
                                    </tr>
                                ))}
                            </thead>
                        </table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TournamentParticipantsCard;
