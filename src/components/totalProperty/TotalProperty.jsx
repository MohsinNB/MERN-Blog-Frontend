import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function TotalProperty() {
  const { blog } = useSelector((store) => store.blog);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const getOwnBlogs = async () => {
    try {
      const res = await axios.get(
        "https://mern-blog-backend-ha5m.onrender.com/api/v1/blog/get-own-blogs",
        { withCredentials: true }
      );
      if (res.data.success) {
        setBlog(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `https://mern-blog-backend-ha5m.onrender.com/api/v1/comment/my-blogs/comments`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setTotalComments(res.data.totalComments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getTotalLIkes = async () => {
    try {
      const res = await axios.get(
        `https://mern-blog-backend-ha5m.onrender.com/api/v1/blog/my-blogs/likes`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setTotalLikes(res.data.totalLikes);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getOwnBlogs();
    getTotalComments();
    getTotalLIkes();
  }, []);

  const stats = [
    {
      title: "Total Views",
      value: "24.8K",
      icon: Eye,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Blogs",
      value: blog.length,
      icon: BarChart3,
      change: "+4%",
      trend: "up",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: MessageSquare,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: ThumbsUp,
      change: "+7%",
      trend: "up",
    },
  ];

  return (
    <div className="md:p-10 p-4">
      <div className="flex flex-col md:flex-row justify-around gap-3 md:gap-7">
        {stats.map((stat) => {
          return (
            <Card
              key={Math.random()}
              className="w-full dark:bg-gray-800 -space-y-5"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TotalProperty;
