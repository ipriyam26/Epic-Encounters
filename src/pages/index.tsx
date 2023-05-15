import { type NextPage } from "next";
import { Quicksand } from "@next/font/google";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import BookGrid from "~/components/BookGrid";
import type Book from "~/types/Book";
import Footer from "~/components/Footer";

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState(""); // State to hold input value
  const { mutate, data, isLoading } = api.langchain.search.useMutation();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedBook(null);
    mutate({ text: inputValue });
  };
  return (
    <>
      <div className={`${quicksand.variable}`}>
        <Header />
        <div className="flex min-h-screen flex-col items-center justify-center  px-4 pt-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-6xl font-bold text-moonstone_blue">
              Hear the Call of the Books! 📣📚
            </h2>
            <p className="mb-4 text-xl text-manatee">
            Just enter your preferred plot or book theme, and we&apos;ll reveal the book that&apos;s waiting to whisk you away on a captivating journey.
            </p>
            <form
              action="submit"
              onSubmit={handleSubmit}
              className="w-full max-w-3xl"
            >
              <textarea
                onChange={(event) => setInputValue(event.target.value)}
                className="bg-wild_blue_yonder mb-8 w-full rounded-lg p-3 text-xl text-white placeholder:text-white transition-all duration-200 ease-in-out focus:scale-105 focus:outline-none"
                rows={6}
                placeholder="Type your story..."
              ></textarea>
              <button className=" w-full rounded-lg bg-moonstone_blue px-4 py-3 text-xl font-bold text-white transition-colors duration-200 ease-in-out hover:bg-wild_blue_yonder">
                Search
              </button>
            </form>
          </div>
          <div className="mt-12">
            <BookGrid isLoading={isLoading} books={data?.results || []} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
          </div>
        </div>
        <Footer />
      </div>

    </>
  );
};

export default Home;
