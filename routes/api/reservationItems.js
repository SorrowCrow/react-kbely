const axios = require("axios");

const { Router } = require("express");

const router = Router();
const { sendgrid, captcha } = require("../../config");
const sgMail = require("@sendgrid/mail");
const verifiedEmail = "forestmccallister@gmail.com";

sgMail.setApiKey(sendgrid);

router.get("/:date", async (req, res) => {
    const reservationItem = require("../../models/reservationItem");

    const { date } = req.params;
    try {
        const reservationItems = await reservationItem.find({ date: date }, { time: 1, _id: 0 }).sort({ time: 1 });
        if (!reservationItems) throw new Error("No reservationItems");
        const sorted = reservationItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function email(source) {
    const msg = {
        to: source.email,
        from: verifiedEmail,
        subject: "Thank you for your reservation",
        text: "We have received your reservation",
        html: `<strong>Your reservation: </strong>
        <ul>
        <li>Date: ${source.date}</li>
        <li>Time: ${source.time}</li>
        <li>Persons: ${source.persons}</li>
        <li>Ozdoba: ${source.ozdoba === "true" ? "Included" : "Not Included"}</li>
        <li>Ovocna Misa: ${source.misa === "true" ? "Included" : "Not Included"}</li>
        <li>Prossecco: ${source.prossecco === "true" ? "Included" : "Not Included"}</li>
        </ul>`,
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
}

router.post("/", async (req, res) => {
    const stripe = require("stripe")(process.env.SECRET_KEY);
    const reservationItem = require("../../models/reservationItem");

    const { stripeId } = req.body;
    let newreservationItem = "";
    let metadata;
    if (stripeId) {
        const paymentIntent = await stripe.paymentIntents.retrieve(stripeId);
        metadata = paymentIntent.metadata;
        metadata.stripeId = stripeId;
        newreservationItem = new reservationItem(metadata);
    } else {
        const { captchaRes } = req.body;
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${captcha}&response=${captchaRes}`);
        const { time, date } = req.body.cleanData;
        if (response.data.success === true) {
            const reservationItems = await reservationItem.find({ date: date }, { time: 1, _id: 0 }).sort({ time: 1 });
            if (!reservationItems) throw new Error("No reservationItems");
            const sorted = reservationItems.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            for (let i = 0; i < Object.keys(sorted).length; i++) {
                if (time === sorted[i].time) throw new Error("Time taken");
            }
            newreservationItem = await new reservationItem(req.body.cleanData);
        }
    }
    const isReservationItem = await newreservationItem.save();
    if (!isReservationItem) throw new Error("Something went wrong while saving form");
    res.status(200).json();
    if (stripeId) {
        email(metadata);
    } else {
        email(req.body.cleanData);
    }
});

module.exports = router;
