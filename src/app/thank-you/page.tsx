"use client";

import { useSearchParams } from "next/navigation";

const ThankYou = async () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("orderId");

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            We are crafting your custom pillow
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            We believe in creating products that are both beautiful and durable
            for years to come.
          </p>

          <p>Order ID: {id}</p>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">Excellent Choice!</h4>
            <p className="mt-2 text-sm text-zinc-600">
              Once your pillow is ready, we will notify you of the best and most
              affordable shipping cost. Alternatively, you can choose the pickup
              address option: 28 Aiyeleto Street, Surulere, Lagos. <br></br>{" "}
              Contact: +2349067993937.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
