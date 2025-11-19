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

const CreateBlogs = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/blog/create",
        form,
        {
          withCredentials: true, // important if you use cookies for auth
        }
      );

      alert("Blog created!");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to create blog");
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
              className=" lbg-white dark: bg-gray-700"
            />
          </div>
          <div className="mt-4 mb-5">
            <Label className="mb-2">Category</Label>
            <Select>
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
            <Button>Create</Button>
          </div>
        </div>
      </Card>
      {/* <h2>Create Blog</h2>

      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={changeHandler}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Blog Category"
          value={form.category}
          onChange={changeHandler}
          required
        />

        <button type="submit" style={{ padding: "10px" }}>
          Create Blog
        </button>
      </form> */}
    </div>
  );
};

export default CreateBlogs;
