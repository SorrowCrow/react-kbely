import { useEffect } from "react";
import "tiny-slider/dist/tiny-slider.css";
import { tns } from "tiny-slider/src/tiny-slider.js";
import ArrowScroll from "./Icons/ArrowScroll";
import ContainerWave from "./Icons/ContainerWave";
import Facebook from "./Icons/Facebook";
import Instagram from "./Icons/Instagram";
import Wave from "./Icons/Wave";

const ReferenceBlock = () => {
  useEffect(() => {
    tns({
      container: ".footer__carousel",
      items: 1,
      slideBy: "page",
      mouseDrag: true,
      center: true,
      speed: 400,
      nav: false,
      controlsContainer: ".buttons",
    });
  }, []);

  return (
    <footer className="footer x-hidden">
      <ContainerWave className="mx-auto containerWave relative" />
      <div className="content mx-auto">
        <div className="carouselContainer">
          <div className="footer__carousel h-p" id="reference">
            <div>
              <div className="footer__carousel-slide text-center user-select-none m-auto">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
            </div>
            <div>
              <div className="footer__carousel-slide text-center user-select-none m-auto">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
            </div>
          </div>
          <div className="buttons flex content-center align-center">
            <div className="footer__carousel-nextBtn grid h-p">
              <ArrowScroll className="m-auto" />
            </div>
            <div className="footer__carousel-prevBtn grid h-p">
              <ArrowScroll className="m-auto" />
            </div>
          </div>
          <Wave className="mx-auto wave" />
        </div>
        <a className="mx-auto content__number text-decoration-none h-fit-content max-content text-center block" href="tel:+420 286 851 738">
          +420 286 851 738
        </a>
        <div className="sub-title grid text-center">
          Krnska 350/26, Praha 19700
          <a className="mx-auto content__email text-decoration-none" href="mailto:sauna@marieluisa.cz">
            sauna@marieluisa.cz
          </a>
        </div>
        <div className="mx-auto content__links max-content">
          <a className="text-decoration-none inline-block" href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="h-p" />
          </a>
          <a className="text-decoration-none inline-block" href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram className="h-p" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default ReferenceBlock;
