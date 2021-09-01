import { Header } from "./Title/Header";
import { HeaderMenu } from "./Title/HeaderMenu";
import { Slider } from "./Title/Slider";
import { Menu } from "./Title/Menu";
import React, { useState } from "react";
import { useResponsive } from "../DimensionsContext";

const Title = () => {
    // const responsive = useResponsive().is;
    const isMd = useResponsive().isMd;
    function toggleMenuChange() {
        setIsMenu(!isMenu);
    }

    function titleClick() {
        if (!isMd) {
            setIsSlider(!isSlider);
        }
    }

    function rezervaceClick() {
        if (isMd) {
            window.scrollTo({
                top: document.querySelector("#book").offsetTop,
                behavior: "smooth",
            });
        }
    }

    let header, menu, slider, sliderInit;
    const sliderInitContent = (
        <>
            <div className={`title-privatni relative fit-content ${isMd ? "mx-auto" : ""}`}>Tvůj privátní</div>
            <div className="title-wellness relative mx-auto">Wellness</div>
            <svg className={`relative ${!isMd ? "absolute" : ""}`}>
                <use href="#rezervace" onClick={rezervaceClick} />
            </svg>
        </>
    );
    const [isMenu, setIsMenu] = useState(false);
    const [isSlider, setIsSlider] = useState(false);

    if (isMenu) {
        header = <HeaderMenu toggleMenuChange={toggleMenuChange} />;
    } else {
        header = <Header toggleMenuChange={toggleMenuChange} />;
    }

    if (!isMd) {
        menu = <Menu />;
        slider = <Slider isSlider={isSlider} />;
        sliderInit = (
            <div id="sliderInit" className={`${!isMd ? "align-self-center h-p" : "title-wrap"} ${isSlider ? "hiddenTitle" : ""} relative title fit-content user-select-none relative`} onClick={titleClick}>
                {sliderInitContent}
            </div>
        );
    } else {
        slider = <Slider isSlider={false} />;
        sliderInit = (
            <div id="sliderInit" className={`${"title-wrap"} relative title fit-content user-select-none relative`}>
                {sliderInitContent}
            </div>
        );
    }

    return (
        <>
            <header className="header absolute">{header}</header>
            <div className="contain relative grid content-center title-contain" id="cover">
                {slider}
                <div className={`absolute flex content-center w-100 ${!isMd ? "align-self-center" : "title-wrap"}`}>{sliderInit}</div>
                {menu}
            </div>
        </>
    );
};

export { Title };
