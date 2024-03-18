import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ items, className }) => {
    /*  items
        масив
        назва*, лінк*, підказка, активний ?
     */
    const linkStyle = {
        color: 'black',
        paddingBottom: '2px', // Adjust the padding as needed
        textDecoration: 'none', // Remove the default underline
    };
    return (
        <div className={'d-flex align-items-center mx-2 '+className}>
            {
                items.filter(x => x).map((x, index) => (
                    <div className='p-0' key={x.name}>
                        <Link className='mx-2' to={x.link} style={linkStyle} title={x.hint}>
                            {x.text}
                        </Link>
                        { index !== items.filter(x => x).length - 1 ? <>/</> : null }
                    </div> 
                ))
            }
        </div>
    );
};

export default Breadcrumb;
