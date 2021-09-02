import { Header } from "./Title/Header";
import { HeaderMenu } from "./Title/HeaderMenu";
import { Slider } from "./Title/Slider";
import { Menu } from "./Title/Menu";
import React, { useState } from "react";
import { useResponsive } from "../DimensionsContext";

const Title = () => {
    const [isMenu, setIsMenu] = useState(false);
    const [isSlider, setIsSlider] = useState(false);
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

    return (
        <>
            <header className="header absolute">{isMenu ? <HeaderMenu toggleMenuChange={toggleMenuChange} /> : <Header toggleMenuChange={toggleMenuChange} />}</header>
            <div className="contain relative grid content-center title-contain" id="cover">
                {isMd ? <Slider isSlider={false} /> : <Slider isSlider={isSlider} />}
                <div className={`absolute flex content-center w-100 ${!isMd ? "align-self-center" : "title-wrap"}`}>
                    <div id="sliderInit" className={`${isMd ? "title-wrap" : "align-self-center h-p"} ${isSlider ? "hiddenTitle" : ""} relative title fit-content user-select-none relative`} onClick={titleClick}>
                        <div className={`title-privatni relative fit-content ${isMd ? "mx-auto" : ""}`}>Tvůj privátní</div>
                        <div className="title-wellness relative mx-auto">Wellness</div>
                        <svg className={`relative ${!isMd ? "absolute" : ""}`}>
                            <use href="#rezervace" onClick={rezervaceClick} />
                        </svg>
                    </div>
                </div>
                {!isMd && <Menu />}
            </div>
        </>
    );
};

export default Title;
