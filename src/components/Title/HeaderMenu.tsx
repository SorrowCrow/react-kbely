import { FC, HTMLAttributes, useEffect } from "react";
import Cross from "../Icons/Cross";
import Facebook from "../Icons/Facebook";
import Instagram from "../Icons/Instagram";
import Logo from "../Icons/Logo";

const HeaderMenu: FC<HTMLAttributes<HTMLElement> & { toggleMenuChange: () => void }> = ({ toggleMenuChange }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="headerMenu scroll-hidden y-scroll fixed">
      <div className="headerMenu__header flex content-between align-center">
        {/* <img className={"headerMenu__header-icon"} src={logo} alt="React Logo" /> */}
        <Logo className="headerMenu__header-icon" />
        <div className="headerMenu__header-time">08:00—22:00</div>
        <div className="ReservationExit flex relative content-center align-center h-p" onClick={toggleMenuChange}>
          <Cross />
        </div>
      </div>
      <div className="headerMenu__scrolls grid content-center">
        <div className="text-center h-p">
          <a className="text-decoration-none" href="#about" onClick={toggleMenuChange}>
            O nás
          </a>
        </div>
        <div className="text-center h-p">
          <a className="text-decoration-none" href="#book" onClick={toggleMenuChange}>
            Rezervace
          </a>
        </div>
        <div className="text-center h-p">
          <a className="text-decoration-none" href="#giftCards" onClick={toggleMenuChange}>
            Dárkové poukazy
          </a>
        </div>
        <div className="text-center h-p">
          <a className="text-decoration-none" href="#reference" onClick={toggleMenuChange}>
            Reference
          </a>
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
          <Facebook />
        </a>
        <a className="text-decoration-none h-p inline-block" href="https://instagram.com" target="_blank" rel="noreferrer">
          <Instagram />
        </a>
      </div>
    </div>
  );
};
export { HeaderMenu };
