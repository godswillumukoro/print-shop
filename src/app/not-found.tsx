import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center h-[80dvh] px-4 md:px-6">
      <div className="max-w-md text-center space-y-4">
        <div className="relative h-[200px] w-[200px] mx-auto">
          <img
            src="/pillow-3.png"
            alt="icon illustration"
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Oops! Page not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist. Please check the URL or
          go back to the homepage.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
