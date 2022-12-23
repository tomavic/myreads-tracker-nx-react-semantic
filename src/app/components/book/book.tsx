import { useState } from 'react';
import {
  BookData,
  BookDropResult,
  BookDraggedItem,
  shelves,
} from 'src/app/models/book';
import { DEFAULT_BOOK_COVER, DND } from 'src/app/models/conf';
import { useDrag } from 'react-dnd';
import { useBooksContext } from 'src/app/context/booksContext';

type BookProps = {
  book: BookData;
};

export default function Book({ book }: BookProps) {
  const booksContext = useBooksContext();

  const bookCover: string =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : DEFAULT_BOOK_COVER;
  const [shelf, setShelf] = useState(book.shelf);
  const handleChangeShelf = (b: BookData | BookDraggedItem, shelf: string) => {
    const updatedBook: BookData | BookDraggedItem = { ...b, shelf };
    setShelf(shelf);
    booksContext.updateBook(updatedBook);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND.type,
    item: { title: book.title, id: book.id, shelf: book.shelf },
    end: (item, monitor) => {
      const dropResult: BookDropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item.shelf !== dropResult.id) {
          handleChangeShelf(item, dropResult.id);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} className="book" style={{ opacity }}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${bookCover}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onBlur={(e) => handleChangeShelf(book, e.target.value)}
            defaultValue={shelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            {Object.keys(shelves).map((s) => {
              return (
                <option key={s} value={s}>
                  {shelves[s]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors && (
          <ul>
            {book.authors.map((author) => (
              <li key={author}>{author}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
