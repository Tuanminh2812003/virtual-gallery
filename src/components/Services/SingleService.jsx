import React from 'react';
import "./Services.css";

const SingleService = ({service}) => {
  return (
    <div className='item bg-dark translate-effect'>
        <span className='item-icon'>
            {service.icon}
        </span>
        <h4 className='item-title fs-25'>{service.title}</h4>
        <p className='fs-19 text'>{service.text}</p>
    </div>
  )
}

export default SingleService