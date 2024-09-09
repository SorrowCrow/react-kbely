import Frame1 from "./Icons/Frame1";
import Frame2 from "./Icons/Frame2";
import Frame3 from "./Icons/Frame3";
import Frame4 from "./Icons/Frame4";
import MagnifyingGlass from "./Icons/MagnifyingGlass";

const AboutBlock = () => {
  return (
    <div className="AboutBlock x-hidden mx-auto">
      <div className="title-container grid">
        <div className="title" id="about">
          O nás
        </div>
        <div className="sub-title">Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.</div>
        <div className="background flex relative content-flex-end">
          <a href="#cover" className="MagnifyingGlass relative align-self-end grid h-p">
            <MagnifyingGlass className="m-auto" />
          </a>
        </div>
      </div>
      <div className="services mx-auto relative grid content-space-between max-content">
        <div className="services__item grid content-center text-center">
          <Frame1 className="frame1" />
          Vířivka
        </div>
        <div className="services__item grid content-center text-center">
          <Frame2 className="frame2" />
          Sauna
        </div>
        <div className="services__item grid content-center text-center">
          <Frame3 className="frame3" />
          Bazén
        </div>
        <div className="services__item grid content-center text-center">
          <Frame4 className="frame4" />
          Odpočívárna
        </div>
      </div>
    </div>
  );
};

export default AboutBlock;
