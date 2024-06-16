import '../../App.css';
import Navbar from '../../components/Navbar/Navbar';
import "../../assets/js/script";
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';
function HuyenWorkSpace(){
    return(
        <div className="App">
        <Navbar />
        <Contact />
        <Footer />
      </div>
    )
}

export default HuyenWorkSpace;