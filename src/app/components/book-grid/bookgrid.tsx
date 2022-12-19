import { BookData, BookRef } from 'src/app/models/book';
import Book from '../book/book';

type BookGridProps = {
  className?: string;
  books: BookData[];
  onUpdateBook: (book: BookData | BookRef) => void;
};

export default function BookGrid({
  books = [],
  onUpdateBook,
  className = 'bookshelf-books',
}: BookGridProps) {
  return (
    <div className={className}>
      <ol className="books-grid">
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Book book={book} onUpdateBook={onUpdateBook} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
