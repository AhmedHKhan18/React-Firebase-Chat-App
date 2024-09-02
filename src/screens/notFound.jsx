import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";


const NotFound = () => {

    const error = useRouteError();
    console.error(error);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        Sorry, the page you're looking for doesn't exist.
      </p>
      {/* <img
        src="https://via.placeholder.com/400x300"
        alt="404 Not Found"
        className="w-96 h-auto mt-8"
      /> */}
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
