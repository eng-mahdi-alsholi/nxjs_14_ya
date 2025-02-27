import Link from "next/link";
import React from "react";
interface PaginationProps {
  pages: number;
  pageNumber: number;
  router: string;
}

const Pagination = ({ pages, pageNumber, router }: PaginationProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  let prev = pageNumber > 1 ? pageNumber - 1 : 1;
  let next = pageNumber < pages ? pageNumber + 1 : pages;
  return (
    <div className="flex uppercase justify-center mt-2 mb-10">
      <div className="  border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
        <Link
          className={`${pageNumber === 1 ? "cursor-not-allowed" : ""} `}
          href={`${router}?pageNumber=${prev}`}
        >
          {" "}
          prev{" "}
        </Link>
      </div>

      {pagesArray?.map((page) => (
        <div
          className={` ${page === pageNumber ? 'bg-gray-400' : ''} border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
          key={page}
        >
          <Link href={`${router}?pageNumber=${page}`}> {page}</Link>
        </div>
      ))}

      <div className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
        <Link
          className={`${pageNumber === pages ? "cursor-not-allowed" : ""} `}
          href={`${router}?pageNumber=${next}`}
        >
          {" "}
          next{" "}
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
