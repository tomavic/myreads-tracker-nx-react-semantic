import { BookData } from 'src/app/models/book';
import Book from '../book/book';

type BookGridProps = {
  className?: string;
  books: BookData[];
};

export default function BookGrid({
  books = [],
  // TODO: remove prop and use custom style
  className = 'bookshelf-books',
}: BookGridProps) {
  return (
    <div className={className}>
      <ol className="books-grid">
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Book book={book} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
