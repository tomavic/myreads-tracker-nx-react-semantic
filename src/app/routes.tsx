import { Player } from '@lottiefiles/react-lottie-player';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { BooksProvider } from './context/booksContext';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense
      fallback={
        <Player
          src="https://assets4.lottiefiles.com/packages/lf20_4XmSkB.json"
          className="player"
          style={{ height: '300px', width: '300px' }}
          loop
          autoplay
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );

// *  Main PAGES
const Home = Loadable(lazy(() => import('./pages/home/home-page')));
const Search = Loadable(lazy(() => import('./pages/search/search')));

const routes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <p>Login Page</p>,
      },
      {
        path: 'register',
        element: <p>Register Page</p>,
      },
    ],
  },
  {
    path: '/',
    index: true,
    element: (
      <BooksProvider>
        <Home />
      </BooksProvider>
    ),
  },
  {
    path: '/search',
    index: true,
    element: (
      <BooksProvider>
        <Search />
      </BooksProvider>
    ),
  },
  {
    path: '*',
    element: <p>Not Found 404 </p>,
  },
];

export default routes;
