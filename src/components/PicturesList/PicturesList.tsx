import { FC, useEffect, useState } from "react";
import { useGetAuthorsQuery } from "../../app/services/authorsApi";
import {
  changePage,
  useChangePageQuery,
  useGetPaintsQuery,
} from "../../app/services/paintingsApi";
import { AuthorsRespone, PaintsResponse } from "../../app/types";
import { baseUrl } from "../../constants";
import { PictureItem } from "./PictureItem/PictureItem";
import styles from "./PicturesList.module.scss";
import axios from "axios";
import { linkAuthorsWithPaints } from "../../utils/linkPaintsAndAuthors";
import Circ from "../../images/icons/Circ.svg";
import { PaginationComp } from "./PaginationComp/PaginationComp";

type Author = AuthorsRespone;
type Paint = PaintsResponse;

type PaintWithName = Paint & {
  authorName: string;
};

export const PicturesList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pictureState, changeState] = useState<PaintWithName[] | never[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const {
    data: authorsData,
    isLoading: isAuthorsLoading,
    error: authorsError,
  } = useGetAuthorsQuery();

  const { data } = useGetPaintsQuery();

  useEffect(() => {
    if (authorsData) {
      fetchNewPage(currentPage);
    }
  }, [authorsData, currentPage]);

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

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  if (isAuthorsLoading || loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error || authorsError) {
    return <div>Ошибка: {error || "Ошибка загрузки авторов"}</div>;
  }

  return (
    <div className={styles.main}>
      <ul className={styles.card_list}>
        {pictureState.map((item: any) => (
          <PictureItem
            text="Lorem Ipsum"
            aurhorName={item.authorName}
            key={item.id}
            year={item.created}
            title={item.name}
            imgAlt={item.name}
            imgSrc={item.imageUrl}
          />
        ))}
      </ul>
      <div className={styles.pagination_block}>
        {/* data?.length ? Math.round(data.length / 6) : 0 */}
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
          }
          type="button"
          className={styles.previos_button}
        >
          <img src={Circ} alt="Вперед" />
        </button>
        <PaginationComp
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          totalItems={9}
          itemsPerPage={1}
        />
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev === 9 ? prev : prev + 1))
          }
          type="button"
          className={styles.next_button}
        >
          <img src={Circ} alt="Назад" />
        </button>
      </div>
    </div>
  );
};
