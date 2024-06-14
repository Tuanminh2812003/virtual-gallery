import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer section__padding bg__dark">
      <div className="container">
        <div className="footer__content grid text__light text__center">
          <div className="footer__content--item">
            <a href="#" className="footer__navlink">Multimedia Dev, Ptit</a>
            <p className="para__text">&copy; 2024 Dev. Multimedia Ptit All rights reserved. Designed by Virtual Team.</p>
          </div>

          <div className="footer__content--item">
            <a href="mailto:someone@gmail.com">virtualgallery@gmail.com </a>
            <span>+84 555 555 555</span>
          </div>

          <div className="footer__content--item">
            <h3 className="footer__title">Services</h3>
            <ul className="footer__links">
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
            </ul>
          </div>

          <div className="footer__content--item">
            <h3 className="footer__title">Contact</h3>
            <ul className="footer__links">
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer__content--item">
            <h3 className="footer__title">Social LInks</h3>
            <ul className="footer__links">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;