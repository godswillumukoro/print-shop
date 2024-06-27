import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Pillow from "@/components/Pillow";
import { Reviews } from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-8 xl:gap-x-16 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                {/* Visual gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-0 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Story on a{" "}
                <span className="bg-rose-500 px-2 text-white">Custom</span>{" "}
                Pillow
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories on a personalized pillow. Take
                your <span className="font-semibold">cherished memories </span>{" "}
                with you and enjoy cozy comfort wherever you go.
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center lg:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-rose-500" />
                    Ships in 5 business days
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-rose-500" />
                    Easy Care & Maintenance
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-rose-500" />
                    Vibrant, High-Resolution Prints
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/stock-users/01.png"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/stock-users/02.png"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/stock-users/03.png"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/stock-users/04.png"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/stock-users/05.png"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-rose-600 fill-rose-600" />
                    <Star className="h-4 w-4 text-rose-600 fill-rose-600" />
                    <Star className="h-4 w-4 text-rose-600 fill-rose-600" />
                    <Star className="h-4 w-4 text-rose-600 fill-rose-600" />
                    <Star className="h-4 w-4 text-rose-600 fill-rose-600" />
                  </div>

                  <p>
                    <span className="font-semibold">1,225</span> happy customers
                  </p>

                  <div className="sm:hidden mt-8">
                    <Link
                      href="/configure/upload"
                      className={buttonVariants({
                        size: "lg",
                        className: "flex items-center gap-1",
                      })}
                    >
                      Create pillow <ArrowRight className="ml-1.5 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                src="/your-image.png"
                className="absolute w-20 lg:w-30 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
                alt=""
                width={80}
                height={80}
              />
              <Image
                src="/line.png"
                className="absolute w-20 -left-6 -bottom-6 select-none"
                alt=""
                width={80}
                height={80}
              />
              <Pillow className="w-100" imgSrc="/testimonials/couple.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-rose-500" />
              </span>{" "}
              say
            </h2>
            {/* <Image
              src="/snake-2.png"
              className="w-24 order-0 lg:order-2"
              alt=""
              width={96}
              height={96}
            /> */}
          </div>
          {/* USER REVIEW 1 */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "Beyond the beautiful design that perfectly captures my
                  family's cherished memories, I was impressed by the overall{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    comfort and feel of the pillow.
                  </span>{" "}
                  It's not just a decorative piece. It's become my go-to for
                  relaxation and comfort after a long day. The material used is
                  incredibly soft yet feels sturdy and supportive."
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <Image
                  className="rounded-full h-12 w-12 object-cover"
                  src="/stock-users/04.png"
                  alt="user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Sade</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-rose-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* USER REVIEW 2 */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
                <Star className="h-5 w-5 text-rose-600 fill-rose-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "I recently ordered a custom pillow from PillowExpress as a
                  gift for my friend's bridal shower, and she absolutely loved
                  it!{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    The print quality was outstanding
                  </span>
                  , capturing the essence of the photo perfectly. The pillow
                  itself is so comfortable to snuggle up with, making it a great
                  addition to her living room."
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <Image
                  className="rounded-full h-12 w-12 object-cover"
                  src="/stock-users/01.png"
                  alt="user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Chidera</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-rose-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-20 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Start personalizing your{" "}
                <span className="relative px-2 bg-rose-500 text-white">
                  pillows
                </span>{" "}
                today!
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <Image
                src="/arrow.png"
                alt=""
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                width={80}
                height={80}
              />
              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg-rounded-2xl">
                <Image
                  src="/stock-pix/abuja.jpg"
                  alt=""
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                  width={640}
                  height={480}
                />
              </div>
              <Pillow className="w-60" imgSrc="/stock-pix/abuja.jpg" />
            </div>
          </div>

          <ul className="mx-auto mt-20 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-rose-600 inline mr-1.5" />
              Personalized Memories
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-rose-600 inline mr-1.5" />
              Fast & Reliable Shipping
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-rose-600 inline mr-1.5" />
              Luxuriously Soft & Durable
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-rose-600 inline mr-1.5" />
              Secure payment options
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-rose-600 inline mr-1.5" />
              International shipping available
            </li>

            <div className="flex justify-center">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
                href="configure/upload"
              >
                Create your pillow now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
