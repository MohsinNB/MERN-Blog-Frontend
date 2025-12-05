import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getInitials } from "@/utils/profileFallback";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Edit, LucideSend, Trash2 } from "lucide-react";
import axios from "axios";
import { setComment } from "@/redux/commentSlice";
import { formatDate } from "@/utils/handleDate";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";
import { setBlog } from "@/redux/blogSlice";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

function CommentBox({ selectedBlog }) {
  // console.log("selectedBlog", selectedBlog);
  const { user } = useSelector((store) => store.auth);
  const { blog } = useSelector((store) => store.blog);
  const { comment } = useSelector((store) => store.comment);
  const [content, setContent] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  // console.log("cmn", comment);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setContent(inputText);
    } else {
      setContent("");
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `https://mern-blog-backend-ha5m.onrender.com/api/v1/comment/${selectedBlog._id}/create`,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        let updatedCommentData;
        if (comment.length >= 1) {
          updatedCommentData = [...comment, res.data.comment];
        } else {
          updatedCommentData = [res.data.comment];
        }
        dispatch(setComment(updatedCommentData));
        const updateBlogData = blog.map((singleBlog) =>
          singleBlog._id === selectedBlog._id
            ? { ...singleBlog, comments: updatedCommentData }
            : singleBlog
        );
        dispatch(setBlog(updateBlogData));
        toast.success(res.data.message);
        setContent("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(
        `https://mern-blog-backend-ha5m.onrender.com/api/v1/comment/${id}/delete`,
        { withCredentials: true }
      );
      const remaining = comment.filter((C) => C?._id !== id);
      dispatch(setComment(remaining));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const editCommentHandler = async (id) => {
    try {
      const res = await axios.put(
        `https://mern-blog-backend-ha5m.onrender.com/api/v1/comment/${id}/edit`,
        { content: editedContent },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        const updateCommentData = comment.map((item) =>
          item._id === id ? { ...item, content: editedContent } : item
        );
        dispatch(setComment(updateCommentData));
        toast.success(res.data.message);
        setEditedCommentId(null);
        setEditedContent("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const likeCommentHandler = async (id) => {
    try {
      const res = await axios.get(
        `https://mern-blog-backend-ha5m.onrender.com/api/v1/comment/${id}/like`,

        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedComment = res.data.updatedComment;

        const updatedCommentList = comment.map((item) =>
          item._id === id ? updatedComment : item
        );
        dispatch(setComment(updatedCommentList));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error liking Comment", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const getAllCommentsOfBlog = async () => {
      try {
        const res = await axios.get(
          `https://mern-blog-backend-ha5m.onrender.com/api/v1/comment/${selectedBlog._id}/all`
        );
        const data = res.data.comments;
        dispatch(setComment(data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllCommentsOfBlog();
  }, []);
  return (
    <div>
      <div className="flex gap-4 mb-4 items-center">
        <Avatar>
          <AvatarImage src={user?.photoUrl} />
          <AvatarFallback>{getInitials(user)}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>
      <div className="flex gap-3">
        <Textarea
          className="bg-gray-100 dark:bg-gray-800"
          placeholder="Leave a comment here"
          value={content}
          onChange={changeEventHandler}
        ></Textarea>
        <Button onClick={commentHandler}>
          <LucideSend></LucideSend>
        </Button>
      </div>
      {comment.length > 0 ? (
        <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
          {comment.map((Item, index) => {
            return (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-start">
                    <Avatar>
                      <AvatarImage src={Item.userId?.photoUrl} />
                      <AvatarFallback>{getInitials(user)}</AvatarFallback>
                    </Avatar>
                    {console.log(Item)}
                    <div className="mb-2 space-y-1 md:w-[400px]">
                      <h1 className="font-semibold">
                        {Item.userId?.firstName} {Item?.userId?.lastName}{" "}
                        <span className="text-sm ml-2 font-light">
                          {formatDate(Item.createdAt)}
                        </span>
                      </h1>
                      {editedCommentId === Item?._id ? (
                        <>
                          <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="mb-2 bg-gray-200 dark:bg-gray-700"
                          />
                          <div className="flex py-1 gap-2">
                            <Button
                              onClick={() => {
                                editCommentHandler(Item._id);
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => {
                                setEditedCommentId(null);
                              }}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p>{Item?.content}</p>
                      )}
                      <div className="flex gap-5 items-center">
                        <div className="flex gap-2 items-center">
                          <div
                            onClick={() => {
                              likeCommentHandler(Item._id);
                            }}
                            className="flex gap-1 items-center cursor-pointer"
                          >
                            {Item.likes.includes(user._id) ? (
                              <FaHeart fill="red" />
                            ) : (
                              <FaRegHeart></FaRegHeart>
                            )}
                            <span>{Item?.numberOfLikes}</span>
                          </div>
                        </div>
                        <p className="text-sm cursor-pointer">Reply</p>
                      </div>
                    </div>
                  </div>
                  {user._id === Item?.userId?._id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {<BsThreeDotsVertical />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditedCommentId(Item._id);
                            setEditedContent(Item.content);
                          }}
                        >
                          <Edit />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteComment(Item?._id)}
                          className="text-red-500"
                        >
                          <Trash2 className="text-red-500" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CommentBox;
