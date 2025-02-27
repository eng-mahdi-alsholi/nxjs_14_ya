import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";
import Link from "next/link";

const page = () => {
  return (
    <section>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold">
        Choose your Web hoisting Plan
      </h2>
      <div className="container flex m-auto justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
};   

export default page;
