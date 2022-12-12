import React from "react";
import "./footer.css";

const Footer = () => (
  <div className="footer">
    <div className="footer__section">
        <div className="footer__section-contact">
            <h3>Ongelmista sovelluksen käytössä voi ilmoittaa:</h3>
            <div><a href="mailto:tvt.sanasto@gmail.com">tvt.sanasto@gmail.com</a></div>
        </div>
        <div className="footer__section-sources">
            <h3>Sovelluksen sanastojen lähteet:</h3>
            <div>Lähteet sanastoihin:</div>
                <a href="https://gitlab.com/sanasto/comp-basic">
                https://gitlab.com/sanasto/comp-basic
                </a>
                <a href="https://gitlab.com/sanasto/internet-basic">
                https://gitlab.com/sanasto/internet-basic
                </a>
            </div>

        
    </div><div className="footer__section-copyright">
            <p>© 2022 Stefan Ylimäki. All rights reserved.</p>
        </div>
  </div>
);

export default Footer;
