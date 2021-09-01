import React, { useState } from "react";
import { useFormDataContext, useSetFormDataContext } from "../../Reservation";

const AdditionalComponent = ({ name, price, infoText }) => {
    const [info, setInfo] = useState(false);
    const formData = useFormDataContext();
    const setFormData = useSetFormDataContext();

    function switchSlider() {
        if (name === "Ozdoba") setFormData({ type: formData.ACTIONS.TOGGLE_OZDOBA });
        else if (name === "Prossecco") setFormData({ type: formData.ACTIONS.TOGGLE_PROSSECCO });
        else if (name === "Ovocna Misa") setFormData({ type: formData.ACTIONS.TOGGLE_MISA });
    }
    return (
        <div className={`${info ? "reservationForm__additional-info" : null} reservationForm__additional grid`}>
            <div className="wrap grid content-between">
                <div className="reservationForm__additional-item flex">
                    <svg className="tux">
                        {name === "Ozdoba" ? <use href="#tux" /> : null}
                        {name === "Prossecco" ? <use href="#prossecco" /> : null}
                        {name === "Ovocna Misa" ? <use v-else href="#strawberry" /> : null}
                    </svg>
                    <div>
                        <span>{name}</span>
                        <p>{price},- Kč</p>
                    </div>
                </div>
                <div className="reservationForm__additional-item flex">
                    <label className="switch">
                        <input type="checkbox" onChange={switchSlider} />
                        <span className="slider round"></span>
                    </label>
                    <svg className="info" viewBox="0 0 46 46" fill="none" onClick={() => setInfo(!info)}>
                        <circle cx="23" cy="23" r="22" stroke="#C7B6DA" stroke-width="2" />
                        {!info ? (
                            <path
                                v-if="!info"
                                d="M27.9512 30.9053L27.6289 32.2236C26.6621 32.6045 25.8906 32.8926 25.3145 33.0879C24.7383 33.293 24.0693 33.3955 23.3076 33.3955C22.1357 33.3955 21.2227 33.1123 20.5684 32.5459C19.9238 31.9697 19.6016 31.2422 19.6016 30.3633C19.6016 30.0215 19.626 29.6748 19.6748 29.3232C19.7236 28.9619 19.8018 28.5566 19.9092 28.1074L21.1104 23.8301C21.2178 23.4199 21.3057 23.0342 21.374 22.6729C21.4521 22.3018 21.4912 21.9648 21.4912 21.6621C21.4912 21.1152 21.3789 20.7344 21.1543 20.5195C20.9297 20.3047 20.5 20.1973 19.8652 20.1973C19.5527 20.1973 19.2305 20.2461 18.8984 20.3438C18.5762 20.4414 18.2979 20.5342 18.0635 20.6221L18.3857 19.3037C19.1768 18.9814 19.9336 18.708 20.6562 18.4834C21.3789 18.249 22.0625 18.1318 22.707 18.1318C23.8691 18.1318 24.7627 18.415 25.3877 18.9814C26.0225 19.5381 26.3398 20.2656 26.3398 21.1641C26.3398 21.3496 26.3154 21.6768 26.2666 22.1455C26.2275 22.6143 26.1494 23.0439 26.0322 23.4346L24.8311 27.6973C24.7334 28.0391 24.6455 28.4297 24.5674 28.8691C24.4893 29.3086 24.4502 29.6406 24.4502 29.8652C24.4502 30.4316 24.5771 30.8174 24.8311 31.0225C25.085 31.2275 25.5244 31.3301 26.1494 31.3301C26.4424 31.3301 26.7744 31.2812 27.1455 31.1836C27.5166 31.0762 27.7852 30.9834 27.9512 30.9053ZM28.2588 13.0195C28.2588 13.7617 27.9756 14.3965 27.4092 14.9238C26.8525 15.4414 26.1787 15.7002 25.3877 15.7002C24.5967 15.7002 23.918 15.4414 23.3516 14.9238C22.7852 14.3965 22.502 13.7617 22.502 13.0195C22.502 12.2773 22.7852 11.6426 23.3516 11.1152C23.918 10.5879 24.5967 10.3242 25.3877 10.3242C26.1787 10.3242 26.8525 10.5879 27.4092 11.1152C27.9756 11.6426 28.2588 12.2773 28.2588 13.0195Z"
                                fill="#C7B6DA"
                            />
                        ) : null}
                        {info ? (
                            <>
                                <path v-if="info" d="M31.1299 30.87L30.6464 31.3536L23.1636 23.8709L15.2192 31.8153L14.6847 31.2808L22.6291 23.3364L15.1464 15.8537L15.63 15.3701L23.1127 22.8528L30.7808 15.1847L31.3153 15.7192L23.6472 23.3873L31.1299 30.87Z" fill="#C7B6DA" />
                                <path v-if="info" fill-rule="evenodd" clip-rule="evenodd" d="M32.5442 30.87L30.6464 32.7678L23.1636 25.2851L15.2192 33.2295L13.2705 31.2808L21.2149 23.3364L13.7322 15.8537L15.63 13.9559L23.1127 21.4386L30.7808 13.7705L32.7295 15.7192L25.0614 23.3873L32.5442 30.87ZM31.3153 15.7192L30.7808 15.1847L23.1127 22.8528L15.63 15.3701L15.1464 15.8537L22.6291 23.3364L14.6847 31.2808L15.2192 31.8153L23.1636 23.8709L30.6464 31.3536L31.1299 30.87L23.6472 23.3873L31.3153 15.7192Z" fill="#C7B6DA" />
                            </>
                        ) : null}
                    </svg>
                </div>
            </div>
            {info ? <div className="reservationForm__additional-info-item">{infoText}</div> : null}
        </div>
    );
};
export { AdditionalComponent };
