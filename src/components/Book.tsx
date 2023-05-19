/* eslint-disable @next/next/no-img-element */
import type Book from "~/types/Book";
import { AnimatePresence, motion } from "framer-motion";

type BookProps = {
    book: Book;
    onClick: (book: Book) => void;
    isSelected: boolean;
};

export function Book({ book, onClick, isSelected }: BookProps) {
    // export function Book({ book }: { book: Book}) {
    const handleClick = () => {
        onClick(book);
    };

    const variants = {
        hidden: { scale: 1 },
        visible: { scale: 1.05 },
    };

    return (
        <AnimatePresence>
            {isSelected && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    transition={{ duration: 1 }}
                    onClick={handleClick}
                    className="flex w-full h-full mx-6 my-4 overflow-hidden transition-all duration-200 ease-in-out transform rounded-lg shadow-lg fadeInUp bg-wild-blue-yonder sm:h-52 md:mx-2 md:max-w-md lg:mx-6 lg:max-w-43 xl:max-w-27"
                >
                </motion.div>
            )}
            {!isSelected && (
                <div
                    onClick={handleClick}
                    className="flex w-full h-40 mx-6 my-4 overflow-hidden transition-all duration-200 ease-in-out transform rounded-lg shadow-lg fadeInUp bg-eclipse hover:scale-105 sm:h-52 md:mx-2 md:max-w-md lg:mx-6 lg:max-w-43 xl:max-w-27"
                >
                    <img
                        loading="lazy"
                        decoding="async"
                        height={300}
                        width={150}
                        className="object-cover w-1/2 sm:h-full sm:w-2/5"
                        src={book.image}
                        alt={book.Title}
                    />
                    <div className="w-full px-6 py-4 sm:w-2/3">
                        <div className="text-base font-bold md:text-xl text-myrtle_green sm:text-lg">
                            {book.Title}
                        </div>
                        <p className="my-1 text-sm font-bold text-peach_crayola sm:text-base md:text-lg">
                            {book.authors[0]}
                        </p>

                        <p className="text-xs text-white sm:text-base">
                            {book.description.slice(0, 100)}...
                        </p>
                    </div>
                </div>)}
        </AnimatePresence>
    );
}
