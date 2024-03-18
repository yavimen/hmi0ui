import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate  } from 'react-router-dom';
import TournamentDetailCard from '../tournaments/TournamentDetailCard';
import TournamentParticipantsCard from '../participants/TournamentParticipantsCard';
import LocationDetailCard from '../locations/LocationDetailCard';
import Breadcrumb from '../components/Breadcrumb';
import { useGlobalContext } from '../store/GlobalContext';

const TournamentDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { globalData} = useGlobalContext();
    const tournament = globalData.tournaments.find(x => x.id == id);
    if (!tournament) {
        navigate('/not-found');
        return null;
    }

    const breadcrumbItems = [
        {
            text: 'Турніри',
            link: '/tournaments',
            hint: 'Повернутися до огляду турнірів'
        },
        {
            text: tournament.name,
            link: `/tournaments/${tournament.id}`
        },
    ]
    return (
        <Container fluid className='py-2 px-5'>
            <Breadcrumb className='mb-2' items={breadcrumbItems}/>
            <Row>
                <Col>
                    <TournamentDetailCard />
                </Col>
                <Col>
                    <LocationDetailCard />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col sm={6}>
                    <TournamentParticipantsCard />
                </Col>
            </Row>
        </Container>
    );
};

export default TournamentDetailPage;
