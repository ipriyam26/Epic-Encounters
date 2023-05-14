import { type NextPage } from "next";
import { Quicksand } from "@next/font/google"
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import Loading from "~/components/Loading";
import { type DocumentData } from "firebase/firestore/lite";
import Image from "next/image";
import Header from "~/components/Header";


const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-quicksand',
  subsets: ["latin"]
});


const Home: NextPage = () => {
  // const hello = api.langchain.search;
  // const [inputValue, setInputValue] = useState(''); // State to hold input value
  // // const { data, isLoading,  } = api.langchain.search.useQuery({ text: "" });
  // const { mutate, data, isLoading } = api.langchain.search.useMutation();
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   mutate({ text: inputValue });
  // };
  return (
    <>
      <div className={`${quicksand.variable}`} >
        <Header />
        <div className="min-h-screen bg-eclipse pt-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-6xl text-moonstone_blue font-bold mb-4 animate-pulse">
              Hear the Call of the Books! 📣📚
            </h2>
            <p className="text-xl text-manatee mb-4">
              Books tell stories, and we know just how to listen. Find your next tale here!
            </p>
            <textarea className="w-full mb-8 p-3 text-xl text-manatee bg-wild-blue-yonder rounded-lg transition duration-500 ease-in-out transform focus:-rotate-6 focus:outline-none" rows={6} placeholder="Type your message..."></textarea>
            <button className="w-full py-3 px-4 bg-moonstone_blue text-white rounded-lg font-bold text-xl animate-pulse">
              Send Message
            </button>
          </div>
        </div>




        {/* <form onSubmit={handleSubmit}>

          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
          <textarea id="message" rows={4} className="" placeholder="Write your thoughts here..."></textarea>

          <input
            type="text"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          {isLoading && <Loading />}
          <ul>
            {
              data?.results.map((doc: DocumentData) => (

                <li key={doc['Title'] as string}>
                  <h2>{doc['Title'] as string}</h2>
                  <p>{doc['description']}</p>
                </li>
              ))
            }
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default Home;
