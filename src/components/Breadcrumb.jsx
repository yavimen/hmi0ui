import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderLink = ({ items }) => {
    return (
        <div className='d-flex align-items-center mx-2'>
            <div xs={6}>
                <img src={iconSource} style={{ width: width ?? '22px', height: "auto" }} />
            </div>
            <div className='p-0' xs={6}>
                <Link to={path} style={linkStyle} title={hint}>
                    {children}
                </Link>
            </div>
        </div>
    );
};

export default HeaderLink;
