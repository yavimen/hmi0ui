import React from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import pen from '../assets/pen.png';
import { useGlobalContext } from '../store/GlobalContext';
import { Col, Row } from 'react-bootstrap';
const LocationDetailCard = () => {
    const { globalData } = useGlobalContext();
    const cardStyle = { backgroundColor: "#F6F6F6", border: 'none' };
    const { id } = useParams();
    const location = globalData.tournaments.find(x => x.id == id).location;
    return (
        <div>
        <Card style={cardStyle}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between w-100'>
                <div>{location.name}</div>
                </Card.Title>
                <div className='d-flex justify-content-center'>
                    <div>
                        <img src={location.imageUrl} alt='зображення локації'/> 
                    </div>
                </div>    
                <Row className='mb-2'>
                    <Col sm={12} className='fw-bold'>Опис:</Col>
                    <Col>
                        <Card.Text>{location.description}</Card.Text>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
        </div>
    );
};

export default LocationDetailCard;
