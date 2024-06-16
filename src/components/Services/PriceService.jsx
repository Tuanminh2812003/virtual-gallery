import React from 'react';
import "./Services.css";
import data from "../../constants/data";
import SingleService from './SingleService';

const PriceService = () => {
  return (
    <section className='services section-p bg-md-black' id = "services">
        <div className='container'>
            <div className='services-content'>
                <svg width = "1em" height = "1em">
                    <linearGradient id = "blue-gradient" x1 = "100%" y1 = "100%" x2 = "0%" y2 = "0%">
                        <stop stopColor = "#55b3d5" offset="0%" />
                        <stop stopColor = "#5764de" offset = "100%" />
                    </linearGradient>
                </svg>

                <div className='item-list-price grid text-white text-center'>
                    {
                        data.items.map(item => {
                            return (
                                <SingleService service = {item} key = {item.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default PriceService