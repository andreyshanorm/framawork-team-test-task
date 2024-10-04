import type { FC } from 'react';
import React, { useContext, useRef } from 'react';
import axios from 'axios';
import type { PaintWithName } from '../PicturesList';
import type { Author } from '../../../utils/linkPaintsAndAuthors';
import {
  linkAuthorsWithPaints,
} from '../../../utils/linkPaintsAndAuthors';
import styles from './CustomInput.module.scss';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider';
import { SearchIcon } from '../../Icons/SearchIcon';
import { baseUrl } from '../../../constants';

type Props = {
  setPictures: (object: PaintWithName[] | never[]) => void;
  setError: (arg: boolean) => void;
  setLoading: (arg: boolean) => void;
  authorsData: Author[] | undefined;
};

export const CustomInput: FC<Props> = ({
  setError,
  setPictures,
  authorsData,
}) => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { theme } = useContext(ThemeContext);

  const fetchSearch = async (value: string) => {
    try {
      const res = await axios.get(`${baseUrl}/paintings?q=${value}`);
      const newPaints = linkAuthorsWithPaints(res.data, authorsData);
      if (newPaints) {
        setPictures(newPaints);
      }
    } catch (err) {
      //   setError(true);
    } finally {
      //   setLoading(false);
    }
  };

  const handleInputChange = () => {
    if (searchInput.current) {
      fetchSearch(searchInput.current.value);
    } else {
      alert('Инпут не был найден');
    }
  };

  return (
    <div className={styles.input_block}>
      <SearchIcon fillColor={theme === 'light' ? '#575757' : '#DEDEDE'} />
      <input
        ref={searchInput}
        onChange={handleInputChange}
        placeholder="Painting title"
        className={`${styles.search_input} ${theme === 'light' ? styles.light : styles.black}`}
        type="text"
      />
    </div>
  );
};
