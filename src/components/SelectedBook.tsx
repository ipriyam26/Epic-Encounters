import { motion } from "framer-motion";
import type Book from "~/types/Book";

const SelectedBook = ({ book }: { book: Book }) => (
    <motion.div
        layoutId={book.Title}
        className="bg-wild_blue_yonder my-10 mx-8 lg:grid lg:grid-cols-4 gap-1 rounded-lg overflow-hidden shadow-lg p-6 transition-all duration-200 ease-in-out transform scale-105"
    >
        <motion.div className="sm:bg-eclipse md:mx-44 md:py-10 rounded-lg lg:hidden">
            <motion.img layoutId={`image-${book.Title}`} className="object-contain block lg:hidden rounded-lg mx-auto my-auto h-48 w-full" src={book.image} alt={book.Title} />
        </motion.div>
        <motion.img className="hidden lg:block lg:object-cover rounded-lg mx-auto my-auto lg:h-96 lg:w-auto" src={book.image} alt={book.Title} />
        <div className="mt-6 lg:mt-0 lg:col-span-3 flex flex-col justify-around text-white">
            <h1 className="font-bold text-2xl lg:text-3xl mb-2">{book.Title}</h1>
            <h2 className="font-medium text-lg lg:text-2xl mb-2 italic">{book.authors.join(", ")}</h2>
            <p className="text-sm lg:text-lg mb-2">
                {book.description}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <p className="text-sm lg:text-base mb-2">
                    <strong className="underline text-eclipse">Publisher:</strong> {book.publisher}
                </p>
                <p className="text-sm lg:text-base mb-2">
                    <strong className="underline text-eclipse">Published Date:</strong> {book.publishedDate}
                </p>
                <p className="text-sm lg:text-base mb-2">
                    <strong className="underline text-eclipse">Categories:</strong> {book.categories.join(", ")}
                </p>
                <p className="text-sm lg:text-base mb-2">
                    <strong className="underline text-eclipse">Ratings Count:</strong> {book.ratingsCount}
                </p>
            </div>
            <a href={book.infoLink} target="_blank" rel="noreferrer" className="mt-4 inline-block bg-eclipse rounded-lg font-bold text-lg lg:text-xl transition-colors duration-200 ease-in-out hover:bg-whittext-white hover:text-moonstone_blue py-2 px-4">More info</a>
        </div>
    </motion.div>
);

export default SelectedBook;