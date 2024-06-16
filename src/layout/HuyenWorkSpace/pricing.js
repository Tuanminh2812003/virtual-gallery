import '../../App.css';
import Navbar from '../../components/Navbar/Navbar';
import "../../assets/js/script";
import PriceService from '../../components/Services/PriceService';
import Services from '../../components/Services/Services';
import Features from '../../components/Features/Features';
import Footer from '../../components/Footer/Footer';
function HuyenWorkSpace(){
    return(
        <div className="App">
        <Navbar />
        <PriceService />
        <Services />
        <Features />
        <Footer />
      </div>
    )
}

export default HuyenWorkSpace;