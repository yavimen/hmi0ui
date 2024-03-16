import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useGlobalContext } from '../store/GlobalContext';
import { Link } from 'react-router-dom';
import help from '../assets/help.png';
import TournamentDialog from './TournamentDialog';

const TournamentsCard = () => {
    const cardStyle = { backgroundColor: "#F6F6F6", border: 'none' };
    const { globalData } = useGlobalContext();
    const { tournaments, seasons } = globalData;
    const [selectedSeason, setSelectedSeason] = useState(null);
    const linkStyle = {
        color: 'black',
        paddingBottom: '2px', // Adjust the padding as needed
        textDecoration: 'none', // Remove the default underline
    };
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between w-100'>
                        <div className='d-flex h6'>
                            <Link style={{ borderBottom: selectedSeason === null ? '2px solid black' : 'none', ...linkStyle }} onClick={() => setSelectedSeason(null)}>Усі сезони</Link>
                            {seasons.map((season) => (
                                <Link className='mx-2' style={{ borderBottom: season.id === selectedSeason?.id ? '2px solid black' : 'none', ...linkStyle }} key={season.id} onClick={() => setSelectedSeason(season)}>
                                    {season.name}
                                </Link>
                            ))}
                        </div>
                        <div><Button style={{ borderRadius: '15px' }} size="sm" variant='success' onClick={() => setShowModal(true)}>+ Додати турнір</Button></div>
                    </Card.Title>
                        <table className='w-100'>
                            <thead>
                                <tr style={{ borderBottom: "1px solid black" }}>
                                    <td>Назва</td>
                                    <td>Локація</td>
                                    <td>Сезон</td>
                                    <td>Вид риболовлі</td>
                                    <td>Зареєстрованих учасників</td>
                                    <td></td>
                                </tr>
                                {tournaments.filter(x => selectedSeason ? x.season.id === selectedSeason.id : true).map((x) => (
                                    <tr key={x.id}>
                                        <td>{x.name}</td>
                                        <td>{x.location.name}</td>
                                        <td>{x.season.name}</td>
                                        <td>{x.type.name}</td>
                                        <td>{x.participants.length}</td>
                                        <td><Link title='Перейти на сторінку з повною інформацією про турнір' onClick={() => {}} to={''+x.id}><img src={help} style={{ width: '22px', height: "auto" }} /></Link></td>
                                        {/* Add more columns based on your data structure */}
                                    </tr>
                                ))}
                            </thead>
                        </table>
                </Card.Body>
            </Card>
            <TournamentDialog showFlag={showModal} setShowFlag={setShowModal} />
        </div>
    );
};

export default TournamentsCard;
