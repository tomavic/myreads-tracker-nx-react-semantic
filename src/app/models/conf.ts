export type Shelves = {
  [key: string]: string;
};

export const shelves: Shelves = {
  currentlyReading: 'Currently reading',
  wantToRead: 'Want to Read',
  read: 'Read',
  none: 'None',
};

export const MAX_RESULTS = 50;

export const PATHS = {
  list: '/',
  search: '/search',
};

export const DND = {
  type: 'book',
};

export const DEFAULT_BOOK_COVER = 'book.png';
