import logo from "../../assets/icon.svg";
import React from "react";
import { useResponsive } from "../../DimensionsContext";

const Header = ({ toggleMenuChange }) => {
    const displayMenu = useResponsive().displayMenu;
    let logoText, info;
    if (displayMenu) {
        logoText = <div className="header__logo-text relative">Sauna Kbely</div>;
        info = (
            <div className="header__contacts content-between flex">
                <div className="header__contacts-item flex">
                    <svg>
                        <use href="#clock" />
                    </svg>
                    <div>08:00—22:00</div>
                </div>
                <div className="header__contacts-item flex">
                    <svg>
                        <use href="#location" />
                    </svg>
                    <a className="text-decoration-none" href="https://www.google.com/maps/place/Krnská+350,+197+00+Kbely,+Czechia/@50.1286805,14.5498908,19z" target="_blank" rel="noreferrer">
                        Krnska 350/26, Praha 19700
                    </a>
                </div>
                <div className="header__contacts-item flex">
                    <svg>
                        <use href="#phone" />
                    </svg>
                    <a className="text-decoration-none" href="tel:+420 286 851 738">
                        +420 286 851 738
                    </a>
                </div>
            </div>
        );
    } else {
        info = (
            <svg className="header__menu h-p" onClick={toggleMenuChange}>
                <use href="#headerMenu" />
            </svg>
        );
    }
    return (
        <div className="header__wrap flex content-between mx-auto align-center">
            <div className="header__logo flex">
                <img className={`relative float-left ${displayMenu ? "header__logo-icon" : "header__logo-iconBig"}`} src={logo} alt="React Logo" />
                {logoText}
            </div>
            {info}
        </div>
    );
};

export { Header };
