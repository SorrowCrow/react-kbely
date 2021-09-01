const express = require("express");
const axios = require("axios");

const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri, captcha } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const reservationItemRoutes = require("./routes/api/reservationItems");
const reservationItem = require("./models/reservationItem");

const path = require("path");
const Stripe = require("stripe");
const https = require("https");
const fs = require("fs");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get("x-forwarded-proto") !== "https" && process.env.NODE_ENV !== "development") {
        return res.redirect("https://" + req.get("host") + req.url);
    }
    next();
}
app.use(requireHTTPS);

const stripe = new Stripe(process.env.SECRET_KEY);

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDb database Connected"))
    .catch((err) => console.log(err));

app.post("/api/webhook", express.raw({ type: "application/json" }), async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.END_POINT_SECRET);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            console.log("PaymentIntent was successful!");
            break;
        case "payment_intent.attached":
            const paymentMethod = event.data.object;
            console.log("PaymentMethod was attached to a Customer!");
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.json({ received: true });
});

app.use(express.json());

app.post("/api/stripe", async (req, res) => {
    const formData = req.body.cleanData;
    // const { token } = req.body.formData;
    // const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${captcha}&response=${token}`);

    // if (response.data.success === true) {
    try {
        const { time, misa, ozdoba, prossecco, persons, date } = formData;
        const reservationItems = await reservationItem.find({ date: date }, { time: 1, _id: 0 }).sort({ time: 1 });
        if (!reservationItems) throw new Error("No reservationItems");
        const sorted = reservationItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        for (let i = 0; i < Object.keys(sorted).length; i++) {
            if (time === sorted[i].time) throw new Error("time taken");
        }

        let amount = persons * 100;
        if (ozdoba) amount += 350;
        if (prossecco) amount += 290;
        if (misa) amount += 350;
        let reservedArray = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
        intTime = Number(reservedArray[2]) - Number(reservedArray[0]);
        if (Number(reservedArray[3]) === 30) {
            intTime += 0.5;
        }
        if (intTime === 1) amount += 799;
        else if (intTime === 1.5) amount += 1099;
        else if (intTime === 2) amount += 1399;
        else if (intTime === 3) amount += 1899;
        amount = amount * 100;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "czk",
                metadata: formData,
            });

            res.status(200).send({ secret: paymentIntent.client_secret, id: paymentIntent.id });
        } catch (error) {
            console.log("error: ", error);
            res.status(200).send({ message: error });
        }
    } catch (error) {
        res.status(200).send({ message: error.message });
        return;
    }
    // } else {
    //     console.log("captcha not successful");
    //     res.status(200).send({ message: "captcha not successful" });
    // }
});

app.use("/api/reservationItems", reservationItemRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
    app.listen(PORT, () => console.log(`Port: ${PORT}`));
} else {
    https
        .createServer(
            {
                key: fs.readFileSync("server.key"),
                cert: fs.readFileSync("server.cert"),
            },
            app
        )
        .listen(PORT, () => console.log(`Port: ${PORT}`));
}
