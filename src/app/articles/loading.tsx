import React from "react";
const articleSkeleton = [1, 2, 3, 4, 5, 6];

const ArticleLoading = async () => {
  return (
    <section className="fix-container container m-auto px-5 animate-pulse">
      <div className="my-5 w-full md:w2/3 m-auto bg-gray-300 h-12 rounded"></div>
      <div className="flex items-center justify-center flex-wrap gap-8">
        {articleSkeleton.map((item) => (
          <div
            key={item}
            className="p-5 rounded-lg bg-gray-200    w-full md:w-2/5 lg:w-1/4"
          >
            <h3 className=" h-6 bg-gray-300 "></h3>
            <p className="my-2 text-xl bg-gray-300 p-1 h-10"> </p>
            <div className="  w-full block  p-1 bg-gray-400 rounded-lg h-8"></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2 mb-10">
        <div className="bg-gray-300 w-60 rounded-sm h-9"></div>
      </div>
    </section>
  );
};

export default ArticleLoading;
