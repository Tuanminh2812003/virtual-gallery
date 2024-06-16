import React from "react";
import data from "../../../constants/data";
import "../Slider.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = () => {
    let settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
            <Slider {...settings}>
                {
                    data.bannerSlider.map((banner, index) => {
                        return (
                            <div className="bannerSlider__item" key={index}>
                                <img src={banner.url} alt="" />
                                <p className="para__text">
                                    {banner.text}
                                </p>
                                <p className="text__upper text fw__5 ls__2">{banner.name}</p>
                            </div>
                        )
                    })
                }
            </Slider>
    )
}

export default SimpleSlider;