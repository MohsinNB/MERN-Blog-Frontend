import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getInitials } from "@/utils/profileFallback";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { LucideSend } from "lucide-react";
import axios from "axios";
import { setComment } from "@/redux/commentSlice";
import { formatDate } from "@/utils/handleDate";

function CommentBox({ selectedBlog }) {
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);
  console.log("cmn", comment);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllCommentsOfBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/comment/${selectedBlog._id}/all`
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
        ></Textarea>
        <Button>
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
                    {console.log(Item.userId)}
                    <div className="mb-2 space-y-1 md:w-[400px]">
                      <h1 className="font-semibold">
                        {Item.userId?.firstName} {Item?.userId?.lastName}{" "}
                        <span className="text-sm ml-2 font-light">
                          {formatDate(Item.createdAt)}
                        </span>
                      </h1>
                      <p>{Item?.content}</p>
                      <div className="flex gap-5 items-center">
                        <div className="flex gap-2 items-center"></div>
                      </div>
                    </div>
                  </div>
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
