import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import LocationsCard from '../locations/LocationsCard';
import { Container, Row, Col } from 'react-bootstrap';
const SettingsPage = () => {

    const breadcrumbItems = [{text: 'Налаштування', link: null}];

    return (
        <div className='py-2 px-5'>
            <Breadcrumb className='mb-2' items={breadcrumbItems}/>
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <LocationsCard/>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SettingsPage;
