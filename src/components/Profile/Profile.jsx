import React from "react";
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
function Profile() {
  return (
    <div className="pt-20 md:ml-[320px] md:h-screen ">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section */}
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={userLogo} />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 mt-3">
              Mern Stack Developer
            </h1>
            <div className="flex gap-4 items-center">
              <Link>
                <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
              <Link>
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
              <Link>
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
              <Link>
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300 " />
              </Link>
            </div>
          </div>

          {/* info section */}
          <div>
            <h1 className="font-bold text-center md:text-start text-4x1 mb-7">
              Welcome User !
            </h1>
            <p>
              <span className="font-semibold"> Email :</span>
              mohammadmohsin28012005@gmail.com
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600 p-6 rounded-1g">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitatio.
              </p>
            </div>

            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input
                        id="lastname"
                        name="lastName"
                        defaultValue="Last Name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 ">
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        name="facebook"
                        placeholder="Enter a URL"
                        type="text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        placeholder="Enter a URL"
                        type="text"
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="github ">Github</Label>
                      <Input
                        id="github"
                        name="github"
                        placeholder="Enter a URL"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text left">Description</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      className="col-span-3 text-gray-500"
                      placeholder="Enter a description"
                    />
                  </div>
                  <div>
                    <Label className="text left">Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="w-[277px]"
                    ></Input>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
