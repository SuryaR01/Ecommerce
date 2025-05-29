import React, { useEffect, useState } from "react";
import Lightbutton from "D:/react projects/2_eCOMMERCE/Ecommerce/src/assets/website/light-mode-button.png";
import darkbutton from "D:/react projects/2_eCOMMERCE/Ecommerce/src/assets/website/dark-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  React.useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <div className="reative">
      <img
        src={theme === "light"?darkbutton:Lightbutton}
        alt=""
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 md:absolute top-4 right-2 z-10  `}
      />
    </div>
  );
};

export default DarkMode;
