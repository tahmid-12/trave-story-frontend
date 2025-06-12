import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectdRoutes/ProtectedRoute";
import Login from "./pages/Auth/LogIn";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Home/Home";
// import "./App.css";

function App() {

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={
            // <Home />
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            }/>
        </Routes>
      </Router>
    </>
  )
}

export default App
