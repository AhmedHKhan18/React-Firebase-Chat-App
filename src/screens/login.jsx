import React from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase.config";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState("")

function handleLogin(e) {
    setLoading(true)
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user.uid;
        localStorage.setItem("userId", user);
        navigate("/home", {replace: true});
        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome!",
          });
          setLoading(false)
      })
      .catch((error) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: (error.message),
          });
         setLoading(false)
    });
}

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login Account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" onChange={e=>setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" onChange={e=>setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label  className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  {isLoading ?
                  <div className="flex items-center justify-center">
                    <img src="https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif" className="h-12"/>
                  </div>:
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800" onClick={handleLogin}>Login</button>
}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don`t have an account? <a href="./signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">SignUphere</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}

