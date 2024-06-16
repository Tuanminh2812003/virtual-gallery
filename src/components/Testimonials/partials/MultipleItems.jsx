import React from "react";
import Slider from "react-slick";
import data from "../../../constants/data";
// import "../Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MultipleItems() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {
                    data.testimonials.map((feature, index) => {
                        return (
                            <div className="bannerSlider__item" key={index}>
                                <div className='item-img'>
                                    <img src={feature.image} alt="" />
                                </div>
                                <h4 className='item-name' style={{color: `#fff`}}>{feature.name}</h4>
                                <p className='item-text text'>{feature.text}</p>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}

export default MultipleItems;
