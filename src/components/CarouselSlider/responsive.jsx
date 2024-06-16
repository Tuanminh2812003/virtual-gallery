import React from "react";
import Slider from "react-slick";
import data from "../../constants/data";
import "./Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Responsive() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="portfolio section-p bg-dark">

            <div className='section-t text-center'>
                <h3>Our Art</h3>
                <p className='text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet corrupti laboriosam fugit expedita inventore temporibus!</p>
            </div>

            <div className='container price text-center'>
                <Slider {...settings}>
                    {
                        data.portfolio.map((feature, index) => {
                            return (
                                <div className="bannerSlider__item" key={index} style={{ with: `20px`}}>
                                    <div className='item-img'>
                                        <img src={feature.image} alt="" />
                                    </div>
                                    <h4 className='item-name' style={{ color: `#fff` }}>{feature.name}</h4>
                                    <p className='item-text text'>{feature.text}</p>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

export default Responsive;
