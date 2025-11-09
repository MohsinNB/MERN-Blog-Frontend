import React, { useState } from "react";
import auth from "../assets/auth.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block">
        <img className="h-[700px]" src={auth} alt="" />
      </div>
      {/* signup form */}
      <div className="flex justify-center items-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Create an account
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to create an account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex gap-3">
                <div>
                  <Label className="m-1">First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <Label className="m-1">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                ></Input>
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                ></Input>
                <button
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  type="button"
                  className="absolute right-3 top-5.5 text-gray-500"
                >
                  {showPassword ? <Eye /> : <EyeOff size={20} />}
                </button>
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Already have an account?
                  <Link to="/login">
                    <span className="m-0.5 underline cursor-pointer hover: text-gray-800 dark:hover:text-gray-100">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
