import React, { useContext } from "react";
import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <Header />
      <div>Галерея</div>
    </div>
  );
};
