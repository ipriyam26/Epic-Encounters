import type Book from "~/types/Book";

type BookProps = {
    book: Book;
};


export function Book({book}: BookProps) { // export function Book({ book }: { book: Book}) {

    return ( 
        // <a key={book.Title} href={book.infoLink} target="_blank" rel="noreferrer" className="flex px-4 py-2 my-2 mx-6 rounded-lg overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 w-full h-56 md:w-1/4">
        //   <img className="w-1/3  object-cover my-auto rounded-md" src={book.image} alt={book.Title} />
        //   <div className="px-6  w-2/3">
        //     <div className="font-bold text-xl mb-2 text-manatee">{book.Title}</div>
        //     <p className="text-manatee text-base overflow-hidden">
        //       {book.authors[0]} <br />
        //       {book.description.slice(0, 100)}...
        //     </p>
        //   </div>
        // </a>
        <a 
        href={book.infoLink} 
        target="_blank" 
        rel="noreferrer" 
        className="flex my-4 mx-6 fadeInUp md:mx-2 lg:mx-6 bg-wild-blue-yonder rounded-lg overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 h-full sm:h-52 w-full md:max-w-md lg:max-w-43 xl:max-w-27">
        <img className="w-full sm:w-2/5 h-1/3 sm:h-full object-cover" src={book.image} alt={book.Title} />
        <div className="px-6 py-4 w-full sm:w-2/3">
            <div className="font-bold text-lg sm:text-xl mb-2 text-manatee">{book.Title}</div>
            <p className="text-manatee text-sm sm:text-base">
                {book.authors[0]} <br />
                {book.description.slice(0, 100)}...
            </p>
        </div>
    </a> 
    
        
        // <a key={book.infoLink} href={book.infoLink} target="_blank" rel="noreferrer" className="w-64 m-4 bg-wild-blue-yonder rounded-lg overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">
        //   <img className="w-full h-64 object-contain p-1" src={book.image} alt={book.Title} />
        //   <div className="px-6 py-4">
        //     <div className="font-bold text-xl mb-2 text-manatee">{book.Title}</div>
        //     <p className="text-manatee text-base">
        //       {book.authors[0]} <br />
        //       {book.description.slice(0, 100)}...
        //     </p>
        //   </div>
        // </a>
    );
}
