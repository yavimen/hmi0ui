import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useGlobalContext } from '../store/GlobalContext';
import Breadcrumb from '../components/Breadcrumb';
import SearchableSelect from '../components/SearchComponent';
const WheatherPage = () => {
    const cardStyle = { backgroundColor: "#F6F6F6", border: 'none' };
    const { globalData } = useGlobalContext();
    const { locations } = globalData;
    const breadcrumbItems = [{ text: 'Погода', link: null }];

    const [selectedLocation, setSelectedLocation] = useState(null)

    // Generate random weather data
    const temperature = Math.floor(Math.random() * (30 - 4 + 1)) + 4;
    const statusOptions = ['Сонячно', 'Дощить', 'Перемінно'];
    const conditionOptions = ['Хороші', 'Погані', 'Середні'];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const condition = conditionOptions[Math.floor(Math.random() * conditionOptions.length)];

    return (
        <div className='py-2 px-5'>
            <Breadcrumb className='mb-2' items={breadcrumbItems} />
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>
                    </Card.Title>
                    <div className='d-flex justify-content-center w-100'>
                        <SearchableSelect options={locations} onSelect={(e) => setSelectedLocation(e)} />
                    </div>
                    {selectedLocation &&
                        <div>
                            <h6>{selectedLocation?.name}</h6>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h2>{temperature}°C</h2>
                                    <p>Стутус: {status}</p>
                                    <p>Умови для риболовлі: {condition}</p>
                                </div>
                                <div>
                                    <img
                                        src={`https://via.placeholder.com/150?text=${status}`} // Placeholder image for weather status
                                        alt={status}
                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                    />
                                </div>
                            </div>
                        </div>}
                </Card.Body>
            </Card>
        </div>
    );
};

export default WheatherPage;
