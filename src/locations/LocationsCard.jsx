import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useGlobalContext } from '../store/GlobalContext';
import bin from '../assets/bin.png';
import pen from '../assets/pen.png';
import ConfirmationDialog from '../components/ConfirmationDialog';
import LocationDialog from './LocationDialog';

const LocationsCard = () => {
    const cardStyle = { backgroundColor: "#F6F6F6", border: 'none' };
    const { globalData, deleteLocation, addToastMessage } = useGlobalContext();
    const { locations, tournaments } = globalData;
    const [showModal, setShowModal] = useState(false);
    const [confirmationData, setConfirmationData] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const handleDeleteLocation = (item) => {
        setConfirmationData(item);
        setShowConfirmationDialog(true);
    }
    const onDelete = (confirmed, item) => {
        setTimeout(() => {
            if (tournaments.some(x => x.location.id === item.id)) {
                addToastMessage({ 
                    variant: 'danger', 
                    header: 'Невдача', 
                    text: `Локацію ${item.name} не було видалено через те, є турніри, які використовують її`
                })
            }
            else {
                deleteLocation(item);
                addToastMessage({ variant: 'success', header: 'Успіх', text: 'Локацію успішно видалено' })
            }
        }, 700);
    }

    const [editedItem, setEditItem] = useState(null);
    const handleEdit = (item) => {
        setEditItem(item);
        setShowModal(true);
    }

    return (
        <div>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between w-100'>
                        <div className='d-flex h6'>
                            Локації
                        </div>
                        <div><Button style={{ borderRadius: '15px' }} size="sm" variant='success' onClick={() => setShowModal(true)}>+ Додати локацію</Button></div>
                    </Card.Title>
                    <table className='w-100'>
                        <thead>
                            <tr style={{ borderBottom: "1px solid black" }}>
                                <td>Назва</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((x) => (
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                    <td>
                                        <div className='d-flex justify-content-end'>
                                            <div className='mx-2'>
                                                <Button className='px-1' style={{ borderRadius: '10px' }} variant='light' size="sm" onClick={() => handleEdit(x)}>
                                                    <img src={pen} style={{ width: '20px', height: "auto" }} alt={x.id} />
                                                </Button>
                                            </div>
                                            <div>
                                                <Button className='px-1' style={{ borderRadius: '10px' }} size="sm" variant='danger' onClick={() => handleDeleteLocation(x)}>
                                                    <img src={bin} style={{ width: '18px', height: "auto" }} alt={x.id} />
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Add more columns based on your data structure */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
            <LocationDialog showFlag={showModal} setShowFlag={setShowModal} data={editedItem} setData={setEditItem}  />
            <ConfirmationDialog
                questionText='Ви впевнені, що хочете видалити цю локацію ?'
                impact='Цю дію не можна буде відмінити'
                show={showConfirmationDialog}
                setShow={setShowConfirmationDialog}
                confirmationData={confirmationData}
                functionToContinue={onDelete}
            />
        </div>
    );
};

export default LocationsCard;
