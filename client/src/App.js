import "./scss/main.scss";
import Svgs from "./components/Svgs";
import { Title } from "./components/Title";
import { AboutBlock } from "./components/AboutBlock";
import { BookBlock } from "./components/BookBlock";
import { GiftCardsBlock } from "./components/GiftCardsBlock";
import { ReferenceBlock } from "./components/ReferenceBlock";
import React from "react";
import { DimensionsPrvider } from "./DimensionsContext";

function App() {
    return (
        <DimensionsPrvider>
            <Svgs />
            <Title />
            <AboutBlock />
            <BookBlock />
            <GiftCardsBlock />
            <ReferenceBlock />
        </DimensionsPrvider>
    );
}

export default App;
