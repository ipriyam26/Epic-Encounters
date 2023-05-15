import type Book from "~/types/Book";
import { AnimatePresence, motion } from 'framer-motion';

type BookProps = {
    book: Book;
    onClick: (book: Book) => void;
    isSelected: boolean;
};


export function Book({ book, onClick, isSelected }: BookProps) { // export function Book({ book }: { book: Book}) {
    const handleClick = () => {
        onClick(book);
    };

    const variants = {
        hidden: { scale: 1 },
        visible: { scale: 1.05 }
    };

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
        <AnimatePresence>

            {isSelected && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    transition={{ duration: 1 }}
                    onClick={handleClick}
                    className="flex my-4 mx-6 fadeInUp md:mx-2 lg:mx-6 bg-wild-blue-yonder rounded-lg overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform h-full sm:h-52 w-full md:max-w-md lg:max-w-43 xl:max-w-27"
                >
                    {/* Rest of your Book component here */}
                </motion.div>
            )}
            {
                !isSelected && (
                    <div
                        onClick={handleClick}
                        className="flex my-4 mx-6 fadeInUp md:mx-2 lg:mx-6 bg-eclipse rounded-lg overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 h-full sm:h-52 w-full md:max-w-md lg:max-w-43 xl:max-w-27"
                    >
                        <img className="w-full sm:w-2/5 h-1/3 sm:h-full object-cover" src={book.image} alt={book.Title} />
                        <div className="px-6 py-4 w-full sm:w-2/3">
                            <div className="font-bold text-lg sm:text-xl mb-2 text-moonstone_blue">{book.Title}</div>
                            <p className="text-manatee text-sm sm:text-base">
                                {book.authors[0]} <br />
                                {book.description.slice(0, 100)}...
                            </p>
                        </div>
                    </div>)
            }

        </AnimatePresence>





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
