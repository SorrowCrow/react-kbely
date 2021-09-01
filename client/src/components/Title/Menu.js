import React from "react";

const Menu = () => {
    function scroll(id) {
        window.scrollTo({
            top: document.querySelector(id).offsetTop,
            behavior: "smooth",
        });
    }

    return (
        <div className="menu-wrap absolute w-100">
            <div className="menu mx-auto flex content-between">
                <div className="menu__main flex content-between">
                    <div className="h-p" onClick={() => scroll("#about")}>
                        O nás
                    </div>
                    <div className="h-p" onClick={() => scroll("#book")}>
                        Rezervace
                    </div>
                    <div className="h-p" onClick={() => scroll("#giftCards")}>
                        Dárkové poukazy
                    </div>
                    <div className="h-p" onClick={() => scroll("#reference")}>
                        Reference
                    </div>
                </div>
                <div className="menu__social flex content-between">
                    <a className="text-decoration-none" href="https://facebook.com" target="_blank" rel="noreferrer">
                        Facebook
                    </a>
                    <a className="text-decoration-none" href="https://instagram.com" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    );
};

export { Menu };
