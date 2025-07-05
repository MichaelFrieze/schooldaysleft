import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/root";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error, input }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"} | `,
              `Error Code: ${error.code} | `,
              `Error Message: ${error.message} | `,
              `Input: ${JSON.stringify(input)}`,
            );
          }
        : undefined,
  });

// Add OPTIONS handler for CORS preflight requests
const optionsHandler = () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
};

export { handler as GET, handler as POST, optionsHandler as OPTIONS };
