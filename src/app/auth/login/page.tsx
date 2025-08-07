"use client";

import type React from "react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { SimpleImage } from "@/components/inputs/simple-image/simple-image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(""); // Renamed to avoid conflict with formState.errors
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check for URL error parameters
  const urlError = searchParams.get("error");

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setServerError(""); // Clear server error before new submission

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo validation
      if (
        data.email === "admin@example.com" &&
        data.password === "password123"
      ) {
        toast.success("Login successful!", {
          description: "Welcome back, Admin!",
        });
        console.log("Admin login successful");
        router.push("/private/user-dashboard");
      } else if (
        data.email === "user@example.com" &&
        data.password === "password123"
      ) {
        toast.success("Login successful!", {
          description: "Welcome back!",
        });
        console.log("User login successful");
        router.push("/private/user-dashboard");
      } else {
        // Set a general server error if credentials don't match demo
        setServerError("Invalid email or password. Please try again.");
        toast.error("Login failed", {
          description: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setServerError("An unexpected error occurred. Please try again.");
      toast.error("Login failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('/images/GMC BG.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      {/* Login Card */}
      <Card className="w-full max-w-sm bg-black/90 border-gray-700 relative z-10 shadow-2xl">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center">
            <SimpleImage
              src="/images/logo-light.svg"
              alt="Description"
              width={70}
              height={70}
              fallback={<div className="w-10 h-10 bg-gray-200 rounded-full" />}
            />
          </div>
          {/* Title */}
          <h1 className="text-2xl font-semibold text-white text-center mb-8">
            Login
          </h1>
          {/* Error Alert */}
          {(urlError || serverError) && (
            <Alert className="border-red-500/50 bg-red-500/10 mb-6">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                {serverError || "Authentication failed. Please try again."}
              </AlertDescription>
            </Alert>
          )}
          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="username@gmail.com"
                {...register("email")}
                disabled={isLoading}
                className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-white text-sm font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  disabled={isLoading}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="font-medium text-sm mb-2 text-white">
              Demo Credentials:
            </h3>
            <div className="space-y-1 text-xs text-gray-300">
              <p>
                <strong>Admin:</strong> admin@example.com / password123
              </p>
              <p>
                <strong>User:</strong> user@example.com / password123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
