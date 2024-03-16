import React from 'react';

import { Avatar } from '@mui/material';
import HeaderLink from './HeaderLink';

import fish from '../assets/fish.png';
import tournaments from '../assets/tournaments.png';
import profile from '../assets/profile.png';
import participants from '../assets/participants.png';
import wheater from '../assets/wheater.png';
import settings from '../assets/settings.png';
import help from '../assets/help.png';

const Navbar = () => {
    const colSize = null;
    return (
        <div className='d-flex justify-content-between align-items-center w-100 p-3' style={{ backgroundColor: '#D9D9D9' }}>
            <div className='d-flex align-items-center'>
                <div>
                    <img className='' src={fish} style={{ width: "40px", height: "40px" }} alt="Fish" />
                </div>
                <div className='ms-2'>
                    <HeaderLink path="/tournaments" iconSource={tournaments} hint="Тут ви можете переглянути турніри та додати нові">Турніри</HeaderLink>
                </div>
                <div className='ms-2'>
                    <HeaderLink path="/participants" iconSource={participants} width='28px' hint="Тут ви можете переглянути учасників та додати нові">Учасники</HeaderLink>
                </div>
                <div className='ms-2'>
                    <HeaderLink path="/wheather" iconSource={wheater} hint="Тут ви можете стежити за погодою">Погода</HeaderLink>
                </div>
                <div className='ms-2'>
                    <HeaderLink path="/settings" iconSource={settings} hint="Тут ви можете налаштувати систему">Налаштування</HeaderLink>
                </div>
                <div className='ms-2'>
                    <HeaderLink path="/help" iconSource={help} hint="Якщо вам щось не зрозуміло, то вам сюди">Допомога</HeaderLink>
                </div>
            </div>
            <div>
                <Avatar alt="User Logo" src={profile} style={{ marginRight: '16px' }} />
            </div>
        </div>
    );
};

export default Navbar;
