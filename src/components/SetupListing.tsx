"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 4;

interface Setup {
  setup: any;
  index: number;
}

const Data = [
  { title: "Setting up React with Redux", steps: 5 },
  { title: "Setting up Node.js with Express", steps: 5 },
  { title: "Setting up a Python Virtual Environment", steps: 5 },
  { title: "Setting up Docker for a Node.js Application", steps: 5 },
  { title: "Setting up a MySQL Database", steps: 5 },
  { title: "Setting up Git and GitHub", steps: 5 },
  { title: "Setting up a React Project with TypeScript", steps: 5 },
  { title: "Setting up a LAMP Stack on Ubuntu", steps: 5 },
  { title: "Setting up a Full-Stack MERN Application", steps: 5 },
  { title: "Setting up a WordPress Site", steps: 5 },
  { title: "Setting up a React Native Project", steps: 5 },
];

const SetupListing = ({ setup, index }: Setup) => {
  const router = useRouter();

  const handleClick = () => {
    const formattedTitle = setup.title.toLowerCase().replace(/ /g, "-");
    router.push(`/guides/${formattedTitle}`);
  };

  return (
    <div
      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <h2 className="text-lg font-semibold">{setup.title}</h2>
      <p className="mt-2">Number of steps: {setup.steps}</p>
    </div>
  );
};

interface SetupReelProps {
  title: string;
  subtitle: string;
}

const SetupReel = ({ title, subtitle }: SetupReelProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(Data.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        <Link
          href={`/guides/${title}`}
          className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
        >
          View all setups <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {currentItems.map((setup, i) => (
              <SetupListing key={`setup-${i}`} setup={setup} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SetupReel;
