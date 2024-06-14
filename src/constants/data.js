import images from "./images";
import { FaPaperPlane, FaRocket, FaFileAlt, FaPhoneAlt, FaEnvelopeOpen, FaMapMarkerAlt } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";

const gradient = "url(#blue-gradient)";

const bannerSlider = [

    {
        url: images.banner1,
        name: "Dam cuoi chuot",
        text: "The staff and support are second to none. They are polished, proficient, accessible and patient.",
    },
    {
        url: images.banner2,
        name: "Lon dan gian",
        text: "The staff and support are second to none. They are polished, proficient, accessible and patient.",
    },
    {
        url: images.banner3,
        name: "Ga Dong Hoa",
        text: "The staff and support are second to none. They are polished, proficient, accessible and patient.",
    }
];
const services = [
    {
        id: 1,
        icon: <FaPaperPlane style={{ fill: gradient }} />,
        title: "Virtual Reality",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 2,
        icon: <BiDollarCircle style={{ fill: gradient }} />,
        title: "Art Gallery",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 3,
        icon: <FaRocket style={{ fill: gradient }} />,
        title: "Creative Exploring",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
]
const items = [
    {
        id: 1,
        title: "30days Free Trial",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 2,
        title: "Basic 12USD/month",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 3,
        title: "Medium 30USD/month",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 4,
        title: "Profession 60USD/month",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    }
];

const about = [
    {
        id: 7,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus leo et diam fermentum ullamcorper. Nulla venenatis nibh sollicitudin tincidunt gravida. Nam convallis justo et ligula luctus suscipit. Etiam eu nisi turpis. Donec sollicitudin accumsan quam, rhoncus sagittis metus semper quis. Praesent convallis mauris sed ipsum lobortis facilisis. Nulla cursus sem non nunc sagittis, a volutpat mauris lobortis. Nulla ut feugiat tellus. Nam dictum nisi nec scelerisque auctor"
    }
]

const qualities = [
    {
        id: 8,
        icon: <FaFileAlt style={{ fill: gradient }} />,
        title: "Ideas & Plans",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod."
    },
    {
        id: 9,
        icon: <AiOutlineReload style={{ fill: gradient }} />,
        title: "Prompt Strategies",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod."
    }
];

const features = [
    {
        id: 10,
        title: "Digital Marketing",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 11,
        title: "Trade Shows",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 12,
        title: "Branding",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 13,
        title: "Content Creation",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 14,
        title: "Graphic Design",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    },
    {
        id: 15,
        title: "Media Buying",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vitae lectus convallis scelerisque. Cras vestibulum blandit lorem, at fringilla nisl sollicitudin ac. Nunc venenatis nec neque sed semper. Mauris viverra, sapien sed fringilla egestas, sem felis condimentum augue, vitae sodales sem metus in ex. Aenean massa velit, sollicitudin quis elementum sit amet, vehicula sed nunc."
    }
];

const portfolio = [
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_1,
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_2,
    },
    {
        id: 3,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_3,
    },
    {
        id: 4,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_4,
    },
    {
        id: 5,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_5,
    },
    {
        id: 6,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_6,
    },
    {
        id: 7,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_7,
    },
    {
        id: 8,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elits",
        image: images.art_8,
    }
];

const testimonials = [
    {
        id: 19,
        name: "AZZOLINO GALLERY",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.art_1,
    },
    {
        id: 20,
        name: "CROOKED PAINTBRUSH",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.art_2,
    },
    {
        id: 21,
        name: "GALLERYONE",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.art_3,
    },
    {
        id: 22,
        name: "Jason Stawer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.art_4,
    },
    {
        id: 23,
        name: "Lisa Green",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.art_5,
    },
    {
        id: 24,
        name: "Life meaning",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        image: images.art_6,
    }
]

const contact = [
    {
        id: 25,
        icon: <FaPhoneAlt style={{ fill: gradient }} />,
        info: "+84 555 555 555",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 26,
        icon: <FaEnvelopeOpen style={{ fill: gradient }} />,
        info: "multimeiaptit@info.com",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    },
    {
        id: 27,
        icon: <FaMapMarkerAlt style={{ fill: gradient }} />,
        info: "Thanh Xuan, Ha Noi",
        text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing"
    }
]

const sections = { bannerSlider, services, about, qualities, features, portfolio, testimonials, contact, items};

export default sections;