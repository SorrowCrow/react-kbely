import { Suspense } from "react";
import { DimensionsProvider } from "./DimensionsContext";
import AboutBlock from "./components/AboutBlock";
import BookBlock from "./components/BookBlock";
import GiftCardsBlock from "./components/GiftCardsBlock";
import ReferenceBlock from "./components/ReferenceBlock";
import Title from "./components/Title";
import "./scss/main.scss";
import { BrowserRouter } from "react-router-dom";

// const Title = lazy(() => import("./components/Title"));
// const AboutBlock = lazy(() => import("./components/AboutBlock"));
// const BookBlock = lazy(() => import("./components/BookBlock"));
// const GiftCardsBlock = lazy(() => import("./components/GiftCardsBlock"));
// const ReferenceBlock = lazy(() => import("./components/ReferenceBlock"));

const renderLoader = () => (
  <div className="flex content-center align-center fixed overflow-hidden LoadingBlock" style={{ backgroundColor: "#69498c" }}>
    <div className="spin flex"></div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={renderLoader()}>
        <DimensionsProvider>
          <Title />
          <AboutBlock />
          <BookBlock />
          <GiftCardsBlock />
          <ReferenceBlock />
        </DimensionsProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
