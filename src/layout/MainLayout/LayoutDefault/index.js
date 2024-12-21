import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";

function LayoutDefault(){
    return(
        <>
            <div className="Web">
                <header>
                    <div className="Web__header">
                        <div className="container-main">
                            <div className="Web__header__inner">
                                <div className="Web__header__inner__logo">
                                    VIRTUAL GALLERY
                                </div>
                                <div className="Web__header__inner__menu">
                                    <ul>
                                        <li>
                                            Danh sách không gian
                                        </li>
                                        <li>
                                            Về chúng tôi
                                        </li>
                                        <li>
                                            Liên hệ
                                        </li>
                                    </ul>
                                </div>
                                <div className="Web__header__inner__extend">
                                    <div className="Web__header__inner__extend__dangky">
                                        ĐĂNG KÝ
                                    </div>
                                    <div className="Web__header__inner__extend__dangnhap">
                                        ĐĂNG NHẬP
                                    </div>
                                    <div className="Web__header__inner__extend__icon">
                                        <IoMdSearch />
                                    </div>
                                    <div className="Web__header__inner__extend__icon">
                                        <AiOutlineGlobal />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    <Outlet/>
                </main>

                <footer>
                    <div className="Web__footer">
                        <div className="container-main">
                            <div className="Web__footer__inner">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="Web__footer__inner__logo">
                                            VIRTUAL GALLERY
                                        </div>
                                        <div className="Web__footer__inner__contact">
                                            <div className="Web__footer__inner__contact__icon">
                                                <FaPhoneAlt />
                                            </div>
                                            <div className="Web__footer__inner__contact__text">
                                                0123 456 789
                                            </div>
                                        </div>
                                        <div className="Web__footer__inner__contact">
                                            <div className="Web__footer__inner__contact__icon">
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div className="Web__footer__inner__contact__text">
                                                Đống Đa, Hà Nội, Việt Nam
                                            </div>
                                        </div>
                                        <div className="Web__footer__inner__contact">
                                            <div className="Web__footer__inner__contact__icon">
                                                <MdOutlineEmail />
                                            </div>
                                            <div className="Web__footer__inner__contact__text">
                                                email@gmail.com
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="Web__footer__inner__title">
                                            DANH SÁCH KHÔNG GIAN
                                        </div>
                                        <div className="Web__footer__inner__text">
                                            Đêm đầy sao
                                        </div>
                                        <div className="Web__footer__inner__text">
                                            Kỳ quan thiên nhiên
                                        </div>
                                        <div className="Web__footer__inner__text">
                                            Nơi tình yêu bắt đầu
                                        </div>
                                        <div className="Web__footer__inner__text">
                                            Cầu vòng lấp lánh
                                        </div>
                                        <div className="Web__footer__inner__text">
                                            Ánh sao và bầu trời
                                        </div>
                                        <div className="Web__footer__inner__text">
                                            Màu của nắng
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="Web__footer__inner__title">
                                            VỀ CHÚNG TÔI
                                        </div>
                                        <div className="Web__footer__inner__title">
                                            LIÊN HỆ VỚI CHÚNG TÔI
                                        </div>
                                        <div className="Web__footer__inner__icon">
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaFacebook />
                                            </div>
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaFacebook />
                                            </div>
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaFacebook />
                                            </div>
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaFacebook />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
export default LayoutDefault;