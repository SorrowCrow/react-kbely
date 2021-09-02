import React from "react";

const AboutBlock = () => {
    function magnifyingGlassClick() {
        window.scrollTo({
            top: document.getElementById("cover").offsetTop,
            behavior: "smooth",
        });
        document.getElementById("sliderInit").click();
    }

    return (
        <div className="AboutBlock x-hidden mx-auto">
            <div className="title-container grid">
                <div className="title" id="about">
                    O nás
                </div>
                <div className="sub-title">Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.</div>
                <div className="background flex relative content-flex-end">
                    <div className="MagnifyingGlass relative align-self-end grid h-p" onClick={magnifyingGlassClick}>
                        <svg className="m-auto">
                            <use href="#magnifyingGlass" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="services mx-auto relative grid content-space-between max-content">
                <div className="services__item grid content-center text-center">
                    <svg className="frame1">
                        <use href="#frame1" />
                    </svg>
                    Vířivka
                </div>
                <div className="services__item grid content-center text-center">
                    <svg className="frame2">
                        <use href="#frame2" />
                    </svg>
                    Sauna
                </div>
                <div className="services__item grid content-center text-center">
                    <svg className="frame3">
                        <use href="#frame3" />
                    </svg>
                    Bazén
                </div>
                <div className="services__item grid content-center text-center">
                    <svg className="frame4 m-auto">
                        <use href="#frame4" />
                    </svg>
                    Odpočívárna
                </div>
            </div>
        </div>
    );
};

export default AboutBlock;
