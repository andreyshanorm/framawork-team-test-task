import React, { useContext } from "react";
import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import { PicturesList } from "../PicturesList/PicturesList";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <Header />
      <PicturesList />
    </div>
  );
};
