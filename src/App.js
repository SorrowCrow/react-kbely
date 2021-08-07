import logo from "./logo.svg";
import "./scss/main.scss";
import Svgs from "./components/Svgs";
import Title from "./components/Title";

function App() {
    // const sm = window.$sm;

    function isMd() {
        return windowInfo.size * (window.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) < window.$md ? true : false;
    }

    function displayMenu() {
        return windowInfo.size * (window.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) > window.$header ? true : false;
    }

    let windowInfo = {};

    function getWindowSize() {
        windowInfo.size = window.innerWidth;
        windowInfo.isMd = isMd();
        windowInfo.displayMenu = displayMenu();
    }
    window.addEventListener("resize", getWindowSize());

    return (
        <div>
            <Svgs />
            <Title windowInfo={{ windowInfo }} />
        </div>
    );
}

export default App;
