import '../../App.css';
import Navbar from '../../components/Navbar/Navbar';
import "../../assets/js/script";
import About from '../../components/About/About';
import Qualities from '../../components/Qualities/Qualities';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';
function HuyenWorkSpace(){
    return(
        <div className="App">
        <Navbar />
        <About />
        <Qualities />
        <Contact />
        <Footer />
      </div>
    )
}

export default HuyenWorkSpace;