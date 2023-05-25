import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const fileManagerRoute = createTRPCRouter({

    getFolder: publicProcedure
    .input(z.object({ id: z.string().optional().nullable() }))
    .query(({ input, ctx }) => {
        return ctx.prisma.dateiablage.findMany({
            where: {
                parent_id: input.id ? input.id : null,
            },
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
