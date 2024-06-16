import React from 'react';
import "./Testimonials.css";
import { BsArrowRightCircle } from "react-icons/bs";
import { MdStar } from "react-icons/md";
import MultipleItems from './partials/MultipleItems';
const gradient = "url(#blue-gradient)";

const TestimonialsPage = () => {

    let startList;
    const showRating = (starCount) => {
        startList = new Array(starCount);
        for (let i = 0; i < startList.length; i++) {
            startList[i] = <MdStar size={25} style={{ fill: gradient }} />;
        }
        return startList;
    }

    return (
        <section className='testimonials section-p bg-black' id="testimonials">
            <div className='container'>
                <div className='testimonials-content'>
                    <div className='section-t text-center'>
                        <h3>Featured 3D exhibitions</h3>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero alias voluptatum, tempore dignissimos perferendis ea.</p>
                    </div>
                    <MultipleItems />
                    <a href="#" className='btn-custom item-link text-grey'>
                        <h3>View More</h3>
                        <BsArrowRightCircle size={40} />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsPage
