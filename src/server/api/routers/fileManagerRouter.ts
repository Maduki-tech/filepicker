import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const fileManagerRoute = createTRPCRouter({
    // hello: publicProcedure
    //   .input(z.object({ text: z.string() }))
    //   .query(({ input }) => {
    //     return {
    //       greeting: `Hello ${input.text}`,
    //     };
    //   }),

    getFolder: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.folder.findMany();
    }),
    getFile: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.file.findMany();
    }),

    createFolder: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.folder.create({
                data: {
                    name: input.name,
                },
            });
        }),
});
