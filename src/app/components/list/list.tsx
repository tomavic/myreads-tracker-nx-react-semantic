import { Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BookData, BookRef } from 'src/app/models/book';
import { PATHS, shelves } from 'src/app/models/conf';
import Shelf from '../shelf/shelf';

type ListProps = {
  books: BookData[];
  onUpdateBook: (book: BookData | BookRef) => void;
};

export default function List({ onUpdateBook, books }: ListProps) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <DndProvider backend={HTML5Backend}>
          <div>
            <Shelf
              id={'currentlyReading'}
              title={shelves.currentlyReading}
              books={books.filter((book) => book.shelf === 'currentlyReading')}
              onUpdateBook={onUpdateBook}
            />
            <Shelf
              id={'wantToRead'}
              title={shelves.wantToRead}
              books={books.filter((book) => book.shelf === 'wantToRead')}
              onUpdateBook={onUpdateBook}
            />
            <Shelf
              id={'read'}
              title={shelves.read}
              books={books.filter((book) => book.shelf === 'read')}
              onUpdateBook={onUpdateBook}
            />
          </div>
        </DndProvider>
      </div>
      <div className="open-search">
        <Link to={PATHS.search}>Add a book</Link>
      </div>
    </div>
  );
}
