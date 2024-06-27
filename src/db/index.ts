import {PrismaClient} from "@prisma/client"

// overriding the global typescript scope
declare global{
    var cachedPrisma: PrismaClient
}

// caching the prisma database client
let prisma: PrismaClient
if(process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    if(!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient()
    }

    prisma = global.cachedPrisma
}

export const db = prisma