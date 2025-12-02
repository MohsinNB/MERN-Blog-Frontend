import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { removeInlineStyles } from "@/utils/handleDiscription";
import CommentBox from "@/components/CommentBox/CommentBox";
import { formatDate } from "@/utils/handleDate";

function BlogView() {
  // It's a blogview section. so everything logic here is for one particular data that I get from DB.
  const params = useParams();
  const blogId = params.blogId;
  // console.log(blogId);

  const { blog } = useSelector((store) => store.blog);
  // console.log(blog, "from blogview");
  const { user } = useSelector((store) => store.auth);
  // console.log(user);
  const selectedBlog = blog.find((singleBlog) => singleBlog._id === blogId);
  // console.log("selectedBlog in blogview", selectedBlog);
  const dispatch = useDispatch();

  const [blogLike, setBlogLike] = useState(selectedBlog?.likes?.length || 0);
  const [liked, setLiked] = useState(
    selectedBlog.likes.includes(user._id) || false
  );

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Checkout this blog",
          text: "Read this amazing blog post",
          url: blogUrl,
        })
        .then(() => console.log("Blog shared successfully"))
        .catch((err) => console.error(err));
    } else {
      // fall back copy to clipboard
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard");
      });
    }
  };

  // const likeOrDislikeHandler = async () => {
  //   try {
  //     // Use POST (or PUT); update URL if your backend expects GET -> keep if you must
  //     const res = await axios.get(
  //       `http://localhost:8000/api/v1/blog/${selectedBlog._id}/like-unlike`,
  //       {}, // empty body
  //       { withCredentials: true }
  //     );

  //     if (res.data.success) {
  //       const newLiked = res.data.liked; // trust the server
  //       setLiked(newLiked);

  //       // update like count from server if provided, fallback to local toggle
  //       const newLikesCount =
  //         typeof res.data.likesCount === "number"
  //           ? res.data.likesCount
  //           : newLiked
  //           ? blogLIke + 1
  //           : blogLIke - 1;

  //       setBlogLike(newLikesCount);

  //       // update local blog list (ensure id types comparable)
  //       const updatedBlogData = blog.map((singleBlog) => {
  //         if (singleBlog._id.toString() === selectedBlog._id.toString()) {
  //           const newLikesArray = newLiked
  //             ? [...new Set([...(singleBlog.likes || []), user._id])]
  //             : (singleBlog.likes || []).filter(
  //                 (id) => id.toString() !== user._id.toString()
  //               );

  //           return {
  //             ...singleBlog,
  //             likes: newLikesArray,
  //           };
  //         }
  //         return singleBlog;
  //       });

  //       dispatch(setBlog(updatedBlogData));
  //       toast.success(res.data.message);
  //     } else {
  //       // handle server saying success: false
  //       toast.error(res.data.message || "Could not toggle like");
  //     }
  //   } catch (error) {
  //     console.log(error.response?.data, error.message);
  //     console.error("likeOrDislikeHandler error:", error);
  //     toast.error("Something went wrong while toggling like");
  //   }
  // };
  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/${selectedBlog._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updateLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updateLikes);
        setLiked(!liked);
      }
      const updatedBlogData = blog.map((singleBlog) =>
        singleBlog._id === selectedBlog._id
          ? {
              ...singleBlog,
              likes: liked
                ? singleBlog.likes.filter((id) => id !== user._id)
                : [...singleBlog.likes, user._id],
            }
          : singleBlog
      );
      toast.success(res.data.message);
      dispatch(setBlog(updatedBlogData));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="pt-14">
      <div className="max-w-6xl mx-auto p-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* blog header */}

        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {selectedBlog.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={selectedBlog.author.photoUrl} alt="author" />
                <AvatarFallback>MH</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {selectedBlog.author.firstName} {selectedBlog.author.lastName}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Published on {formatDate(selectedBlog.createdAt)}. 8 min read
            </p>
          </div>
        </div>
        {/* image section */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={selectedBlog.thumbnail}
            alt="thumbnail"
            width={1000}
            height={500}
            className="w-full object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {selectedBlog.subtitle}
          </p>
        </div>
        {/* discription */}
        <p
          className="text-black dark:text-white bg-transparent"
          dangerouslySetInnerHTML={{
            __html: removeInlineStyles(selectedBlog.description),
          }}
        />
        <div className="mt-10">
          <div className="flex flex-wrap gap-5 mb-8">
            <Badge variant="secondary" className="dark:bg-gray-800">
              Next js
            </Badge>
            <Badge variant="secondary" className="dark:bg-gray-800">
              React js
            </Badge>
            <Badge variant="secondary" className="dark:bg-gray-800">
              web development
            </Badge>
            <Badge variant="secondary" className="dark:bg-gray-800">
              javascript
            </Badge>
          </div>
          {/* engagement */}
          <div className="flex items-center justify-between border-y dark: border-gray-800border-gray-300 py-4 mb-8 ">
            <div className="flex items-center space-x-4">
              <Button
                onClick={likeOrDislikeHandler}
                variant="ghost"
                className="flex items-center gap-1"
              >
                {liked ? (
                  <FaHeart
                    size={24}
                    className=" cursor-pointerhover text-red-600"
                  />
                ) : (
                  <FaRegHeart
                    size={24}
                    className=" cursor-pointerhover hover:text-gray-600 text-white"
                  />
                )}

                <span>{blogLike}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4" />
                <span>1 Comments</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => {
                  handleShare();
                }}
                variant="ghost"
                size="sm"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <CommentBox selectedBlog={selectedBlog} />
        </div>
      </div>
    </div>
  );
}

export default BlogView;
