import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/handleDate";

function Blogcard({ blog }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-gray-800 dark :border-gray-600 p-5 rounded-2x1 shadow-lg border hover:scale-105
transition-all"
    >
      <img src={blog.thumbnail} alt="" className="rounded-lg" />
      <p className="text-sm mt-2">
        By {blog.author.firstName} | {blog.category} |{" "}
        {formatDate(blog.createdAt)}
      </p>
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <h3 className="text-gray-500 mt-1">{blog.subtitle}</h3>
      <Button
        onClick={() => navigate(`/blogs/${blog._id}`)}
        className="mt-4 px-4 py-2 rounded-1g text-sm"
      >
        Read More
      </Button>
    </div>
  );
}

export default Blogcard;
