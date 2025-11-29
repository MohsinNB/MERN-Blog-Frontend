import React from "react";
import { Button } from "../components/ui/button";
import Hero from "../components/Hero/Hero";
import RecentBlogs from "@/components/RecentBlogs/RecentBlogs";
import PopularAuthors from "@/components/PopularAuthors/PopularAuthors";

const Home = () => {
  return (
    <div className="pt-20">
      <Hero></Hero>
      <RecentBlogs></RecentBlogs>
      <PopularAuthors></PopularAuthors>
    </div>
  );
};

export default Home;
