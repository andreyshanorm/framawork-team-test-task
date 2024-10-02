import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import Moon from "../../images/icons/Vectormoon.svg";
import Sun from "../../images/icons/Vectorsun.svg";
import Logo from "../../images/icons/logo.svg";
import LightLogo from "../../images/icons/logologoLight.svg";
import styles from "./Header.module.scss";
import { SvgIcon } from "../SvgIcon/SvgIcon";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.logo}>
          <SvgIcon src={theme === "light" ? LightLogo : Logo} alt="Логотип" />
        </div>
        <div
          data-background={theme === "light" ? "light" : "dark"}
          className={styles.theme_button}
          onClick={() => toggleTheme()}
        >
          <SvgIcon
            src={theme === "light" ? Moon : Sun}
            alt={theme === "light" ? "Луна" : "Солнце"}
          />
        </div>
      </nav>
    </header>
  );
};
