import React from "react";
import Login from "./screens/login";
import Signup from "./screens/signup";
import Home from "./screens/home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./screens/notFound";



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFound />
    },
    {
      path: "/signup",
      element: <Signup />,
      errorElement: <NotFound />
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <NotFound />
    },
  ]);

  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  )
}

export default App;