import React from "react";
import SimpleSlider from "./partials/SimpleSlider";
import { BsArrowRightCircle } from "react-icons/bs";
import "./Slider.css";

const BannerSlider = () => {
    return (
        <div className="container bannerSlider bg__blue section__padding">
            <div className='section-t text-center'>
                <h3>Featured Art Products</h3>
                <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero alias voluptatum, tempore dignissimos perferendis ea.</p>
            </div>
            <div className="bg__blue section__padding w-100">
            <SimpleSlider />
            </div>
        </div>

    )
}

export default BannerSlider;