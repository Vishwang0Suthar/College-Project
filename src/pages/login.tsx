"use client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authlogin } from "../context/Auth";

// import "./login.css";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SparklesCore } from "@/components/paricles";
import { AuthContext } from "@/context/AuthContext";
import axios from "@/api/axios";
import clsx from "clsx";
const LOGIN_URL = "/auth";
const Login = ({ setLoginUser }) => {
  //   const Navigate = useNavigate();
  const router = useRouter();
  const { setAuth } = useContext;
  AuthContext;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [pwdFocus, setPwdFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const handleChange = (event: FormEvent) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (event: FormEvent) => {
    event.preventDefault();
    console.log(user);
    const res = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    // console.log(res);
    const data1 = await res.json();
    alert(data1.message);
    if (data1.success) {
      console.log("logged in");
      // setAuth({ user });
      router.push("/", { state: { name: data1.user.name } });
      localStorage.setItem("username", data1.user.email);
      // console.log(localStorage.getItem("username"));
      handleLogin();
    }
  };

  const handleLogin = async () => {
    // Perform login logic
    await Authlogin();
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="vh-100 z-30">
      <div className="container-fluid h-custom">
        {/* <div className="w-full z-[-1] absolute inset-0 h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div> */}
        <div className="row d-flex justify-content-center -mt-20 align-items-center h-100">
          <div className="">
            <img
              src="/Images/bgg.jpg"
              className="img-fluid absolute"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 relative justify-center flex items-center h-screen">
            <form
              className="login bg-white bg-opacity-70 p-8 rounded-xl"
              onSubmit={login}
            >
              {/* {console.log("User", user)} */}

              <div className="form-outline  mb-4">
                <label
                  className={clsx(
                    "justify-between duration-100  flex items-center gap-2",
                    {
                      "font-bold": emailFocus,
                    }
                  )}
                >
                  E-mail:
                </label>
                <input
                  className="form-control form-control-lg rounded-sm px-2 text-lg w-full"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <label
                  className={clsx(
                    "justify-between duration-100  flex items-center gap-2",
                    {
                      "font-bold": pwdFocus,
                    }
                  )}
                >
                  Password:
                </label>
                <input
                  className="form-control form-control-lg rounded-sm px-2 text-lg w-full"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                ></input>
              </div>

              {/* // Update password */}
              <div className="d-flex justify-content-between align-items-center">
                {/* <!-- Checkbox --> */}
                <div className="form-check mb-0 px-1">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label
                    className="form-check-label text-sm"
                    htmlFor="form2Example3"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#!"
                  onClick={() => {
                    router.push("/changePassword");
                  }}
                  className="text-sm text-blue-800"
                >
                  Forgot password?
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  style={{ padding: "0rem 2rem" }}
                  // type="submit"
                  onClick={login}
                  className="btn btn-primary btn-lg bg-greenDark-50 rounded-2xl text-white"
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <button
                    style={{ padding: "0rem 2rem" }}
                    className="btn btn-primary btn-lg"
                    onClick={navigateToRegister}
                    type="button" // Change type to button
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
