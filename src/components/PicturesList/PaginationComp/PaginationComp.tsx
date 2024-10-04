import type React from 'react';
import { useContext } from 'react';
import styles from './PaginationComp.module.scss';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  maxPageNumbers: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export const PaginationComp: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  maxPageNumbers,
  onPageChange,
  currentPage,
}) => {
  const { theme } = useContext(ThemeContext);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const half = Math.floor(maxPageNumbers / 2);

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i += 1) {
        pageNumbers.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - half);
      const end = Math.min(totalPages, currentPage + half);

      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) pageNumbers.push('...');
      }

      for (let i = start; i <= end; i += 1) {
        pageNumbers.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <ul
      className={styles.pagination}
      style={{ color: theme === 'dark' ? '#DEDEDE' : 'inherit' }}
    >
      {getPageNumbers().map((number) => (typeof number === 'number' ? (
        <button
          type="button"
          tabIndex={number}
          key={number}
          className={`${styles.page_item} ${number === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onPageChange(number);
          }}
        >
          {number}
        </button>
      ) : (
        <button type="button" key={number} className={styles.page_item}>
          {number}
        </button>
      )))}
    </ul>
  );
};
