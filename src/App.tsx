import { type ReactNode } from 'react';
import { Container } from './styles';
import BaseLayout from './layouts/base';
import './assets/styles/fonts.css';
import './assets/styles/base-style.css';
import { Route, Routes } from 'react-router';
import { menu } from './constants/router';
import type { IMenuRoute } from './interfaces/components';
import NoMatch from './pages/no-match';

const App = (): ReactNode => {
  return (
    <Container>
      <BaseLayout>
        <Routes location={location} key={location.pathname}>
          {menu.map((route: IMenuRoute) => {
            if (route.component) {
              return (
                <Route
                  key={route.id}
                  path={route.link}
                  element={<route.component />}
                />
              );
            } else return null;
          })}
          <Route path={'*'} element={<NoMatch />} />
        </Routes>
      </BaseLayout>
    </Container>
  );
};

export default App;
