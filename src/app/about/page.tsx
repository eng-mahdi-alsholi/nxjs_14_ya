import Image from "next/image";
import React from "react";
import CloudImage from "../../../public/cloud-hosting.png";

const AboutPage = () => {
  return (
    <section className="fix-height container m-auto">
      <h1 className="text-3xl font-bold text-gray-800 p-5 ">AboutPage</h1>
      <div className="">
        {/* <Image src="/cloud-hosting.png" width={400} height={400} alt="" /> */}
        <Image
          src={CloudImage}
          alt=""
          width={500}
          height={500}
          priority={true}
        />
      </div>
    </section>
  );
};

export default AboutPage;
