import { useDrop } from 'react-dnd';
import { useBooksContext } from 'src/app/context/books-context';
import { BookData } from 'src/app/models/book';
import { DND } from 'src/app/models/conf';
import BookGrid from '../book-grid/book-grid';

type BookshelfProps = {
  title: string;
  id: string;
};

export default function Shelf({ id, title }: BookshelfProps) {
  const { books } = useBooksContext();

  // use Drag & Drop
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DND.type,
    drop: () => ({ id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <div id={id} ref={drop} className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className={isActive ? 'shelf-active' : 'shelf-inactive'}>
        <BookGrid
          books={books?.filter((book: BookData) => book.shelf === id)}
        />
      </div>
    </div>
  );
}
