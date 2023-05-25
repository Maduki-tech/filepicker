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
        return ctx.prisma.dateiablage.findMany({
            include: {
                dateiablage: true,
                dateiablage_typ: true,
            },
        });
    }),

    createFolder: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.dateiablage.create({
                data: {
                    name: input.name,
                    dateiablage_typ: {
                        create: {
                            bezeichnung: 'Folder',
                        },
                    },
                },
            });
        }),
});
