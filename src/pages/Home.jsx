import React from "react";
import { Button } from "../components/ui/button";
import Hero from "../components/Hero/Hero";
import RecentBlogs from "@/components/RecentBlogs/RecentBlogs";

const Home = () => {
  return (
    <div className="pt-20">
      <Hero></Hero>
      <RecentBlogs></RecentBlogs>
    </div>
  );
};

export default Home;
