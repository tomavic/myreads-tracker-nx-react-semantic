import { RouteObject } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { Suspense, lazy } from 'react';
import { BooksProvider } from './context/books-context';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense
      fallback={
        <Player
          src="https://assets4.lottiefiles.com/packages/lf20_4XmSkB.json"
          className="player"
          style={{ height: '60vh', width: '50vw' }}
          loop
          autoplay
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );

// *  AUTHENTICATION PAGES

//  * APP PAGE
const Home = Loadable(lazy(() => import('./pages/home/home-page')));
const Search = Loadable(lazy(() => import('./pages/search/search')));
const Details = Loadable(
  lazy(() => import('./pages/book-details/book-details'))
);
const NotFound = Loadable(lazy(() => import('./layouts/not-found')));

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <BooksProvider>
        <Home />
      </BooksProvider>
    ),
  },
  {
    index: true,
    path: 'search',
    element: (
      <BooksProvider>
        <Search />
      </BooksProvider>
    ),
  },
  {
    index: true,
    path: 'book/:id',
    element: (
      <BooksProvider>
        <Details />
      </BooksProvider>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
