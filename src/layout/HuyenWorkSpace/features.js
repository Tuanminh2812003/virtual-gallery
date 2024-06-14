import '../../App.css';
import Navbar from '../../components/Navbar/Navbar';
import "../../assets/js/script";
import PortfolioItem from '../../components/Portfolio/partials/portfolioItem';
import Testimonials from '../../components/Testimonials/partials/Testimonials';
import Footer from '../../components/Footer/Footer';
function HuyenWorkSpace() {
    return (
        <div className="App">
            <Navbar />
            <section className='section-p bg-black'>
                <div className='container'>
                    <h3 className='section-t' style={{ color: `#fff` }}>Featured 3D exhibitions</h3>
                    <p style={{ color: `#fff`, textAlign: `left` }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero alias voluptatum, tempore dignissimos perferendis ea.</p>
                    <Testimonials />
                </div>
            </section>
            <section className='portfolio section-p bg-dark' id="portfolio">
                <div className='container'>
                    <div className='portfolio-content'>
                        <h3 className='section-t' style={{ color: `#fff`, textAlign: `left` }}>Our Art</h3>
                        <p style={{ color: `#fff`, textAlign: `left` }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero alias voluptatum, tempore dignissimos perferendis ea.</p>
                        <PortfolioItem />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default HuyenWorkSpace;