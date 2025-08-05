import React, { useState, useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import axios from 'axios';
import "./SignupPage.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupPage = ({ onNavigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [course, setCourse] = useState("Computer Science");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { setUserData } = useContext(UserDataContext);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!course) newErrors.course = "Please select a course";
    if (!agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:1000"}/students/register`,
        {
          name,
          email,
          password,
          course,
        }
      );

      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("token", data.token);
        onNavigate("dashboard");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrors({
        general: err.response?.data?.message || "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-400 p-4">
      <Card className="w-full max-w-md border-purple-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-purple-800">Create Your Account</CardTitle>
          <CardDescription className="text-black">
            Sign up to access AI-powered personalized learning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} noValidate>
            <div className="mb-4">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-purple-200 focus:border-purple-500"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="name-error"
              />
              {errors.name && (
                <p id="name-error" className="text-red-600 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-purple-200 focus:border-purple-500"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-purple-200 focus:border-purple-500 pr-10"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 p-1 text-purple-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && (
                <p id="password-error" className="text-red-600 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-purple-200 focus:border-purple-500 pr-10"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby="confirmPassword-error"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 p-1 text-purple-600"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="course" className="text-sm font-medium text-gray-700">Select Course</Label>
             <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-purple-200 focus:border-purple-500 pr-10"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby="confirmPassword-error"
              />
              {errors.course && (
                <p id="course-error" className="text-red-600 text-sm mt-1">
                  {errors.course}
                </p>
              )}
            </div>

            <div className="mb-4 flex items-center">
              <input
                id="agreeTerms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                aria-invalid={errors.agreeTerms ? "true" : "false"}
                aria-describedby="agreeTerms-error"
                className="mr-2"
              />
              <Label htmlFor="agreeTerms" className="mb-0 text-purple-700">
                I agree to the terms and conditions
              </Label>
            </div>
            {errors.agreeTerms && (
              <p id="agreeTerms-error" className="text-red-600 text-sm mb-4">
                {errors.agreeTerms}
              </p>
            )}

            {errors.general && (
              <p className="text-red-700 text-center mb-4">{errors.general}</p>
            )}

            <CardFooter>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Sign Up
              </Button>
            </CardFooter>
          </form>
          <div className="text-center mt-4">
            <Button
              variant="outline"
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
              onClick={() => onNavigate("login")}
            >
              Already have an account? Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
