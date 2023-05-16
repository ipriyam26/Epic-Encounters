import { type NextPage } from "next";
import { Quicksand } from "next/font/google"
import { type FormEvent, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import BookGrid from "~/components/BookGrid";
import type Book from "~/types/Book";
import Footer from "~/components/Footer";
import { FallingLines } from "react-loader-spinner";
// import json from public data.json
import queries from "public/data.json"

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
            key={index} className=" hover:opacity-30 mx-10 my-32 hover:bg-transparent bg-pink-50 text-white opacity-10">
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

  // const backgroundTexts = "Labore esse reprehenderit eiusmod. Nulla mollit excepteur laboris dolor est esse. Amet consectetur ex aliqua nulla fugiat eu quis occaecat nulla enim sit adipisicing cupidatat. Eu laborum labore qui fugiat sint ut. Labore incididunt fugiat nisi qui incididunt ex non ipsum. Pariatur irure non est. Cillum Lorem incididunt Lorem cupidatat do aliquip officia commodo non dolor excepteur duis voluptate. Nostrud veniam aliqua elit proident ullamco esse veniam fugiat proident. Do magna dolore ut eu labore minim elit est et minim Lorem nulla. Occaecat ex culpa cupidatat veniam amet dolor adipisicing commodo est sint aliquip. Fugiat Lorem ea laborum id ut esse sunt enim nulla nostrud cupidatat minim aliquip nisi. Do minim dolor ullamco. Enim proident cillum adipisicing. Elit dolor ipsum fugiat quis amet voluptate eiusmod et proident. Aute id aliqua veniam et nostrud amet do elit ex mollit amet cillum qui. Culpa veniam non non deserunt cillum ea in officia. Sint mollit aliquip adipisicing laboris. Dolore labore amet sit cupidatat cupidatat nulla. Eu esse eiusmod commodo sit consectetur qui nulla pariatur est nisi. Veniam nulla sit anim excepteur ex sint elit eu sunt cillum est nulla ipsum. Dolor qui sit reprehenderit. Adipisicing excepteur duis aute irure consectetur fugiat. Deserunt sit dolore et laboris ad excepteur nisi qui proident sunt nostrud cillum excepteur deserunt. Nostrud minim cupidatat sit. Aliqua non laboris officia culpa aliquip velit Lorem occaecat amet officia duis exercitation consequat aliqua nisi. Reprehenderit ex tempor do non tempor aliqua exercitation sit do ut excepteur consequat adipisicing ex."


  return (
    <>
      <div className={`${quicksand.variable}`}>
        <Header />
        <div className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-12 sm:px-6 lg:px-8">
          <BackgroundText texts={queries.map((q) => q.query)} setInputValue={setInputValue} />

          <div className="z-10 flex flex-col items-center">
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
                value={inputValue}
                placeholder="Type your story..."
              ></textarea>
              <button className="flex items-center justify-center w-full px-4 py-3 text-xl font-bold text-center text-white transition-colors duration-200 ease-in-out rounded-lg bg-moonstone_blue hover:bg-wild_blue_yonder">
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
