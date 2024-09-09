import { FC } from "react";
import { useResponsive } from "../../DimensionsContext";
import Clock from "../Icons/Clock";
import Location from "../Icons/Location";
import Logo from "../Icons/Logo";
import Phone from "../Icons/Phone";
import HeaderMenu from "../Icons/HeaderMenu";

const Header: FC<{ toggleMenuChange: () => void }> = ({ toggleMenuChange }) => {
  const displayMenu = useResponsive().displayMenu;

  return (
    <div className="header__wrap flex content-between mx-auto align-center">
      <div className="header__logo flex">
        {/* <img className={`relative float-left ${displayMenu ? "header__logo-icon" : "header__logo-iconBig"}`} src={logo} alt="Kbely Logo" /> */}
        <Logo className={`relative float-left ${displayMenu ? "header__logo-icon" : "header__logo-iconBig"}`} />
        {displayMenu && <div className="header__logo-text relative">Sauna Kbely</div>}
      </div>
      {displayMenu ? (
        <div className="header__contacts content-between flex">
          <div className="header__contacts-item flex">
            <Clock />
            <div>08:00—22:00</div>
          </div>
          <div className="header__contacts-item flex">
            <Location />
            <a className="text-decoration-none" href="https://www.google.com/maps/place/Krnská+350,+197+00+Kbely,+Czechia/@50.1286805,14.5498908,19z" target="_blank" rel="noreferrer">
              Krnska 350/26, Praha 19700
            </a>
          </div>
          <div className="header__contacts-item flex">
            <Phone />
            <a className="text-decoration-none" href="tel:+420 286 851 738">
              +420 286 851 738
            </a>
          </div>
        </div>
      ) : (
        <HeaderMenu className="header__menu h-p" onClick={toggleMenuChange} />
      )}
    </div>
  );
};

export { Header };
