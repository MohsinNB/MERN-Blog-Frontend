import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

function Comments() {
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();
  const getAllComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/comment/my-blogs/comments`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllComments();
  }, []);
  console.log(allComments);
  return (
    <div className="pb-10 pt-20 md:ml-80 h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent Comments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allComments.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.postId.title}
                  </TableCell>
                  <TableCell>{item.content}</TableCell>
                  <TableCell>{item?.userId?.firstName}</TableCell>
                  <TableCell className="text-right flex items-center justify-center">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(`/blogs/${item.postId._id}`);
                      }}
                    ></Eye>
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

export default Comments;
