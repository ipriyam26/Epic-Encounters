// import Loading from "react-loader-spinner"; // Don't forget to install this package!
import type Book from "~/types/Book";
import { Book as GridBook } from "./Book";
import { useMemo, useCallback, type Dispatch, type SetStateAction } from "react";
import SelectedBook from "./SelectedBook";

interface BookGridProps {
  isLoading: boolean;
  books: Book[];
  selectedBook: Book | null
  setSelectedBook: Dispatch<SetStateAction<Book | null>>;
}



const BookGrid = ({ isLoading, books = [], selectedBook, setSelectedBook }: BookGridProps) => {
  const handleBookClick = useCallback((book: Book) => () => setSelectedBook(book), [setSelectedBook]);


  const bookComponents = useMemo(() =>
    books.map((book) => <GridBook isSelected={selectedBook?.Title === book.Title} onClick={
      handleBookClick(book)} key={book.Title} book={book} />),
    [books, handleBookClick, selectedBook?.Title]
  );

  return (
    <>
      {
        books.length === 0 || !isLoading && (
          <div className="mt-8 mb-4 text-4xl font-bold text-center text-myrtle_green">
            Behold! Here are your results...
          </div>
        )
      }
      {selectedBook && !isLoading && <SelectedBook book={selectedBook} />}

      <div className="flex flex-wrap justify-center w-full px-2">
        {!isLoading && bookComponents}
      </div>
    </>
  );
};

export default BookGrid;


