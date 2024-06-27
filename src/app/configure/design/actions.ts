"use server"

import { db } from "@/db"
import { BackDesign, Color, Fabric, Fringe } from "@prisma/client"

export type saveOptionArgs = {
    color: Color,
    fringe: Fringe,
    fabric: Fabric,
    backDesign: BackDesign,
    configId: string,
    quantity: number
}

export async function saveOptions({color, fringe, fabric, backDesign, configId, quantity}: saveOptionArgs) {
    await db.configuration.update({
        where: {id: configId},
        data: {color, fabric, fringe, backDesign, quantity}
    })
}