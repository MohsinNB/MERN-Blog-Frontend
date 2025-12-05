/* eslint-disable no-unused-vars */
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function YourBlogs() {
  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt);
    const formatDate = date.toLocaleDateString("en-GB");
    return formatDate;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector((store) => store.blog);
  // console.log(blog);
  const getownBlog = async () => {
    try {
      const res = await axios.get(
        "https://mern-blog-backend-ha5m.onrender.com/api/v1/blog/get-own-blogs",
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `https://mern-blog-backend-ha5m.onrender.com/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      const remainingBlog = blog.filter((singleBlog) => singleBlog?._id !== id);
      dispatch(setBlog(remainingBlog));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getownBlog();
  }, []);
  return (
    <div className="pb-10 pt-20 md:ml-80 h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 spax-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader className="overflow-x-auto">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-x-auto">
              {blog.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="md:flex md:gap-4 md:items-center">
                    <img
                      src={item.thumbnail}
                      className="w-20 rounded-md hidden md:block"
                      alt=""
                    />
                    <h1
                      onClick={() => navigate(`/blogs/${item._id}`)}
                      className="hover:underline cursor-pointer md:w-full w-[60px] truncate"
                    >
                      {item.title}
                    </h1>
                  </TableCell>
                  <TableCell>
                    <h1 className="md:w-full w-[60px] truncate">
                      {item.category}
                    </h1>
                  </TableCell>
                  <TableCell>{formatDate(index)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {<BsThreeDotsVertical />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(`/dashboard/create-blog/${item._id}`); //http://localhost:5173/dashboard/create-blog
                          }}
                        >
                          <Edit />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            deleteBlog(item._id);
                          }}
                          className="text-red-500"
                        >
                          <Trash2 className="text-red-500" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export default YourBlogs;
