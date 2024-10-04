import React from 'react';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';
import { PicturesList } from '../PicturesList/PicturesList';

export function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <PicturesList />
    </div>
  );
}
