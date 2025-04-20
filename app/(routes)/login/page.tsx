"use client";

import { Mail, Lock, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { toast  } from "sonner";
// Remove redirect import from next/navigation as we'll use router.push
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link"; // Import Link
// Import useEffect
import { useState, FormEvent, useEffect } from "react"; 
import { z } from "zod";

// Define Zod schema for login form
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }), // Min 1 for login
});

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});

  // Use useEffect for redirection based on session status
  useEffect(() => {
    // Redirect to dashboard if the user is already authenticated
    if (status === 'authenticated' && session?.user) {
      router.push('/dashboard');
    }
  }, [status, session, router]); // Dependencies for the effect

  // Show loading indicator while session status is being determined
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // If status is not loading and not authenticated, render the login form
  // The useEffect above handles the authenticated case

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrors({}); // Clear errors on Google sign-in attempt
    try {
      // Check if Google client ID exists in env variables first
      const result = await signIn("google", {
        redirect: false, // Important: handle redirect manually
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        // Provide more specific error messages based on the error
        if (result.error.includes("configuration")) {
          toast.error("Google Sign-In Failed: OAuth configuration error. Please contact support.");
        } else if (result.error.includes("AccessDenied") || result.error.includes("access_denied")) {
          toast.error("Sign-in was canceled or access was denied");
        } else {
          toast.error(`Google Sign-In Failed: ${result.error}`);
        }
        console.error("Google Authentication error:", result.error);
        setIsGoogleLoading(false);
      } else if (result?.ok && !result.error) {
        // Successful sign in, redirect
        router.push(result.url || "/dashboard");
        // No need to set loading false here as page navigates away
      } 
        setIsGoogleLoading(false);
       
    } catch (error) {
      toast.error("An unexpected error occurred during Google Sign-In");
      console.error("Unexpected error during Google authentication:", error);
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    toast.dismiss();

    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    const { email: validatedEmail, password: validatedPassword } = validationResult.data;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: validatedEmail,
        password: validatedPassword,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        // Use the specific error message from the authorize function if available
        const errorMessage = result.error === "CredentialsSignin" 
          ? "Invalid email or password. Please check your credentials." // Updated message
          : result.error; // Use the error message thrown from authorize

        toast.error("Login Failed", {
          description: errorMessage,
        });
        
        console.error("Credentials Authentication error:", result.error); // Log the original error too
        setIsLoading(false);
      } else if (result?.ok && !result.error) {
        toast.success("Login Successful", {
          description: "Redirecting to dashboard...",
        });
        // Use router.push for client-side navigation after successful sign-in
        router.push("/dashboard"); 
      } else {
        toast.error("Login Failed", {
          description: "An unexpected error occurred. Please try again.",
        });
        setIsLoading(false);
      }
    } catch (error) {
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
          <div className="space-y-6"> {/* Adjusted spacing */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back!
              </h2>
              <p className="text-gray-600">Sign in to continue</p> {/* Reverted text */}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}> {/* Adjusted spacing */}
              {/* ... existing email input ... */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 block mb-1.5"
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
                    className={`w-full px-4 py-2.5 pl-10 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your email"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600">
                    {errors.email[0]} {/* Display first email error */}
                  </p>
                )}
              </div>

              {/* ... existing password input ... */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block mb-1.5"
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
                    className={`w-full px-4 py-2.5 pl-10 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
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
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                {isLoading ? "Signing In..." : "Sign In"} {/* Reverted text */}
              </button>
            </form>

            {/* ... existing 'Or continue with' divider ... */}
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

            {/* ... existing Google sign in button ... */}
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

            {/* Link to Signup */}
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image/Branding (Copied from Signup) */}
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
    {/* <Toaster position="bottom-right" richColors /> */}
    </div>
  );
}
