import { Calendar } from "./book/Calendar";
import { CalendarProvider } from "./book/CalendarContext";
import ContainerWave from "./Icons/ContainerWave";
import Wave from "./Icons/Wave";

const BookBlock = () => {
  return (
    <div className="BookBlock mx-auto overflow-hidden">
      <ContainerWave className="containerWave relative" />
      <div className="BookBlock__wrapper">
        <div className="mx-auto content">
          <div className="title mx-auto fit-content" id="book">
            Zarezervujete svoji návštěvu
          </div>
          <div className="sub-title mx-auto grid fit-content">Vyberte datum a délku návštěvy a my nabídneme vám volné termíny</div>
          <div className="priceAndBook grid content-center overflow-visible">
            <CalendarProvider>
              <Calendar />
            </CalendarProvider>
            <div className="pricelist">
              <div className="pricelist__item flex content-between align-center">
                <div className="pricelist__item-hours sub-title fit-content">1 Hodina</div>
                <Wave className="mx-auto wave" />
                <div className="sub-title price text-right">799,- Kč</div>
              </div>
              <div className="pricelist__item flex content-between align-center">
                <div className="pricelist__item-hours sub-title fit-content">1,5 Hodina</div>
                <Wave className="mx-auto wave" />
                <div className="sub-title price text-right">1099,- Kč</div>
              </div>
              <div className="pricelist__item flex content-between align-center">
                <div className="pricelist__item-hours sub-title fit-content">2 Hodina</div>
                <Wave className="mx-auto wave" />
                <div className="sub-title price text-right">1399,- Kč</div>
              </div>
              <div className="pricelist__item flex content-between align-center">
                <div className="pricelist__item-hours sub-title fit-content">3 Hodina</div>
                <Wave className="mx-auto wave" />
                <div className="sub-title price text-right">1899,- Kč</div>
              </div>
              <div className="note">
                Za překročení doby rezervace je účtován poplatek 300 Kč za každých 15 minut zpoždění.
                <br />
                <br />
                Za každou osobu nad 2 osoby účtujeme doplatek 200,-/osoba.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookBlock;
