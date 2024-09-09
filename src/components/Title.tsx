import { Header } from "./Title/Header";
// import { HeaderMenu } from "./Title/HeaderMenu";
import { Slider } from "./Title/Slider";
import { Menu } from "./Title/Menu";
import { Fragment, useState } from "react";
import { useResponsive } from "../DimensionsContext";
import Rezervace from "./Icons/Rezervace";
import { HeaderMenu } from "./Title/HeaderMenu";

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
  console.log({ isMenu });

  return (
    <Fragment>
      <header className="header absolute">{isMenu ? <HeaderMenu toggleMenuChange={toggleMenuChange} /> : <Header toggleMenuChange={toggleMenuChange} />}</header>
      <div className="contain relative grid content-center title-contain" id="cover">
        {isMd ? <Slider isSlider={false} /> : <Slider isSlider={isSlider} />}
        <div className={`absolute flex content-center w-100 ${!isMd ? "align-self-center" : "title-wrap"}`}>
          <div id="sliderInit" className={`${isMd ? "title-wrap" : "align-self-center h-p"} ${isSlider ? "hiddenTitle" : ""} relative title fit-content user-select-none relative`} onClick={titleClick}>
            <div className={`title-privatni relative fit-content ${isMd ? "mx-auto" : ""}`}>Tvůj privátní</div>
            <div className="title-wellness relative mx-auto">Wellness</div>
            <a href="#book">
              <Rezervace className={`relative ${!isMd ? "absolute" : ""}`} />
            </a>
          </div>
        </div>
        {!isMd && <Menu />}
      </div>
    </Fragment>
  );
};

export default Title;
