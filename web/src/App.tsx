import { Route, Routes } from "react-router";
import AuthLayout from "~/components/layouts/auth-layout";
import Login from "~/features/auth/login";
import SignUp from "~/features/auth/sign-up";
import Dashboard from "~/features/dashboard/routes/dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route element={<AuthLayout />}>
        <Route element={<SignUp />} path="/sign-up" />
        <Route element={<Login />} path="/login" />
      </Route>
    </Routes>
  );
}

export default App;
