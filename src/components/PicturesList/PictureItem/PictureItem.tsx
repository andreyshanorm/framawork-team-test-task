import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./PictureItem.module.scss";
import axios from "axios";
import { baseUrl } from "../../../constants";
import Load from "../../../images/load.png";
import { ThemeContext } from "../../ThemeProvider/ThemeProvider";

type Props = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  year: string;
  aurhorName: string;
  text: string;
};

export const PictureItem: FC<Props> = ({
  imgSrc,
  imgAlt,
  title,
  year,
  aurhorName,
  text,
}) => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${baseUrl}${imgSrc}`);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <li className={styles.card_item}>
      {error === false ? (
        <img
          src={loading ? Load : `${baseUrl}${imgSrc}`}
          alt={title}
          className={styles.image}
        />
      ) : (
        <div>При загрузке фотографии произошла ошибка</div>
      )}

      <div data-background={theme} className={styles.overlay}>
        <div className={styles.title}>{title}</div>
        <div className={styles.year}>{year}</div>
        <div className={styles.author_name}>{aurhorName}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </li>
  );
};
