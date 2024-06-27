// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from "@/config/products"

export const COLORS = [
    {label: "Black", value: "black", tw:"zinc-900"},
    {label: "Blue", value:"blue", tw:"blue-950"},
    {label: "Rose", value:"rose", tw:"rose-950"},
] as const

export const FRINGES = {
    label: "Fringes",
    name: "fringe",
    options: [
        {
            label: "Without fringe",
            value: "no_fringe"
        },
        {
            label: "1-edge Tassle",
            value: "one_edge"
        },
        {
            label: "4-edge Tassle",
            value: "four_edge"
        },
        {
            label: "Full frame fringe",
            value: "full_frame"
        },
    ]
} as const

export const FABRICS = {
    label: "Fabric",
    name: "fabric",
    options: [
        {
            label: "Polyester",
            value: "polyester",
            desc: "Simplicity at its best",
            price: PRODUCT_PRICES.fabric.polyester
        },
        {
            label: "Silk",
            value: "silk",
            desc: "Luxurious and smooth",
            price: PRODUCT_PRICES.fabric.silk
        },
        {
            label: "Cotton",
            value: "cotton",
            desc: "Soft and breathable",
            price: PRODUCT_PRICES.fabric.cotton
        },
        {
            label: "Linen",
            value: "linen",
            desc: "Durable and textured",
            price: PRODUCT_PRICES.fabric.linen
        },
        {
            label: "Faux Fur",
            value: "faux_fur",
            desc: "Plush and cozy",
            price: PRODUCT_PRICES.fabric.fauxFur
        },
        {
            label: "Denim",
            value: "denim",
            desc: "Sturdy and casual",
            price: PRODUCT_PRICES.fabric.denim
        }
    ]
} as const

export const DIMENSIONS = {
    label: "Dimension",
    name: "dimension",
    options: [
        {
            label: "Square",
            value: "square",
            desc: "Various sizes for square pillows",
            sizes: {
                small: {
                    label: "Small",
                    value: "small",
                    desc: "16x16 inches",
                    price: PRODUCT_PRICES.dimension.square.small
                },
                medium: {
                    label: "Medium",
                    value: "medium",
                    desc: "18x18 inches",
                    price: PRODUCT_PRICES.dimension.square.medium
                },
                large: {
                    label: "Large",
                    value: "large",
                    desc: "20x20 inches",
                    price: PRODUCT_PRICES.dimension.square.large
                },
                extraLarge: {
                    label: "Extra Large",
                    value: "extraLarge",
                    desc: "24x24 inches",
                    price: PRODUCT_PRICES.dimension.square.extraLarge
                }
            }
        },
        {
            label: "Rectangular",
            value: "rectangular",
            desc: "Various sizes for rectangular pillows",
            sizes: {
                small: {
                    label: "Small",
                    value: "small",
                    desc: "12x18 inches",
                    price: PRODUCT_PRICES.dimension.rectangular.small
                },
                medium: {
                    label: "Medium",
                    value: "medium",
                    desc: "12x20 inches",
                    price: PRODUCT_PRICES.dimension.rectangular.medium
                },
                large: {
                    label: "Large",
                    value: "large",
                    desc: "14x22 inches",
                    price: PRODUCT_PRICES.dimension.rectangular.large
                },
                extraLarge: {
                    label: "Extra Large",
                    value: "extraLarge",
                    desc: "16x26 inches",
                    price: PRODUCT_PRICES.dimension.rectangular.extraLarge
                }
            }
        }
    ]
} as const

export const BACK_DESIGNS = {
    label: "Back Design",
    name: "backDesign",
    options: [
        {
            label: "Solid Color",
            value: "solid_color",
            desc: "Simple, single-color",
            price: PRODUCT_PRICES.backDesign.solidColor
        },
        {
            label: "Same with Front",
            value: "match_front_design",
            desc: "Same design as the front",
            price: PRODUCT_PRICES.backDesign.matchFrontDesign
        },
        {
            label: "Custom",
            value: "custom_design",
            desc: "Different design from the front",
            price: PRODUCT_PRICES.backDesign.customDesign
        }
    ]
} as const
