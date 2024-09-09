import { useContext, createContext, useEffect, useState, FC, HTMLAttributes } from "react";

interface Props {
  isMd: boolean;
  displayMenu: boolean;
}

const DimensionsContext = createContext({} as Props);

export const useResponsive = () => {
  return useContext(DimensionsContext);
};

// window.$sm = 740;
// window.$md = 1070;
// window.$header = 1285;
// window.$rem = 16;

export const DimensionsProvider: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
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
    isMd: width * (16 / parseFloat(getComputedStyle(document.documentElement).fontSize)) < 1070,
    displayMenu: width * (16 / parseFloat(getComputedStyle(document.documentElement).fontSize)) > 1285,
  };

  return <DimensionsContext.Provider value={responsive}>{children}</DimensionsContext.Provider>;
};
