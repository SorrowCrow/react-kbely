import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormDataContext, useSetFormDataContext } from "../Reservation";
import { SelectComponent } from "./components/SelectComponent";
import { AdditionalComponent } from "./components/AdditionalComponent";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const ReservationFormBlock = ({ OnlinePayments }) => {
    const stripe = useStripe();
    const elements = useElements();

    const formData = useFormDataContext();
    const setFormData = useSetFormDataContext();

    // const [displayError, setDisplayError] = useState();

    // function tempDisplayError(error) {
    //     setDisplayError(error);
    // }

    const [inputData, setInputData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        loading: true,
    });

    useEffect(() => {
        setInputData((i) => ({ ...i, loading: false }));
    }, []);

    function osobyClick(e) {
        e.stopPropagation();

        setFormData({ type: formData.ACTIONS.TOGGLE_DROPDOWN });
    }

    function setPersons(persons, e) {
        setFormData({ type: formData.ACTIONS.SET_PERSONS, payload: { persons: persons } });
        osobyClick(e);
    }

    function setInput(e) {
        e.preventDefault();
        const name = e.target.name;
        setInputData((i) => ({ ...i, [name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (inputData.loading || !stripe || !elements) return;

        if (!formData.token) {
            document.getElementsByClassName("captcha__wrap")[0].classList.add("highlight");
            return;
        }
        document.getElementsByClassName("captcha__wrap")[0].classList.remove("highlight");

        setInputData((inputData) => {
            return { ...inputData, loading: true };
        });

        let stripeId;
        const token = formData.token;
        const cleanData = (({ ACTIONS, dropdown, token, hours, ...o }) => o)(Object.assign(formData, (({ loading, ...o }) => o)(inputData)));
        if (OnlinePayments) {
            const billingDetails = {
                name: formData.name,
                email: formData.email,
            };

            const cardElement = elements.getElement(CardElement);

            try {
                const response = await axios.post("api/stripe/", JSON.stringify({ cleanData }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const { secret, id, message } = response.data;

                if (!message) {
                    stripeId = id;

                    const { paymentMethod } = await stripe.createPaymentMethod({
                        type: "card",
                        card: cardElement,
                        billing_details: billingDetails,
                    });
                    const { error } = await stripe.confirmCardPayment(secret, {
                        payment_method: paymentMethod.id,
                    });
                    // if (error) tempDisplayError(error);
                    if (error) console.log(error);
                } else {
                    throw new Error(message);
                }
            } catch (error) {
                // tempDisplayError(error.message);
                console.log(error.message);
                setInputData((i) => ({ ...i, loading: false }));
            }
        }
        const response = await axios.post("api/reservationItems/", { cleanData, stripeId: stripeId, captchaRes: token });
        const { message } = response.data;
        if (message) {
            // tempDisplayError(message);
            console.log(message);
        }
        setInputData((i) => ({ ...i, loading: false }));
        document.getElementById("reservationExit").click();
        return;
    }

    return (
        <>
            {/* {displayError && (
                <div className="ErrorMessage">
                    <div className="item">{displayError}</div>
                </div>
            )} */}
            <form className="reservationForm" id="form" onSubmit={handleSubmit}>
                <svg className="containerWave relative">
                    <use href="#containerWave" />
                </svg>
                <div className="container mx-auto">
                    <div className="form-grid grid">
                        <input required type="text" name="name" placeholder="Jemno*" value={inputData.name} onChange={setInput} />
                        <div className="reservationForm__select user-select-none">
                            <div className="reservationForm__select-inner flex content-between align-center h-p" style={formData.dropdown ? { borderRadius: "10px 10px 0 0" } : {}} onClick={osobyClick.bind(this)}>
                                <div className="pa flex align-center">{formData.persons} Osoby</div>
                                {formData.persons > 1 && <p>(+{formData.persons - 1}00,- Kč)</p>}
                                <svg id="formArrow" style={formData.dropdown ? { transform: "rotate(180deg)" } : null}>
                                    <use href="#openedArrow" />
                                </svg>
                            </div>
                            <div className={`reservationForm__select-list h-fit-content overflow-hidden ${formData.dropdown ? "grid" : "none"}`}>
                                <SelectComponent persons={4} setPersons={setPersons} />
                            </div>
                        </div>
                        <input required type="tel" name="phone" id="telephone" placeholder="Telefon*" value={inputData.phone} onChange={setInput} />
                        <input required type="email" name="email" placeholder="E-mail*" value={inputData.email} onChange={setInput} />
                        <textarea
                            v-model="formData.message"
                            type="text"
                            name="message"
                            placeholder="Dalsi pozadavky
Treba jokou chcete hudbu..."
                            value={inputData.message}
                            onChange={setInput}
                        ></textarea>
                    </div>
                    <AdditionalComponent name={"Ozdoba"} price={350} infoText={"Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area."} />
                    <AdditionalComponent name={"Prossecco"} price={290} infoText={"Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area."} />
                    <AdditionalComponent name={"Ovocna Misa"} price={350} infoText={"Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area."} />
                </div>
            </form>
            {inputData.loading && (
                <div className="flex content-center align-center fixed overflow-hidden LoadingBlock">
                    <div className="spin flex"></div>
                </div>
            )}
        </>
    );
};

export { ReservationFormBlock };
