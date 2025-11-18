import React, { useState } from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import userLogo from "../../assets/user.jpg";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function Profile() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useSelector((store) => store.auth);
  // console.log("Loading from Redux:", loading);

  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    bio: user?.bio,
    facebook: user?.facebook,
    linkedin: user?.linkedin,
    github: user?.github,
    instagram: user?.instagram,
    file: user?.photoUrl,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
    console.log(e);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("instagram", input.instagram);
    formData.append("github", input.github);
    if (input?.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      // console.log("axios start");
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/profile/update`,
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      // console.log("axios success");
      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="pt-20 md:ml-80 md:h-screen ">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section */}
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 ">
              <AvatarImage
                src={user.photoUrl || userLogo}
                className="w-full h-full rounded-full object-cover"
              />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 mt-3">
              {user.occupation || "Developer"}
            </h1>
            <div className="flex gap-4 items-center">
              <Link to={user.facebook}>
                <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
              <Link>
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
              <Link to={user.github}>
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
              <Link>
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
            </div>
          </div>

          {/* info section */}
          <div>
            <div>
              <h1 className="font-bold text-center md:text-start text-4x1 mb-7">
                Welcome {user.firstName || "User"} !
              </h1>
              <p>
                <span className="font-semibold"> Email : </span>
                {user.email}
              </p>
              <div className="flex flex-col gap-2 items-start justify-start my-5">
                <Label>About Me</Label>
                <p className="border dark:border-gray-600 p-6 rounded-1g">
                  {user.bio || "Add bio to connect more people like you"}
                </p>
              </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>Edit Profile</Button>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edit profile
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 ">
                  <div>
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      name="firstName"
                      defaultValue="First Name"
                      type="text"
                      value={input.firstName}
                      onChange={changeEventHandler}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      name="lastName"
                      defaultValue="Last Name"
                      type="text"
                      value={input.lastName}
                      onChange={changeEventHandler}
                    />
                  </div>
                </div>
                <div className="flex gap-3 ">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={input.facebook}
                      onChange={changeEventHandler}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      placeholder="Enter a URL"
                      type="text"
                      value={input.instagram}
                      onChange={changeEventHandler}
                    />
                  </div>
                </div>
                <div className="flex gap-3 ">
                  <div>
                    <Label htmlFor="linkedin">Linkedin</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      placeholder="Enter a URL"
                      type="text"
                      value={input.linkedin}
                      onChange={changeEventHandler}
                    />
                  </div>
                  <div>
                    <Label htmlFor="github ">Github</Label>
                    <Input
                      id="github"
                      name="github"
                      placeholder="Enter a URL"
                      type="text"
                      value={input.github}
                      onChange={changeEventHandler}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    placeholder="occupation"
                    type="text"
                    value={input.occupation}
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label className="text left">Description</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    className="col-span-3 text-gray-500"
                    placeholder="Enter a description"
                    value={input.bio}
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label className="text left">Picture</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    className="w-[277px]"
                    onChange={changeFileHandler}
                  ></Input>
                </div>

                <DialogFooter>
                  <Button onClick={submitHandler}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
                {/*
                 */}
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
