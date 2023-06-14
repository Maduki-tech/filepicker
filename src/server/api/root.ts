import { createTRPCRouter } from "~/server/api/trpc";
import { fileManagerRoute } from "./routers/fileManagerRouter";
import { googleAPIRoute } from "./routers/googleAPIRoute";
import { userManagerRoute } from "./routers/userManagerRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    fileManager: fileManagerRoute,
    googleAPI: googleAPIRoute,
    userManger: userManagerRoute,
});


// export type definition of API
export type AppRouter = typeof appRouter;
