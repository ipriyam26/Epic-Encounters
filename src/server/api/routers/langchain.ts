import { z } from "zod";
import { PineconeClient } from "@pinecone-database/pinecone";
import { env } from "~/env.mjs";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore/lite";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { initializeApp } from "firebase/app";
import type Book from "~/types/Book";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const bookCollection = collection(db, "book");
const userQueries = collection(db, "UserQueries");

export const langchainRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const results = (await search_db(input.text)) as Book[];
      await saveQueryToDB(input.text);
      return {
        results: results,
      };
    }),
});

interface Metadata {
  Title: string;
  Id: string;
}

interface Document<T = Record<string, string>> {
  metadata: T & Metadata;
}

async function search_db(query: string) {
  const client: PineconeClient = new PineconeClient();
  await client.init({
    apiKey: env.PINECONE_API_KEY,
    environment: env.PINECONE_SERVER_ADDRESS,
  });
  const pineconeIndex = client.Index(env.PINECONE_INDEX_NAME);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: env.OPENAI_API_KEY,
    }),
    { pineconeIndex }
  );

  // /* Search the vector DB independently with meta filters */
  const results = (await vectorStore.similaritySearch(
    query,
    20
  )) as unknown as Document<Record<string, string>>[];

  // keep only the unique titles
  const uniqueResults = getUniqueDocuments(results).slice(0, 12);

  // extend Record<string, any> to Record<string, string>

  const books = await findMatchingBooks(
    uniqueResults.map((result) => result.metadata.Title)
  );
  return books;
}

const findMatchingBooks = async (bookTitle: string[]) => {
  // find all the documents with the title in the bookTitle array, document id is the title
  const q = query(bookCollection, where("Title", "in", bookTitle));
  const docs = await getDocs(q);
  const books = docs.docs.map((doc) => doc.data());
  return books;
};

//function to get current date in DD-MM-YYYY format
const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;
  return currentDate;
};

// eslint-disable-next-line @typescript-eslint/require-await
const saveQueryToDB = async (user_query: string) => {
  // find the document with id = DD-MM-YYYY of today and store it in the array called queries if not already present create a new document
  // with id = DD-MM-YYYY and store the query in the array
  const docRef = doc(userQueries, getCurrentDate());

  getDoc(docRef)
    .then(async (docSnapshot) => {
      if (docSnapshot.exists()) {
        // Document exists, add it to the queries array if it's not already there
        const data = docSnapshot.data() as { queries: string[] };
        if (data && data.queries.includes(user_query) === false) {
          data.queries.push(user_query);
          await updateDoc(docRef, { queries: data.queries });
        }
      } else {
        // Document doesn't exist, create a new one
        await setDoc(docRef, {
          queries: [user_query],
        });
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      return false;
    });
  return true;
};
function getUniqueDocuments(results: Document<Record<string, string>>[]) {
  const uniqueTitles = new Set<string>();
  const uniqueResults = results.filter((result) => {
    if (uniqueTitles.has(result.metadata.Title)) {
      return false;
    }
    uniqueTitles.add(result.metadata.Title);
    return true;
  });
  return uniqueResults;
}
