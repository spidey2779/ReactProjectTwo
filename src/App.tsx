import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./hooks/hooks";
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const App = () => {
  const { loading } = useAppSelector((state) => state.userReducer);
  if (loading) {
    return <Loader />;
  }
  return (
    <Router>
      <Nav />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* //protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
