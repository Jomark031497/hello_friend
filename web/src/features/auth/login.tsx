import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

export default function Login() {
  return (
    <div>
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-medium">Welcome Back!</h1>
        <p className="mt-2 text-sm text-gray-600">Log in to connect with friends</p>
      </div>
      <form className="flex flex-col gap-4 rounded border bg-white p-6 shadow">
        <Input label="Username" />
        <Input label="Password" type="password" />

        <Button type="submit" className="h-9 border-none bg-blue-500 text-white outline-none">
          Log In
        </Button>

        <p className="text-center text-sm text-blue-500">Forgot your Password?</p>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-4">
          <Button type="button" className="flex h-10 w-full items-center justify-center gap-2 font-normal">
            <FaGoogle className="h-5 w-5" />
            Continue with Google
          </Button>

          <Button type="button" className="flex h-10 w-full items-center justify-center gap-2 font-normal">
            <FaDiscord className="h-5 w-5" />
            Continue with Discord
          </Button>
        </div>

        <p className="text-center text-sm">
          Don't have an account? ?{" "}
          <Link to="/sign-up" className="font-medium text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
