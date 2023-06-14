import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const userManagerRoute = createTRPCRouter({
    getUser: publicProcedure.query(async () => {
        return { name: 'test', age: 12 };
    }),
});
