import Blogcard from "@/components/BlogCard/Blogcard";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function SearchList() {
  const location = useLocation();
  const { blog } = useSelector((store) => store.blog);

  const query = new URLSearchParams(location.search).get("q")?.toLowerCase();

  const filteredBlogs = blog.filter((item) => {
    const title = item?.title?.toLowerCase();
    const subtitle = item?.subtitle?.toLowerCase();
    const category = item?.category?.toLowerCase();

    return (
      title?.includes(query) || subtitle?.includes(query) || category === query
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="pt-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-2">Search result for: "{query}"</h2>
        <div className="grid grid-cols-3 gap-7 my-10">
          {filteredBlogs.map((blog, index) => {
            return <Blogcard key={index} blog={blog} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchList;
