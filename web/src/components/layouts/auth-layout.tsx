import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <main className="w-full max-w-md p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
