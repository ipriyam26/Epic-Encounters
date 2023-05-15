import { type NextPage } from "next";
import { Quicksand } from "@next/font/google"
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { type DocumentData } from "firebase/firestore/lite";
import Header from "~/components/Header";
import BookGrid from "~/components/BookGrid";


const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-quicksand',
  subsets: ["latin"]
});


const Home: NextPage = () => {
  // const hello = api.langchain.search;
  const [inputValue, setInputValue] = useState(''); // State to hold input value
  const { mutate, data, isLoading } = api.langchain.search.useMutation();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ text: inputValue });
  };
  return (
    <>
      <div className={`${quicksand.variable}`} >
        <Header />
        <div className="min-h-screen bg-eclipse pt-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-6xl text-moonstone_blue font-bold mb-4">
              Hear the Call of the Books! 📣📚
            </h2>
            <p className="text-xl text-manatee mb-4">
              Books tell stories, and we know just how to listen. Find your next tale here!
            </p>
            <form action="submit" onSubmit={handleSubmit} className="w-full max-w-3xl">
              <textarea
                onChange={event => setInputValue(event.target.value)}
                className="w-full mb-8 p-3 text-xl text-manatee bg-wild-blue-yonder rounded-lg focus:outline-none transition-all duration-200 ease-in-out focus:scale-105" rows={6} placeholder="Type your message..."></textarea>
              <button
                className="w-full py-3 px-4 bg-moonstone_blue text-white rounded-lg font-bold text-xl transition-colors duration-200 ease-in-out hover:bg-manatee hover:text-wild-blue-yonder">
                Search
              </button>
            </form>
          </div>
          <div className="mt-12">




            <BookGrid isLoading={isLoading} books={data?.results || []} />


          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
