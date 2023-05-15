import { ThreeDots } from "react-loader-spinner"; // Don't forget to install this package!
import type Book from "~/types/Book";
import { Book as GridBook } from "./Book";
import { useState } from "react";

interface BookGridProps {
  isLoading: boolean;
  books: Book[];
}



const BookGrid = ({ isLoading, books = [] }: BookGridProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  return (
    <>
      {
        books.length === 0 || !isLoading && (
          <div className="text-4xl text-moonstone_blue text-center font-bold mb-4 mt-8">
            Behold! Here are your results...
          </div>
        )
      }
      {selectedBook && <SelectedBook book={selectedBook} />}

      <div className="flex  w-full flex-wrap justify-center px-2">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ThreeDots color="#5C6AC4" height={80} width={80} />
          </div>
        ) : (

          books.map((book) => <GridBook onClick={(book) => setSelectedBook(book)} key={book.Title} book={book}></GridBook>)
        )}
      </div>
    </>
  );
};
const SelectedBook = ({ book }: { book: Book }) => (
<div className="bg-wild_blue_yonder my-10 mx-8 grid grid-cols-4 gap-1 rounded-lg overflow-hidden shadow-lg p-6 transition-all duration-200 ease-in-out transform scale-105">
  <img className="col-span-1 object-cover rounded-lg mx-auto my-auto h-96" src={book.image} alt={book.Title} />
  <div className="col-span-3 flex flex-col justify-around text-white">
    <h1 className="font-bold text-4xl mb-2">{book.Title}</h1>
    <h2 className="font-medium text-2xl mb-2 italic">{book.authors.join(", ")}</h2>
    <p className="text-lg mb-2">
      {book.description}
    </p>
    <div className="grid grid-cols-2 gap-4">
      <p className="text-base mb-2">
        <strong className="underline text-eclipse">Publisher:</strong> {book.publisher}
      </p>
      <p className="text-base mb-2">
        <strong className="underline text-eclipse">Published Date:</strong> {book.publishedDate}
      </p>
      <p className="text-base mb-2">
        <strong className="underline text-eclipse">Categories:</strong> {book.categories.join(", ")}
      </p>
      <p className="text-base mb-2">
        <strong className="underline text-eclipse">Ratings Count:</strong> {book.ratingsCount}
      </p>
    </div>
    <a href={book.infoLink} target="_blank" rel="noreferrer" className="mt-4 inline-block bg-eclipse rounded-lg font-bold text-xl transition-colors duration-200 ease-in-out hover:bg-whittext-white hover:text-moonstone_blue py-2 px-4">More info</a>
  </div>
</div>

);
//http://books.google.com/books/content?id=9VCz8zjqDQ8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
//https://books.google.co.in/books/content?id=9VCz8zjqDQ8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72kJpGTOo-p75rqOjdAWA5vLXlu4WJyZhpXaWWW5h0vqL0DJOODCx4yu0OmrvQRkyCZBJX3V0CONX5n-frA_FxbR-aFTK1vn_QHpjV857m8szEtNip0WsgxvwTVaXv2-bE-oxtK

export default BookGrid;
