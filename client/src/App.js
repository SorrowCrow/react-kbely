import "./scss/main.scss";
import React, { lazy, Suspense } from "react";
import Svgs from "./components/Svgs";
import { DimensionsPrvider } from "./DimensionsContext";
const Title = lazy(() => import("./components/Title"));
const AboutBlock = lazy(() => import("./components/AboutBlock"));
const BookBlock = lazy(() => import("./components/BookBlock"));
const GiftCardsBlock = lazy(() => import("./components/GiftCardsBlock"));
const ReferenceBlock = lazy(() => import("./components/ReferenceBlock"));

const renderLoader = () => (
    <div className="flex content-center align-center fixed overflow-hidden LoadingBlock" style={{ backgroundColor: "#69498c" }}>
        <div className="spin flex"></div>
    </div>
);

const App = () => {
    return (
        <>
            <Suspense fallback={renderLoader()}>
                <Svgs />
                <DimensionsPrvider>
                    <Title />
                    <AboutBlock />
                    <BookBlock />
                    <GiftCardsBlock />
                    <ReferenceBlock />
                </DimensionsPrvider>
            </Suspense>
        </>
    );
};

export default App;
