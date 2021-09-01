import React, { useEffect } from "react";
import { useFormDataContext, useSetFormDataContext } from "../Reservation";
import { CardElement } from "@stripe/react-stripe-js";
import ReCAPTCHA from "react-google-recaptcha";

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

const SummaryBlock = ({ OnlinePayments, setOnlinePayments }) => {
    const formData = useFormDataContext();
    const setFormData = useSetFormDataContext();

    let timePrice = 799;
    if (formData.hours === 15) {
        timePrice = 1099;
    } else if (formData.hours === 2) {
        timePrice = 1399;
    } else if (formData.hours === 3) {
        timePrice = 1899;
    }

    useEffect(() => {
        const captcha = document.createElement("script");
        captcha.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
        captcha.defer = true;
        captcha.async = true;
        document.head.appendChild(captcha);

        document.getElementsByClassName("SummaryBlock__payingMethods-item")[0].click();
    }, []);

    const handleToken = (token) => {
        setFormData({ type: formData.ACTIONS.SET_TOKEN, payload: { token: token } });
    };

    const handleExpire = () => {
        setFormData({ type: formData.ACTIONS.UNSET_TOKEN });
    };

    return (
        <div className="SummaryBlock-wrap">
            <svg className="containerWave relative">
                <use href="#containerWave" />
            </svg>
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
                    {formData.ozdoba ? (
                        <div className="SummaryBlock__costs-item flex content-between">
                            <div>Ozdoba</div>
                            <div>{ozdobaPrice},– Kč</div>
                        </div>
                    ) : null}
                    {formData.prossecco ? (
                        <div className="SummaryBlock__costs-item flex content-between">
                            <div>Prossecco</div>
                            <div>{prosseccoPrice},– Kč</div>
                        </div>
                    ) : null}
                    {formData.misa ? (
                        <div className="SummaryBlock__costs-item flex content-between">
                            <div>Misa</div>
                            <div>{misaPrice},– Kč</div>
                        </div>
                    ) : null}
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
                    <label className="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
                        <div className="SummaryBlock__payingMethods-method">
                            Bankovní převod
                            <input type="radio" name="radio" form="form" onChange={() => setOnlinePayments(true)} />
                            <span className="checkmark"></span>
                        </div>
                        <div className="SummaryBlock__payingMethods-item-info">Prevodem obvykle 2 dni</div>
                    </label>
                    <label className="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
                        <div className="SummaryBlock__payingMethods-method">
                            Hotové
                            <input type="radio" name="radio" form="form" onChange={() => setOnlinePayments(false)} />
                            <span className="checkmark"></span>
                        </div>
                        <div className="SummaryBlock__payingMethods-item-info">Hotove nebo kartou pri prichodu</div>
                    </label>
                    <label className="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
                        <div className="SummaryBlock__payingMethods-item-method">
                            Platba Online
                            <input type="radio" name="radio" form="form" onChange={() => setOnlinePayments(true)} />
                            <span className="checkmark"></span>
                        </div>
                        <div className="SummaryBlock__payingMethods-item-info">Kartou Online</div>
                    </label>
                    <div id="stripe-card" required className={`overflow-hidden ${OnlinePayments ? "cardShow" : "cardHide"}`}>
                        <CardElement options={style} />
                    </div>
                    <div class="min-content mx-auto captcha__wrap">
                        <ReCAPTCHA sitekey="6Le428QbAAAAAJtzzkOgPTjuGq8xp2uvjN79yGEf" onChange={handleToken} onExpire={handleExpire} />
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
