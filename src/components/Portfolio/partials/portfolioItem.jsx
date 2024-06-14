import React from 'react';
import "../Portfolio.css";
import sections from '../../../constants/data';

const PortfolioItem = () => {
    return (
        <div className='item-list text-center text-white grid'>
            {
                sections.portfolio.map(portfolio => {
                    return (
                        <div className='item flex flex-center flex-column translate-effect' key={portfolio.id} style={{
                            background: `url(${portfolio.image})`
                        }}>
                            <div className='item-title fs-25 fw-6'>{portfolio.title}</div>
                            <div className='text text-white'>{portfolio.text}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PortfolioItem
