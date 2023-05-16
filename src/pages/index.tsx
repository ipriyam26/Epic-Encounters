import { type NextPage } from "next";
import { Quicksand } from "next/font/google"
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import BookGrid from "~/components/BookGrid";
import type Book from "~/types/Book";
import Footer from "~/components/Footer";
import { FallingLines } from "react-loader-spinner";

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
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
        <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-12 sm:px-6 lg:px-8">
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
                className="w-full p-3 mb-8 text-xl text-white transition-all duration-200 ease-in-out rounded-lg bg-wild_blue_yonder placeholder:text-white focus:scale-105 focus:outline-none"
                rows={6}
                placeholder="Type your story..."
              ></textarea>
              <button className="flex items-center justify-center w-full px-4 py-3 text-xl font-bold text-center text-white transition-colors duration-200 ease-in-out rounded-lg bg-moonstone_blue hover:bg-wild_blue_yonder">
                {/* Search */}{
                  isLoading ?
                    <FallingLines
                      color="#FFF"
                      width="30"
                      visible={true}

                    /> : "Search"
                }

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
