import { createContext, useContext, useReducer } from 'react';
import { BookData } from '../models/book';

export type AppState = {
  loading: boolean;
  books: BookData[];
  searchKeyTerm: string;
  searchResults: BookData[];
};

const INITIAL_STATE: AppState = {
  loading: false,
  books: [],
  searchKeyTerm: '',
  searchResults: [],
};
type ActionType = 'SET_BOOKS' | 'SEARCH' | 'SET_LOADER' | 'SET_SEARCH_KEY';

interface IAction {
  type: ActionType;
  payload: any;
}

const BooksContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

const booksReducer = (state: AppState, action: IAction): AppState => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_BOOKS':
      return { ...state, books: payload };
    case 'SET_LOADER':
      return { ...state, loading: payload };
    case 'SEARCH':
      return { ...state, searchResults: payload };
    case 'SET_SEARCH_KEY':
      return { ...state, searchKeyTerm: payload };
    default:
      return state;
  }
};

function BooksProvider(props: any) {
  const [state, dispatch] = useReducer(booksReducer, INITIAL_STATE);

  const booksData = { state, dispatch };

  return <BooksContext.Provider value={booksData} {...props} />;
}

// Here we create a custom hook that allows us to consume
// the books context
function useBooksContext() {
  return useContext(BooksContext);
}

export { BooksProvider, useBooksContext };
