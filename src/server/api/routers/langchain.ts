import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type Book from "~/types/Book";
import { saveQueryToDB, search_db } from "../helper/langchain";

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
