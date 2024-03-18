import React, { useState } from 'react';
import TournamentsCard from '../tournaments/TournamentsCard';
import Breadcrumb from '../components/Breadcrumb';
const TournamentPage = () => {

    const [selectedSeasonBreadcrumb, setSelectedSeasonBreadcrumb] = useState(null);

    const breadcrumbItems = [{text: 'Турніри', link: null}, selectedSeasonBreadcrumb];

    return (
        <div className='py-2 px-5'>
            <Breadcrumb className='mb-2' items={breadcrumbItems}/>
            <TournamentsCard selectedSeasonBreadcrumb={selectedSeasonBreadcrumb} setSelectedSeasonBreadcrumb={setSelectedSeasonBreadcrumb}/>
        </div>
    );
};

export default TournamentPage;
