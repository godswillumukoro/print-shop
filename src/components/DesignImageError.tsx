"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DesignError() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  return (
    <div className="flex flex-col items-center justify-center h-[80dvh] px-4 md:px-6">
      <div className="max-w-md text-center space-y-4">
        <div className="relative h-[200px] w-[200px] mx-auto">
          <img
            src="/pillow-1.png"
            alt="Confused person illustration"
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          You skipped design!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Hey there, you moved too fast. You have to design an image first
          before you can preview it.
        </p>
        <div className="flex justify-center">
          <Link
            href={`/configure/design?id=${id}`}
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Design your image
          </Link>
        </div>
      </div>
    </div>
  );
}
