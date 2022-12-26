import { BookData } from 'src/app/models/book';
import Book from '../book/book';

type BookGridProps = {
  books: BookData[];
};

export default function BookGrid({ books = [] }: BookGridProps) {
  return (
    <ol className="books-grid">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <Book book={book} />
          </li>
        );
      })}
    </ol>
  );
}
