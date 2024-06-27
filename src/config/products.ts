export const PRODUCT_PRICES = {
    fabric: {
        polyester:0,
        silk:10_000,
        cotton:10_000,
        linen: 15_000,
        fauxFur:15_000,
        denim:15_000,
    },
    dimension: {
        square: {
            small: 0,
            medium: 3_000,
            large: 5_000,
            extraLarge: 6_000
        },
        rectangular: {
            small: 4_000,
            medium: 6_000,
            large: 8_000,
            extraLarge: 9_000
        }
    },
    backDesign: {
        solidColor: 0,
        matchFrontDesign: 4_999,
        customDesign: 5_500
    },
} as const

export const BASE_PRICE = 15_000