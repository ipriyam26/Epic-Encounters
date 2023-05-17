import { motion } from "framer-motion";
import type Book from "~/types/Book";

const SelectedBook = ({ book }: { book: Book }) => (
    <motion.div
        layoutId={book.Title}
        className="gap-2 p-6 mx-8 my-10 overflow-hidden transition-all duration-200 ease-in-out transform scale-105 rounded-lg shadow-lg bg-dark_jungle_green lg:grid lg:grid-cols-4"
    >
        <motion.div className="rounded-lg sm:bg-eclipse md:mx-44 md:py-10 lg:hidden">
            <motion.img
                layoutId={`image-${book.Title}`}
                className="block object-contain w-full h-48 mx-auto my-auto rounded-lg lg:hidden"
                src={book.image}
                alt={book.Title}
            />
        </motion.div>
        <motion.img
            className="hidden mx-auto my-auto rounded-lg lg:block lg:h-96 lg:w-auto lg:object-cover"
            src={book.image}
            alt={book.Title}
        />
        <div className="flex flex-col justify-around mt-6 text-white lg:col-span-3 lg:mt-0">
            <h1 className="mb-2 text-2xl text-myrtle_green font-bold lg:text-3xl">{book.Title}</h1>
            <h2 className="mb-2 text-lg italic text-peach_crayola font-medium lg:text-2xl">
                {book.authors.join(", ")}
            </h2>
            <p className="mb-2 text-sm lg:text-lg">{book.description}</p>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <p className="mb-2 text-sm lg:text-base">
                    <strong className="underline text-myrtle_green">Publisher:</strong>{" "}
                    {book.publisher}
                </p>
                <p className="mb-2 text-sm lg:text-base">
                    <strong className="underline text-myrtle_green">Published Date:</strong>{" "}
                    {book.publishedDate}
                </p>
                <p className="mb-2 text-sm lg:text-base">
                    <strong className="underline text-myrtle_green">Categories:</strong>{" "}
                    {book.categories.join(", ")}
                </p>
                <p className="mb-2 text-sm lg:text-base">
                    <strong className="underline text-myrtle_green">Ratings Count:</strong>{" "}
                    {book.ratingsCount}
                </p>
            </div>
            <a
                href={book.infoLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 mt-4 text-lg font-bold transition-colors duration-200 ease-in-out rounded-lg hover:bg-white text-white bg-myrtle_green hover:text-myrtle_green lg:text-xl"
            >
                More info
            </a>
        </div>
    </motion.div>
);

export default SelectedBook;
