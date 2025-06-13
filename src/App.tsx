import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectdRoutes/ProtectedRoute";
import Login from "./pages/Auth/LogIn";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Home/Home";
import { useAppDispatch } from "./store/hooks";
import { getUser } from "./features/auth/auththunks";
// import "./App.css";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getUser());
    const hasLoggedOut = localStorage.getItem("hasLoggedOut") === "true";
    if (!hasLoggedOut) {
      dispatch(getUser());
    }
  }, [dispatch]);

  //   useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(getUser());
  //   }
  // }, [dispatch, isAuthenticated]);

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            // <Home />
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
