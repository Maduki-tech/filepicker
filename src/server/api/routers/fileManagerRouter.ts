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
    createFolderInside: publicProcedure
        .input(z.object({ name: z.string(), parent_id: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.dateiablage.create({
                data: {
                    name: input.name,
                    other_dateiablage: {
                        connect: {
                            id: input.parent_id,
                        },
                    },
                    dateiablage_typ: {
                        create: {
                            bezeichnung: 'Folder',
                        },
                    },
                },
            });
        }),

    getAkten: publicProcedure
        .input(z.object({ name: z.string().optional().nullable() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.akte.findMany({
                where: {
                    aktenname: {
                        contains: input.name ? input.name : undefined,
                    },
                },
            });
        }),
    getAkteById: publicProcedure
        .input(z.object({ id: z.string().optional().nullable() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.akte.findFirst({
                where: {
                    id: input.id ? input.id : undefined,
                },
            });
        }),

    getAktenschrankByID: publicProcedure
        .input(z.object({ id: z.string().optional().nullable() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.aktenschrank.findFirst({
                where: {
                    id: input.id ? input.id : undefined,
                },
            });
        }),
    moveFolder: publicProcedure
        .input(
            z.object({
                id: z.string(),
                parent_id: z.string(),
            })
        )
        .mutation(({ input, ctx }) => {
            return ctx.prisma.dateiablage.update({
                where: {
                    id: input.id,
                },
                data: {
                    other_dateiablage: {
                        connect: {
                            id: input.parent_id ? input.parent_id : undefined,
                        },
                    },
                },
            });
        }),
});
