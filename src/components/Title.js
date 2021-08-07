import Header from "./Title/Header";
import HeaderMenu from "./Title/HeaderMenu";

export default function Title(props) {
    let isMenu = false;

    function isMenuChange() {
        isMenu = !isMenu;
    }

    return (
        <header class="header absolute">
            <Header displayMenu={props.windowInfo.displayMenu} isMenuChange={isMenuChange} isMenu={{ isMenu }} />
            {/* <HeaderMenu isMenu={{ isMenu }} /> */}
        </header>
    );
}
