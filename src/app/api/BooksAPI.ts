import { BookData, BookDraggedItem } from '../models/book';

const api = 'https://reactnd-books-api.udacity.com';

let token: unknown = window.localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).slice(-8);

const headers = {
  Accept: 'application/json',
  // TODO: use user id as a token to get list of books
  Authorization: token as string,
};

export const get = async (bookId: string | null): Promise<BookData> => {
  const res = await fetch(`${api}/books/${bookId}`, { headers });
  const data = await (res.json() as Promise<{ book: BookData }>);
  return data.book;
};

export const getAll = async (): Promise<BookData[]> => {
  const res = await fetch(`${api}/books`, { headers });
  const data = await (res.json() as Promise<{ books: BookData[] }>);
  return data.books;
};

export const update = async (
  book: BookData | BookDraggedItem,
  shelf: string
): Promise<BookData> => {
  const res = await fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  });
  const data = await (res.json() as Promise<{ book: BookData }>);
  return data.book;
};

export const search = async (
  query: string,
  maxResults: number
): Promise<BookData[]> => {
  const res = await fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, maxResults }),
  });
  const data = await (res.json() as Promise<{ books: BookData[] }>);
  return data.books;
};
