import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
// import { removeInlineStyles } from "@/utils/handleDiscription";

function BlogCardList({ blog }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-700 dark:border-gray-600 flex flex-col md:flex-row md:gap-10 p-5 rounded-2xl mt-6 shadow-lg border transition-all">
      <div>
        <img
          src={blog.thumbnail}
          className="rounded-lg md:w-[300px] hover:scale-105 transition-all"
          alt=""
        />
      </div>
      <div>
        <h2 className="text-3x1 font-semibold mt-3 md:mt-1">{blog.title}</h2>
        <h3 className="mt-1">{blog.subtitle}</h3>
        {/* <p
          className="text-black dark:text-white bg-transparent"
          dangerouslySetInnerHTML={{
            __html: removeInlineStyles(blog.description),
          }}
        /> */}
        <Button
          onClick={() => navigate(`/blogs/${blog._id}`)}
          className="mt-4 px-4 py-2 rounded-1g text-sm"
        >
          Read More
        </Button>
      </div>
    </div>
  );
}

export default BlogCardList;
