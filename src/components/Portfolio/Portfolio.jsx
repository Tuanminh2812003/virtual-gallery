import React from 'react';
import "./Portfolio.css";
import PortfolioItem from "./partials/portfolioItem"
import { BsArrowRightCircle } from "react-icons/bs";


const Portfolio = () => {
    return (
        <section className='portfolio section-p bg-dark' id="portfolio">
            <div className='container text-center'>
                <div className='portfolio-content'>
                    <div className='section-t text-center'>
                        <h3>Our Art</h3>
                        <p className='text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet corrupti laboriosam fugit expedita inventore temporibus!</p>
                    </div>
                    <PortfolioItem />
                </div>
                <a href="/features" className='btn-custom flex item-link text-grey'>
                    <h3>View More</h3>
                    <BsArrowRightCircle size={40} />
                </a>
            </div>
        </section>
    )
}

export default Portfolio
