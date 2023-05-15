import { z } from "zod";
import { PineconeClient } from "@pinecone-database/pinecone";
import { env } from "~/env.mjs";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
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

export const langchainRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const results = (await search_db(input.text)) as Book[];
      return {
        results: results,
      };
    }),
});

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
  const results = await vectorStore.similaritySearch(query, 10);
  const books = await findMatchingBooks(
    results.map((result) => result.metadata["Title"] as string)
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
