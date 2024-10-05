import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import axios from 'axios';
import { useGetAuthorsQuery } from '../../app/services/authorsApi';
import { useGetPaintsQuery } from '../../app/services/paintingsApi';
import type { PaintsResponse } from '../../app/types';
import { baseUrl } from '../../constants';
import { PictureItem } from './PictureItem/PictureItem';
import styles from './PicturesList.module.scss';
import { linkAuthorsWithPaints } from '../../utils/linkPaintsAndAuthors';
import { PaginationComp } from './PaginationComp/PaginationComp';
import { CustomInput } from './CustomInput/CustomInput';
import { CircIcon } from '../Icons/CircIcon';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

type Paint = PaintsResponse;

export type PaintWithName = Paint & {
  authorName: string;
};

export function PicturesList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pictureState, changeState] = useState<PaintWithName[] | never[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const [isSearchError, setIsSearchError] = useState(false);

  const { theme } = useContext(ThemeContext);

  const searchInput = useRef<HTMLInputElement | null>(null);

  const {
    data: authorsData,
    isLoading: isAuthorsLoading,
    error: authorsError,
  } = useGetAuthorsQuery();

  const { data } = useGetPaintsQuery();
  const fetchNewPage = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/paintings?_limit=6&_page=${page}`,
      );
      const newPaints = linkAuthorsWithPaints(res.data, authorsData);
      if (newPaints) {
        changeState(newPaints);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (authorsData) {
      fetchNewPage(currentPage);
    }
  }, [authorsData, currentPage]);

  if (isAuthorsLoading || loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error || authorsError) {
    return (
      <div>
        Ошибка:
        {error || 'Ошибка загрузки авторов'}
      </div>
    );
  }

  if (isSearchError) {
    return <div>Ошибка инпута</div>;
  }

  return (
    <div className={styles.main}>
      <CustomInput
        ref={searchInput}
        setLoading={setLoading}
        setError={setIsSearchError}
        setPictures={changeState}
        authorsData={authorsData}
      />
      {pictureState.length !== 0 ? (
        <ul className={styles.card_list}>
          {pictureState.slice(0, 6).map((item: PaintWithName) => (
            <PictureItem
              text="Lorem Ipsum"
              aurhorName={item.authorName}
              key={item.id}
              year={item.created}
              title={item.name}
              imgSrc={item.imageUrl}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.search_error}>
          <p className={styles.error_content}>
            No matches for
            <span>{searchInput.current?.value}</span>
          </p>
          <p className={styles.error_advise}>
            Please try again with a different spelling or keywords.
          </p>
        </div>
      )}
      {pictureState.length >= 3 && (
        <div className={styles.pagination_block}>
          {/* data?.length ? Math.round(data.length / 6) : 0 */}
          <button
            onClick={() => setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))}
            type="button"
            className={`${styles.previos_button} ${styles.page_button} ${theme === 'light' ? styles.light : styles.dark}`}
          >
            <CircIcon fillColor={theme === 'dark' ? '#DEDEDE' : '#575757'} />
          </button>
          <PaginationComp
            maxPageNumbers={4}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            totalItems={data?.length ? Math.round(data.length / 6) : 0}
            itemsPerPage={1}
          />
          <button
            onClick={() => setCurrentPage((prev) => (prev === 9 ? prev : prev + 1))}
            type="button"
            className={`${styles.next_button} ${styles.page_button} ${theme === 'light' ? styles.light : styles.dark}`}
          >
            <CircIcon fillColor={theme === 'dark' ? '#DEDEDE' : '#575757'} />
          </button>
        </div>
      )}
    </div>
  );
}
