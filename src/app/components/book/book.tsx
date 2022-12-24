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
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

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

  const updateOnSelect = (shelf: any) => {
    const updatedBook: BookData | BookDraggedItem = { ...book, shelf };
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
