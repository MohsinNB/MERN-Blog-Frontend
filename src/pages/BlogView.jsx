import React from "react";
import { useSelector } from "react-redux";
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
import { FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function BlogView() {
  const params = useParams();
  const blogId = params.blogId;
  const { blog } = useSelector((store) => store.blog);
  const selectedBlog = blog.find((singleBlog) => singleBlog._id === blogId);
  console.log(selectedBlog);
  const changeDateFormat = (date) => {
    const data = new Date(date);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatDate = data.toLocaleDateString("en-GB", options);
    return formatDate;
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
              Published on {changeDateFormat(selectedBlog.createdAt)}. 8 min
              read
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
        <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
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
              <Button variant="ghost" className="flex items-center gap-1">
                <FaRegHeart
                  size={24}
                  className=" cursor-pointerhover: text-gray-600I text-white"
                />
                <span>0</span>
              </Button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default BlogView;
