import React from "react";

const ProductsPage = async ({ params }: any) => {
  const { products } = await params;
  console.log(products);
  return (
    <div className="fix-height text-3xl font-bold p-5">
      Products Page
      <ul className="mt-7">
        {products.map((route: any) => (
          <li className="font-normal text-xl text-gray-600 ">{route}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
