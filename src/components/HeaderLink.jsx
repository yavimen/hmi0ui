import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderLink = ({ path, iconSource, width, hint, children }) => {
    const location = useLocation();
    const isSelected = location.pathname === (path);
    const linkStyle = {
        color: 'black',
        borderBottom: isSelected ? '2px solid black' : 'none', // Adjust the color and thickness as needed
        paddingBottom: '2px', // Adjust the padding as needed
        textDecoration: 'none', // Remove the default underline
    };
    return (
        <div className='d-flex align-items-center mx-2'>
            <div xs={6}>
                <img alt={path} src={iconSource} style={{ width: width ?? '22px', height: "auto" }} />
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
