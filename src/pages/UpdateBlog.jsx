import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";

const UpdateBlog = () => {
  return (
    <div className="md: ml-[320px] pt-20 px-3 pb-10 ">
      <div className="max-w-6x1 mx-auto mt-8">
        <Card className="w-full bg-white dark: bg-gray-800 p-5 space-y-2">
          <h1>Basic Blog Information</h1>
          <p>
            Make changes to your blogs here. Click publish when you are done
          </p>
          <div className="space-x-2">
            <Button>Publish</Button>
            <Button>Remove blog</Button>
          </div>
          <div className="pt-10">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Enter a title"
              name="title"
              className=" dark:border-gray-300"
            />
          </div>
          <div className="pt-10">
            <Label>Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter a subtitle"
              name="subtitle"
              className="dark:border-gray-300"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
