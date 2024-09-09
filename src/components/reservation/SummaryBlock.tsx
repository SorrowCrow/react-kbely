import { CardElement } from "@stripe/react-stripe-js";
import { Dispatch, FC, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ContainerWave from "../Icons/ContainerWave";
import { useFormDataContext } from "../Reservation";

const ozdobaPrice = 350;
const prosseccoPrice = 290;
const misaPrice = 350;

const style = {
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontFamily: "Work Sans, sans-serif",
      fontSize: "1.25rem",
      fontSmoothing: "antialiased",

      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#2b3a77",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "red",
    },
  },
};

const SummaryBlock: FC<{ OnlinePayments: boolean; setOnlinePayments: Dispatch<React.SetStateAction<boolean>>; highlight: boolean }> = ({ OnlinePayments, setOnlinePayments, highlight }) => {
  const { formData, setFormData } = useFormDataContext();

  let timePrice = 799;
  if (formData.hours === 15) {
    timePrice = 1099;
  } else if (formData.hours === 2) {
    timePrice = 1399;
  } else if (formData.hours === 3) {
    timePrice = 1899;
  }

  const ref = useRef<HTMLLabelElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.click();
  }, []);

  const handleToken = (token: string | null) => {
    setFormData({ type: "setToken", payload: { token } });
  };

  return (
    <div className="SummaryBlock-wrap">
      <ContainerWave className="containerWave relative" />
      <div className="SummaryBlock grid mx-auto">
        <div className="SummaryBlock__costs">
          <div className="SummaryBlock__costs-item flex content-between">
            <div className="grid">
              <span>{formData.date},&nbsp;</span>
              <span>od {formData.time}</span>
            </div>
            <div>{timePrice},– Kč</div>
          </div>
          <div className="SummaryBlock__costs-item flex content-between">
            <div>{formData.persons} osoby</div>
            <div>{formData.persons * 100},– Kč</div>
          </div>
          {formData.ozdoba && (
            <div className="SummaryBlock__costs-item flex content-between">
              <div>Ozdoba</div>
              <div>{ozdobaPrice},– Kč</div>
            </div>
          )}
          {formData.prossecco && (
            <div className="SummaryBlock__costs-item flex content-between">
              <div>Prossecco</div>
              <div>{prosseccoPrice},– Kč</div>
            </div>
          )}
          {formData.misa && (
            <div className="SummaryBlock__costs-item flex content-between">
              <div>Misa</div>
              <div>{misaPrice},– Kč</div>
            </div>
          )}
          <div className="SummaryBlock__costs-total SummaryBlock__costs-item flex content-between">
            <div>Total:</div>
            <div>{formData.persons * 100 + timePrice + (formData.ozdoba ? ozdobaPrice : 0) + (formData.prossecco ? prosseccoPrice : 0) + (formData.misa ? misaPrice : 0)},– Kč</div>
          </div>
        </div>
        <div className="SummaryBlock__voucher flex content-between align-center">
          <div className="SummaryBlock__voucher-text">Mam voucher</div>
          <div className="SummaryBlock__voucher-button h-p align-center flex content-space-around">Uplatnit</div>
        </div>
        <div className="SummaryBlock__payingMethods">
          {/* <label  className="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
            <div className="SummaryBlock__payingMethods-method">
              Bankovní převod
              <input type="radio" name="radio" form="form" onChange={() => setOnlinePayments(true)} />
              <span className="checkmark"></span>
            </div>
            <div className="SummaryBlock__payingMethods-item-info">Prevodem obvykle 2 dni</div>
          </label> */}
          <label className="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
            <div className="SummaryBlock__payingMethods-method">
              Hotové
              <input type="radio" name="radio" form="form" onChange={() => setOnlinePayments(false)} />
              <span className="checkmark"></span>
            </div>
            <div className="SummaryBlock__payingMethods-item-info">Hotove nebo kartou pri prichodu</div>
          </label>
          <label ref={ref} className="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
            <div className="SummaryBlock__payingMethods-item-method">
              Platba Online
              <input type="radio" name="radio" form="form" onChange={() => setOnlinePayments(true)} />
              <span className="checkmark"></span>
            </div>
            <div className="SummaryBlock__payingMethods-item-info">Kartou Online</div>
          </label>
          <div id="stripe-card" className={`overflow-hidden ${OnlinePayments ? "cardShow" : "cardHide"}`}>
            <CardElement options={style} />
          </div>
          <div className={`min-content mx-auto captcha__wrap ${highlight ? "highlight" : ""}`}>
            <ReCAPTCHA sitekey="6LdyMnwnAAAAAPPNzvZYWWfsjr2vvVi_p_0MqUPx" onChange={handleToken} />
          </div>
        </div>
        <button type="submit" className="SummaryBlock__rezervovat h-p mx-auto align-center" form="form">
          Rezervovat
        </button>
      </div>
    </div>
  );
};
export { SummaryBlock };
