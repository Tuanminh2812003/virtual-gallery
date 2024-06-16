import React from 'react';
import "../Testimonials.css";
import sections from '../../../constants/data';
import { BsArrowRightCircle } from "react-icons/bs";
import { MdStar } from "react-icons/md";

const gradient = "url(#blue-gradient)";

const Testimonials = () => {

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
                    <div className='item-list grid text-white text-center'>
                        {
                            sections.testimonials.map(testimonial => {
                                showRating(testimonial.rating);
                                return (
                                    <div className='item translate-effect bg-dark' key={testimonial.id}>
                                        <div className='item-img'>
                                            <img src={testimonial.image} alt="" />
                                        </div>
                                        <h4 className='item-name'>{testimonial.name}</h4>
                                        <p className='item-text text'>{testimonial.text}</p>
                                        <a href="/" className='item-link text-grey'>
                                            <BsArrowRightCircle size={40} />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
