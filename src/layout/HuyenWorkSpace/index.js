import '../../App.css';
import Header from '../../components/Header/Header';
import "../../assets/js/script";
import Responsive from '../../components/CarouselSlider/responsive';
import TestimonialsPage from '../../components/Testimonials/TestimonialsPage';
import Services from '../../components/Services/Services';
import WorkProcess from '../../components/WorkProcess/WorkProcess'
import PriceService from '../../components/Services/PriceService';
import Footer from '../../components/Footer/Footer';
function HuyenWorkSpace() {
    return (
        <div className="App">
            <Header />
            <TestimonialsPage />
            <Services />
            <Responsive />
            <WorkProcess />
            <PriceService />
            <Footer />
        </div>
    )
}

export default HuyenWorkSpace;