import { useDrop } from 'react-dnd';
import { BookData, BookRef } from 'src/app/models/book';
import { DND } from 'src/app/models/conf';
import BookGrid from '../book-grid/bookgrid';

type BookshelfProps = {
  books: BookData[];
  onUpdateBook: (book: BookData | BookRef) => void;
  title: string;
  id: string;
};

export default function Shelf({
  id,
  title,
  books,
  onUpdateBook,
}: BookshelfProps) {
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
      <div className={isActive ? 'active' : 'inactive'}>
        <BookGrid onUpdateBook={onUpdateBook} books={books} />
      </div>
    </div>
  );
}
