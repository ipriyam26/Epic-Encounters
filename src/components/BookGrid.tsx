import { ThreeDots } from "react-loader-spinner"; // Don't forget to install this package!
import type Book from "~/types/Book";
import { Book as GridBook } from "./Book";

interface BookGridProps {
  isLoading: boolean;
  books: Book[];
}



const BookGrid = ({ isLoading, books = [] }: BookGridProps) => {
  return (
    <>
      {
        books.length === 0 || !isLoading && (
          <div className="text-4xl text-moonstone_blue text-center font-bold mb-4 mt-8">
            Behold! Here are your results...
          </div>
        )
      }

      <div className="flex  w-full flex-wrap justify-center px-2">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ThreeDots color="#5C6AC4" height={80} width={80} />
          </div>
        ) : (

          books.map((book) => <GridBook key={book.Title} book={book}></GridBook>)
        )}
      </div>
    </>
  );
};

export default BookGrid;
