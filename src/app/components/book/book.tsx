import {
  BookData,
  BookDropResult,
  BookDraggedItem,
  shelves,
} from 'src/app/models/book';
import { DEFAULT_BOOK_COVER, DND } from 'src/app/models/conf';
import { useDrag } from 'react-dnd';
import { useBooksContext } from 'src/app/context/books-context';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import * as BooksAPI from '../../api/BooksAPI';

type BookProps = {
  book: BookData;
};

export default function Book({ book }: BookProps) {
  // TODO: use dispatch instead to update book shelf
  const { state, dispatch } = useBooksContext();

  const bookCover: string =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : DEFAULT_BOOK_COVER;

  const handleBookDrag = (b: BookData | BookDraggedItem, shelf: string) => {
    const updatedBook: BookData | BookDraggedItem = { ...b, shelf };
    updateBook(updatedBook);
  };

  const updateOnSelect = (shelf: any) => {
    const updatedBook: BookData | BookDraggedItem = { ...book, shelf };
    updateBook(updatedBook);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND.type,
    item: { title: book.title, id: book.id, shelf: book.shelf },
    end: (item, monitor) => {
      const dropResult: BookDropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item.shelf !== dropResult.id) {
          handleBookDrag(item, dropResult.id);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  const updateBook = async (
    book: BookData | BookDraggedItem
  ): Promise<void> => {
    const existingBook = state.books.find((b) => b.id === book.id);
    try {
      if (existingBook) {
        const shelf = existingBook.shelf;
        if (shelf === book.shelf) {
          //No change
          console.log('Target and origin are the same', book);
          return;
        } else if (shelf === 'none') {
          //Remove
          await BooksAPI.update(book, book.shelf);
          dispatch({
            type: 'SET_BOOKS',
            payload: state.books.filter((b) => b.id !== existingBook.id),
          });
        } else {
          //Change
          await BooksAPI.update(book, book.shelf);
          Object.assign(existingBook, book);
          dispatch({ type: 'SET_BOOKS', payload: [...state.books] });
        }
      } else {
        await BooksAPI.update(book, book.shelf);
        dispatch({
          type: 'SET_BOOKS',
          payload: [...state.books, book] as BookData[],
        });
      }
    } catch (e) {
      console.log('Error updating book:', e);
    }
  };

  return (
    <Card ref={drag} className="book" style={{ opacity }}>
      <div className="card-more">
        <Dropdown onSelect={updateOnSelect}>
          <Dropdown.Toggle className="w-100" variant="dark" id="dropdown-basic">
            <FontAwesomeIcon className="text-light" icon={faEllipsis} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Object.keys(shelves).map((s) => {
              return (
                <Dropdown.Item
                  eventKey={s}
                  active={book.shelf === s}
                  key={s}
                  value={s}
                >
                  {shelves[s]}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Card.Img variant="top" src={bookCover} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          Authors:{' '}
          {book.authors &&
            book.authors.map((author) => <span key={author}>{author}</span>)}
        </Card.Text>
        <p className="mt-3">
          {book.ratingsCount ? 'Ratings: ' + book.ratingsCount : ''}
        </p>
        <Link to={'book/' + book.id}>
          <Button className="w-100" variant="primary" size="lg">
            <FontAwesomeIcon className="text-light me-1" icon={faEye} />
            View Details
          </Button>
        </Link>
      </Card.Body>
      <Card.Footer>
        <small>
          Published {book.publisher ? 'by ' + book.publisher + ' | ' : ''}{' '}
          {book.publishedDate}
        </small>
      </Card.Footer>
    </Card>
  );
}
