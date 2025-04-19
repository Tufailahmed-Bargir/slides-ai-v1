"use client";

import { Mail, Lock, Loader2 } from "lucide-react"; // Import Loader2
import { signIn, useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react"; // Import useState, FormEvent, and useEffect
import { z } from "zod"; // Import Zod

// Define Zod schema for login form
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password is required and must have atleast 5 characters" }), // Or use min(8, ...) for minimum length
});

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({}); // State for validation errors

  // Clear token on initial load if not authenticated
  useEffect(() => {
    if (status !== 'loading' && !session) {
      localStorage.removeItem('jwtToken');
    }
  }, [session, status]);

  // Redirect if already logged in or during initial session check
  if (status === "loading") {
    // Optional: Show a loading indicator while session is checked
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
    setErrors({}); // Clear errors on Google sign-in attempt
    try {
      // Clear any existing custom token on Google sign-in attempt
      localStorage.removeItem('jwtToken');
      // No need to call custom-login for Google
      const result = await signIn("google", {
        redirect: false, // Important: handle redirect manually
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error(`Google Sign-In Failed: ${result.error}`);
        console.error("Google Authentication error:", result.error);
        setIsGoogleLoading(false);
      } else if (result?.ok && !result.error) {
        // Successful sign in, redirect
        router.push(result.url || "/dashboard");
        // No need to set loading false here as page navigates away
      } else {
        // Handle unexpected cases
        toast.error("Google Sign-In failed. Please try again.");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during Google Sign-In");
      console.error("Unexpected error during Google authentication:", error);
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors
    toast.dismiss(); // Dismiss previous toasts
    localStorage.removeItem('jwtToken'); // Clear previous token attempt

    // Validate form data with Zod
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      // Optionally show a generic toast or let field errors handle it
      // toast.error("Please fix the errors in the form.");
      setIsLoading(false);
      return;
    }

    // Use validated data
    const validatedEmail = validationResult.data.email;
    const validatedPassword = validationResult.data.password;

    try {
      // 1. Call custom-login to ensure user exists or create them AND get JWT
      const customLoginRes = await fetch("/api/auth/custom-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: validatedEmail, password: validatedPassword }), // Use validated data
      });

      const customLoginData = await customLoginRes.json(); // Always parse JSON

      if (!customLoginRes.ok) {
        // Use error message from API response if available
        throw new Error(customLoginData.error || customLoginData.errors || "Failed to prepare login.");
      }

      // Store the JWT token if received
      if (customLoginData.token) {
        localStorage.setItem('jwtToken', customLoginData.token);
        console.log("JWT Token stored in localStorage."); // For debugging
      } else {
         console.warn("No JWT token received from custom-login endpoint."); // For debugging
      }

      // 2. Sign in using NextAuth credentials provider (this establishes the session cookie)
      const result = await signIn("credentials", {
        redirect: false, // Handle redirect manually
        email: validatedEmail, // Use validated data
        password: validatedPassword, // Use validated data
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        // Handle errors specifically
        if (result.error === "CredentialsSignin") {
          toast.error("Login Failed", {
            description: "Invalid email or password. Please try again.",
          });
        } else {
          toast.error("Login Error", {
            description: result.error, // Display specific error from NextAuth
          });
        }
        console.error("Credentials Authentication error:", result.error);
        setIsLoading(false);
      } else if (result?.ok && !result.error) {
        // Successful sign in, redirect
        toast.success("Login Successful", {
          description: "Redirecting to dashboard...",
        });
        router.push(result.url || "/dashboard");
        // No need to set loading false here as page navigates away
      } else {
        // Handle unexpected cases
        toast.error("Login Failed", {
          description: "An unexpected error occurred. Please try again.",
        });
        setIsLoading(false);
      }
    } catch (error) { // Use implicit 'unknown' or 'Error' type instead of 'any'
      localStorage.removeItem('jwtToken'); // Clear token on error
      const message = error instanceof Error ? error.message : "An unexpected error occurred during login.";
      toast.error("Login Error", {
        description: message,
      });
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back!
              </h2>
              <p className="text-gray-600">Sign in or sign up instantly</p> {/* Updated text */}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}> {/* Add onSubmit */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email} // Bind value
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined }); // Clear error on change
                    }}
                    disabled={isLoading || isGoogleLoading} // Disable when loading
                    className={`w-full px-4 py-3 pl-10 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your email"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600">
                    {errors.email[0]} {/* Display first email error */}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password} // Bind value
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined }); // Clear error on change
                    }}
                    disabled={isLoading || isGoogleLoading} // Disable when loading
                    className={`w-full px-4 py-3 pl-10 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
                 {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-600">
                    {errors.password[0]} {/* Display first password error */}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading} // Disable when loading
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : null}
                {isLoading ? "Processing..." : "Sign in / Sign up"} {/* Updated text */}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading} // Disable when loading
                className="flex items-center justify-center gap-2 py-3 px-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-150 w-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2 text-gray-700" />
                ) : (
                  <Image
                    src="/google-img.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {isGoogleLoading ? "Processing..." : "Continue with Google"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 p-12">
          <div className="h-full flex flex-col justify-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl font-bold">Slides AI Platform</h1>
              <p className="text-blue-100 text-lg">
                Create stunning presentations with the power of AI. Transform
                your ideas into impactful slides.
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
      <Toaster position="bottom-right" richColors /> {/* Use richColors for better toast styling */}
    </div>
  );
}
