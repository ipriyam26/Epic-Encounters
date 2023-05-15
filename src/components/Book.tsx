import type Book from "~/types/Book";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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
                    className="fadeInUp bg-wild-blue-yonder mx-6 my-4 flex h-full w-full transform overflow-hidden rounded-lg shadow-lg transition-all duration-200 ease-in-out sm:h-52 md:mx-2 md:max-w-md lg:mx-6 lg:max-w-43 xl:max-w-27"
                >
                </motion.div>
            )}
            {!isSelected && (
                <div
                    onClick={handleClick}
                    className="fadeInUp mx-6 my-4 flex h-40  w-full transform overflow-hidden rounded-lg bg-eclipse shadow-lg transition-all duration-200 ease-in-out hover:scale-105 sm:h-52 md:mx-2 md:max-w-md lg:mx-6 lg:max-w-43 xl:max-w-27"
                >
                    <Image
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAA"
                        placeholder="blur"
                        height={300}
                        width={150}
                        className=" w-1/2 object-cover sm:h-full sm:w-2/5"
                        src={book.image}
                        alt={book.Title}
                    />
                    <div className="w-full px-6 py-4 sm:w-2/3">
                        <div className=" text-base md:text-xl font-bold text-moonstone_blue sm:text-lg">
                            {book.Title}
                        </div>
                        <p className="text-white my-1 text-sm sm:text-base md:text-lg font-bold">
                            {book.authors[0]}
                        </p>

                        <p className="text-xs text-manatee sm:text-base">
                            {book.description.slice(0, 100)}...
                        </p>
                    </div>
                </div>)}
        </AnimatePresence>
    );
}
