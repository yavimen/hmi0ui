import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TournamentDetailCard from '../tournaments/TournamentDetailCard';
import TournamentParticipantsCard from '../participants/TournamentParticipantsCard';
import LocationDetailCard from '../locations/LocationDetailCard';
const TournamentDetailPage = () => {
    return (
        <Container fluid className='py-2 px-5'>
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
