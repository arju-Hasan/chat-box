// FILE: src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";


export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  function handleLogin(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return alert("⚠️ Please enter a valid username!");
    // store locally (so Chat page can read it)
    localStorage.setItem("chat_username", trimmed);
    navigate("/chat");
  }
   const HandelGithubSignin =() =>{
    signInWithPopup(auth, googleProvider ).then(result=>{
            console.log(result);
            setName(result.user.displayName)
        }).catch(error=>{
            console.log(error);
        })
 }

  return (
    <div className="bg-gradient-to-r from-red-300 h-screen via-yellow-300 to-green-300 p-10">
    <div
      className={`bg-gray-400 p-10 rounded-2xl h-fit  w-fit mx-auto`}
    >
      <h2 className="text-4xl font-bold text-center text-black p-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
        {/* <label htmlFor="username" className="w-full text-left">
          Enter your name:
        </label> */}
        <input
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Username..."
          className="w-full p-2 rounded border border-green-700 text-black"
        />
        <button
          className="w-full bg-green-600 hover:bg-green-500 p-2 rounded text-white"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-center p-4">Or</p>
      <div className="flex justify-center items-center">
        <button onClick={HandelGithubSignin} className="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
        </button>
      </div>
    </div>
    </div>
  );
}
