import React, { useContext, createContext, useEffect, useState } from "react";

const DimensionsContext = createContext();

export function useResponsive() {
    return useContext(DimensionsContext);
}

export function DimensionsPrvider({ children }) {
    const [width, setWindowWidth] = useState(0);

    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
    };

    const responsive = {
        isMd: width * (window.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) < window.$md,
        displayMenu: width * (window.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) > window.$header,
    };

    return <DimensionsContext.Provider value={responsive}>{children}</DimensionsContext.Provider>;
}
