import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { setBlog, setLoading } from "@/redux/blogSlice";

const UpdateBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.blogId;
  const { blog, loading } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  console.log("from updateBlog", blog);
  const findBlog = blog.find((blog) => blog._id === blogId);
  const [content, setContent] = useState(findBlog.description);
  const [publish, setPublish] = useState(false);

  const [blogData, setBlogData] = useState({
    title: findBlog?.title,
    subtitle: findBlog?.subtitle,
    category: findBlog?.category,
    description: content,
  });
  const [previewThumbnail, setPreviewThumbnail] = useState(findBlog?.thumbnail);

  const onEventChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);
    formData.append("file", blogData.thumbnail);
    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        console.log(blogData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePublishUnpublish = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/blog/${blogId}`,
        {
          // params: {
          //   action,
          // },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setPublish(!publish);

        toast.success(res.data.message);
        navigate("/dashboard/your-blogs");
      } else {
        toast.error("failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${blogId}`,
        { withCredentials: true }
      );
      const remainingBlog = blog.filter(
        (singleBlog) => singleBlog?._id !== blogId
      );
      dispatch(setBlog(remainingBlog));
      toast.success(res.data.message);
      navigate("/dashboard/your-blogs");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:ml-80 pt-20 px-3 pb-10">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-5 -space-y-4">
          <h1 className="text-4xl font-bold">Basic Blog Information</h1>
          <p>
            Make changes to your blogs here. Click publish when you are done
          </p>
          {console.log(publish)}
          <div className="space-x-2">
            <Button
              onClick={() => {
                togglePublishUnpublish(findBlog.isPublished ? "false" : "true");
              }}
            >
              {findBlog?.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button onClick={deleteBlog} variant="destructive">
              Remove blog
            </Button>
          </div>
          <div className="pt-10">
            <Label className="mb-1">Title</Label>
            <Input
              type="text"
              placeholder="Enter a title"
              name="title"
              className=" dark:border-gray-300"
              value={blogData.title}
              onChange={onEventChange}
            />
          </div>
          <div className="">
            <Label className="mb-1">Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter a subtitle"
              name="subtitle"
              className="dark:border-gray-300"
              value={blogData.subtitle}
              onChange={onEventChange}
            />
          </div>
          <div>
            <Label className="mb-1">Description</Label>
            <JoditEditor
              ref={editor}
              className="jodit-toolbar"
              value={blogData.description}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div>
            <Label className="mb-1.5">Category</Label>
            <Select onValueChange={selectCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Blog category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Blog category</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1">Thumbnail</Label>
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={selectThumbnail}
              className="w-fit dark:border-gray-300"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Blog thumbnail"
              />
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              onClick={() => {
                updateBlogHandler();
                navigate(`/dashboard/your-blogs`);
              }}
            >
              {loading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin">
                  Please wait
                </Loader2>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
