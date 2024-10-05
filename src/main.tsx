import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import './index.scss';

import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import { Layout } from './components/Layout/Layout';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route path="/framawork-team-test-task" element={<Layout />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
