// import Loading from "react-loader-spinner"; // Don't forget to install this package!
import type Book from "~/types/Book";
import { Book as GridBook } from "./Book";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import SelectedBook from "./SelectedBook";

interface BookGridProps {
  isLoading: boolean;
  books: Book[];
  selectedBook: Book | null
  setSelectedBook: Dispatch<SetStateAction<Book | null>>;
}



const BookGrid = ({ isLoading, books = [], selectedBook, setSelectedBook }: BookGridProps) => {


  const bookComponents = useMemo(() =>
    books.map((book) => <GridBook isSelected={selectedBook?.Title === book.Title} onClick={
      () => setSelectedBook(book)
    } key={book.Title} book={book} />),
    [books, selectedBook?.Title, setSelectedBook]
  );

  return (
    <>
      {
        books.length === 0 || !isLoading && (
          <div className="mt-8 mb-4 text-4xl font-bold text-center text-moonstone_blue">
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
function useCallback(arg0: (book: any) => () => void, arg1: Dispatch<SetStateAction<Book | null>>[]) {
  throw new Error("Function not implemented.");
}

