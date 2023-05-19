import { type NextPage } from "next";
import { Quicksand } from "next/font/google"
import { type FormEvent, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import BookGrid from "~/components/BookGrid";
import type Book from "~/types/Book";
import Footer from "~/components/Footer";
import { FallingLines } from "react-loader-spinner";
import queries from "public/data.json"
import Head from "next/head"

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const BackgroundText: React.FC<{ texts: string[], setInputValue: Dispatch<SetStateAction<string>> }> = ({ texts, setInputValue }) => {
  return (
    <div className="absolute top-0 left-0 z-0 w-full h-full overflow-y-hidden">
      <p className="text-xl font-bold  transform  inline leading-loose">
        {texts.map((text, index) => (
          <span
            onClick={() => setInputValue(text)}
            key={index} className=" hover:opacity-30 mx-10 my-32 hover:bg-transparent bg-white  text-white opacity-5">
            {text}
            {' '}
          </span>
        ))}
      </p>
    </div>

  );
};

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
      <Head>
        <title>
          Book Whisperer
        </title>
        <meta name="description" content="Find the perfect book based on plot. Search, discover, and dive into your next reading adventure with BookWhisper . No matter the genre or author, we've got you covered." />
        <meta name="keywords" content="book finder, search book by plot, discover books, reading, literature" />

      </Head>
      <div className={`${quicksand.variable}`}>
        <Header />
        <div className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-12 sm:px-6 lg:px-8">
          <BackgroundText texts={queries.map((q) => q.query)} setInputValue={setInputValue} />

          <div className="z-10 flex flex-col items-center">
            <h2 className="mb-4 text-6xl font-bold text-myrtle_green">
              Hear the Call of the Books! 📣📚
            </h2>
            <p className="mb-4 text-xl font-bold text-peach_crayola">
              Just enter your preferred plot or book theme, and we&apos;ll reveal the book that&apos;s waiting to whisk you away on a captivating journey.
            </p>
            <form
              action="submit"
              onSubmit={handleSubmit}
              className="w-full max-w-3xl"
            >
              <textarea
                onChange={(event) => setInputValue(event.target.value)}
                className="w-full p-3 mb-8 text-xl text-white transition-all duration-200 ease-in-out rounded-lg bg-wintergreen_dream placeholder:text-white focus:scale-105 focus:outline-none"
                rows={6}
                value={inputValue}
                placeholder="Type your story..."
              ></textarea>
              <button className="flex items-center justify-center w-full px-4 py-3 text-xl font-bold text-center text-white transition-colors duration-200 ease-in-out rounded-lg bg-myrtle_green hover:bg-dark_jungle_green">
                {/* Search */}{
                  isLoading ?
                    <FallingLines
                      color="#FFF"
                      width="35"
                      visible={true}
                    /> : "Search"
                }

              </button>
            </form>
          </div>
          <div className="mt-12 z-10">
            <BookGrid isLoading={isLoading} books={data?.results || []} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
          </div>
        </div>
        <Footer />
      </div>

    </>
  );
};

export default Home;
