import React, { useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog } from "@/redux/blogSlice";
import { toast } from "sonner";
import { setLoading } from "@/redux/blogSlice";
import { Loader2 } from "lucide-react";

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const { blog, loading } = useSelector((store) => store.blog);
  console.log(blog);

  const createBlogHandler = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/blog/`,
        { title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setBlog([...(blog || []), res.data.blog]));
        navigate(`/dashboard/create-blog/${res.data.blog._id}`);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="p-4 md:pr-20 h-screen md:ml-80 pt-20">
      <Card className="md:p-10 p-4 dark:bg-gray-800">
        <h1 className="text-2x1 font-bold">Let's create blog</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius
          necessitatibus fugit vel distinctio architecto, ut ratione rem nobis
          eaque?
        </p>
        <div className="mt-2">
          <div>
            <Label className="mb-2">Title</Label>
            <Input
              type="text"
              placeholder="Your blog name"
              className="bg-white dark:bg-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-5">
            <Label className="mb-2">Category</Label>
            <Select onValueChange={getSelectedCategory}>
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
          <div className="flex gap-2">
            <Button disabled={loading} onClick={createBlogHandler}>
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin">
                    please wait
                  </Loader2>
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlogs;
