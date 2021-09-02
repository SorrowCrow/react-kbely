import React, { useEffect } from "react";
import { tns } from "tiny-slider/src/tiny-slider.js";
import { Helmet } from "react-helmet";
import "tiny-slider/dist/tiny-slider.css";
import image from "../../assets/background.webp";

const Slider = ({ isSlider }) => {
    useEffect(() => {
        tns({
            container: ".block__slider",
            items: 1,
            slideBy: "page",
            mouseDrag: true,
            center: true,
            speed: 400,
            nav: false,
            controlsContainer: ".block__sliderButtons",
        });
    }, []);

    return (
        <>
            <Helmet>
                <link rel="preload" as="image" href={image} />
            </Helmet>
            <div className={`slider__wrap relative ${isSlider ? "unHiddenForSlide" : ""}`}>
                <div className="block__slider relative flex content-center">
                    <img className="w-100" src={image} alt="" />
                    <img className="w-100" src={image} alt="" />
                </div>
                <div className="background absolute w-100 h-100"></div>
                <div className="absolute t-0 w-100 h-100 align-center flex">
                    <div className="block__sliderButtons flex relative content-between align-center w-100 mx-auto">
                        <div className={`block__sliderButtons-nextBtn relative grid ${isSlider ? "" : "invisible"}`}>
                            <svg className="m-auto">
                                <use href="#arrowScroll" />
                            </svg>
                        </div>
                        <div className={`block__sliderButtons-prevBtn relative grid ${isSlider ? "" : "invisible"}`}>
                            <svg className="m-auto">
                                <use href="#arrowScroll" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Slider };
