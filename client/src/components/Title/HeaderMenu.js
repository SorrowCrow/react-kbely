import React, { useEffect } from "react";
import logo from "../../assets/icon.svg";

const HeaderMenu = ({ toggleMenuChange }) => {
    useEffect(() => {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        return () => {
            document.getElementsByTagName("body")[0].style.overflow = "";
        };
    }, []);

    function scroll(id) {
        toggleMenuChange();
        window.scrollTo({
            top: document.querySelector(id).offsetTop,
            behavior: "smooth",
        });
    }

    return (
        <div className="headerMenu scroll-hidden y-scroll fixed">
            <div className="headerMenu__header flex content-between align-center">
                <img className={`headerMenu__header-icon`} src={logo} alt="React Logo" />
                <div className="headerMenu__header-time">08:00—22:00</div>
                <div className="ReservationExit flex relative content-center align-center h-p" onClick={toggleMenuChange}>
                    <svg>
                        <use href="#cross" />
                    </svg>
                </div>
            </div>
            <div className="headerMenu__scrolls grid content-center">
                <div className="text-center h-p" onClick={() => scroll("#about")}>
                    O nás
                </div>
                <div className="text-center h-p" onClick={() => scroll("#book")}>
                    Rezervace
                </div>
                <div className="text-center h-p" onClick={() => scroll("#giftCards")}>
                    Dárkové poukazy
                </div>
                <div className="text-center h-p" onClick={() => scroll("#reference")}>
                    Reference
                </div>
            </div>
            <a className="mx-auto headerMenu__number text-decoration-none block h-fit-content text-center max-content" href="tel:+420 286 851 738">
                +420 286 851 738
            </a>
            <div className="sub-title grid text-center">
                Krnska 350/26, Praha 19700
                <a className="mx-auto headerMenu__email text-decoration-none" href="mailto:sauna@marieluisa.cz">
                    sauna@marieluisa.cz
                </a>
            </div>
            <div className="mx-auto headerMenu__links flex min-content">
                <a className="text-decoration-none h-p inline-block" href="https://facebook.com" target="_blank" rel="noreferrer">
                    <svg>
                        <use href="#facebook" />
                    </svg>
                </a>
                <a className="text-decoration-none h-p inline-block" href="https://instagram.com" target="_blank" rel="noreferrer">
                    <svg>
                        <use href="#instagram" />
                    </svg>
                </a>
            </div>
        </div>
    );
};
export { HeaderMenu };
