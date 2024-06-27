import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  });

  return formatter.format(price);
}

export function constructMetadata({
  title = 'PilloweXpress - Home of Personalized Pillows',
  description = 'Capture your favorite memories on a personalized pillow. Take your cherished memories with you and enjoy cozy comfort wherever you go.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '',
    },
    icons,
    metadataBase: new URL("https://www.pillowexpress.ng/")
  }
}