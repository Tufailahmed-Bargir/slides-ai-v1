"use client";

import { Mail, Lock, User, Loader2 } from "lucide-react"; // Added User icon
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // Added Link
import { useState, FormEvent } from "react";
import { z } from "zod";

// Define Zod schema for signup form
const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }), // Added name field
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters" }),
});

export default function SignupPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string[]; email?: string[]; password?: string[] }>({});

  // Redirect if already logged in or during initial session check
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  if (session?.user) {
    redirect("/dashboard");
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrors({});
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (result?.error) {
        toast.error(`Google Sign-In Failed: ${result.error}`);
        setIsGoogleLoading(false);
      } else if (result?.ok && !result.error) {
        router.push(result.url || "/dashboard");
      } else {
        toast.error("Google Sign-In failed. Please try again.");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during Google Sign-In", error);
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    toast.dismiss();

    const validationResult = signupSchema.safeParse({ name, email, password });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    const { name: validatedName, email: validatedEmail, password: validatedPassword } = validationResult.data;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: validatedName, email: validatedEmail, password: validatedPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Sign Up Failed", {
          description: data.message || "An error occurred during sign up.",
        });
      } else {
        toast.success("Sign Up Successful", {
          description: "Account created! Redirecting to login...", // Updated description
        });
        // Redirect to login page after a short delay to allow toast to be seen
        setTimeout(() => {
          router.push("/login");
        }, 1500); // Adjust delay as needed

        // Clear form (optional, as redirect happens)
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error("Sign Up Error", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="space-y-6"> {/* Reduced vertical spacing */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h2>
              <p className="text-gray-600">Join us and start creating!</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}> {/* Reduced form spacing */}
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    disabled={isLoading || isGoogleLoading}
                    className={`w-full px-4 py-2.5 pl-10 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name[0]}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    disabled={isLoading || isGoogleLoading}
                    className={`w-full px-4 py-2.5 pl-10 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your email"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email[0]}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    disabled={isLoading || isGoogleLoading}
                    className={`w-full px-4 py-2.5 pl-10 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password[0]}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                {isLoading ? "Creating Account..." : "Sign Up with Email"}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-150 w-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2 text-gray-700" />
                ) : (
                  <Image src="/google-img.png" alt="Google" width={20} height={20} />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {isGoogleLoading ? "Processing..." : "Continue with Google"}
                </span>
              </button>
            </div>

            {/* Link to Login */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image/Branding (Same as Login) */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 p-12">
          <div className="h-full flex flex-col justify-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl font-bold">Slides AI Platform</h1>
              <p className="text-blue-100 text-lg">
                Create stunning presentations with the power of AI. Transform your ideas into impactful slides.
              </p>
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
