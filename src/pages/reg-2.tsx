import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emit } from "process";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";

const PWD_REGEX =
  /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{5,24}$/;
const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
type Props = {};

const RegUser = (props: Props) => {
  const userRef = useRef();
  const mailRef = useRef();
  const pwdRef = useRef();
  const matchPwdRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState();
  const [validName, setValidName] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdMatchFocus, setPwdMatchFocus] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user.name);
    setValidName(result);
  }, [user.name]);

  useEffect(() => {
    const result = MAIL_REGEX.test(user.email);
    setValidMail(result);
  }, [user.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(user.password);
    setValidPwd(result);
  }, [user.password]);

  useEffect(() => {
    const match = user.password === user.reEnterPassword;
    setValidMatch(match);
  }, [user.password, user.reEnterPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwdRef, matchPwdRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      try {
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        });
        const data1 = await res.json();
        // alert(data1.message);
        if (data1.success) router.push("/", { name: data1.user.name });
        else {
          // Error handling
          if (res.status === 400) {
            setErrMsg("Username Taken");
          } else if (res.status === 409) {
            setErrMsg("User already registered");
          } else if (res.status === 500) {
            setErrMsg("Internal Server Error");
          } else if (res.status === 201) {
            setErrMsg("User Registered successfully");
            setSuccess(true);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setErrMsg("Network Error");
      }
    } else {
      setErrMsg("Invalid input");
    }
  };

  return (
    <div className="h-fit flex justify-center items-center relative">
      <img
        src="/Images/bgg.jpg"
        className="img-fluid absolute -top-40 z-10"
        alt="Sample"
      />
      <section className="text-black z-20 bg-white bg-opacity-70 p-8 rounded-xl mt-28 max-w-[400px]  flex flex-col justify-center">
        <p
          ref={errRef}
          className={
            errMsg
              ? "text-red-600 flex gap-2 items-center bg-red-200 p-3 border-2 border-red-600 rounded-md"
              : "hidden"
          }
          aria-live="assertive"
        >
          <FaInfoCircle />
          {errMsg}
        </p>
        <h1 className="text-center font-semibold text-xl">Register</h1>
        <form
          className="flex flex-col w-80 gap-2 self-center p-4"
          onSubmit={register}
        >
          <label
            htmlFor="username"
            className={clsx(
              "justify-between duration-100  flex items-center gap-2",
              {
                "font-bold": userFocus,
              }
            )}
          >
            Username:
            {/* {validName ? (
              <FaCheck className="flex text-green-600 mt-1" />
            ) : (
              <FaTimes className="flex text-red-600 mt-1" />
            )} */}
            <span className={validName ? "flex" : "hidden"}>
              <FaCheck className="flex text-green-600 mt-1" />
            </span>
            <span
              className={
                (!validName || !user.name) && userFocus ? "flex" : "hidden"
              }
            >
              <FaTimes className="flex text-red-600 mt-1" />
            </span>
          </label>
          <input
            type="text"
            id="username"
            name="name"
            ref={userRef}
            autoComplete="off"
            onChange={handleChange}
            required
            araia-invalid={validName ? "false" : "true"}
            className="text-black w-full px-1 rounded-sm appearance-none"
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            ref={errRef}
            className={
              user.name && !validName && userFocus
                ? "block bg-beige-100 border-beigeDark-150 max-w-72 rounded-md text-black border-2 p-2"
                : "hidden"
            }
            aria-live="assertive"
          >
            <FaInfoCircle className="text-beigeDark-150" /> 5 to 24 Characters.
            <br />
            Must begin with a letter <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label
            htmlFor="email"
            className={clsx(
              "justify-between duration-100  flex items-center gap-2",
              {
                "font-bold": mailFocus,
              }
            )}
          >
            E-mail:
            {/* {validMail ? (
              <FaCheck className="flex text-green-600 mt-1" />
            ) : (
              <FaTimes className="flex text-red-600 mt-1" />
            )} */}
            <span className={validMail ? "flex" : "hidden"}>
              <FaCheck className="flex text-green-600 mt-1" />
            </span>
            <span
              className={
                (!validMail || !user.email) && mailFocus ? "flex" : "hidden"
              }
            >
              <FaTimes className="flex text-red-600 mt-1" />
            </span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            ref={mailRef}
            autoComplete="off"
            onChange={handleChange}
            required
            araia-invalid={validMail ? "false" : "true"}
            className="text-black w-full px-1 rounded-sm appearance-none"
            aria-describedby="emailnote"
            onFocus={() => setMailFocus(true)}
            onBlur={() => setMailFocus(false)}
          />
          <p
            id="emailnote"
            ref={errRef}
            className={
              user.email && !validMail && mailFocus
                ? "block bg-beige-100 border-beigeDark-150 max-w-72 rounded-md text-black border-2 p-2"
                : "hidden"
            }
            aria-live="assertive"
          >
            <FaInfoCircle className="text-beigeDark-150" /> Must be a valid
            email address.
          </p>

          <label
            htmlFor="password"
            className={clsx(
              "justify-between duration-100  flex items-center gap-2",
              {
                "font-bold": pwdFocus,
              }
            )}
          >
            Password:
            {/* {validPwd ? (
              <FaCheck className="flex text-green-600 mt-1" />
            ) : (
              <FaTimes className="flex text-red-600 mt-1" />
            )} */}
            <span className={validPwd ? "flex" : "hidden"}>
              <FaCheck className="flex text-green-600 mt-1" />
            </span>
            <span
              className={
                (!validPwd || !user.password) && pwdFocus ? "flex" : "hidden"
              }
            >
              <FaTimes className="flex text-red-600 mt-1" />
            </span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            ref={pwdRef}
            autoComplete="off"
            onChange={handleChange}
            required
            araia-invalid={validPwd ? "false" : "true"}
            className="text-black w-full px-1 rounded-sm appearance-none"
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            ref={errRef}
            className={
              user.password && !validPwd
                ? "block bg-beige-100 border-beigeDark-150 max-w-72 rounded-md text-black border-2 p-2"
                : "hidden"
            }
            aria-live="assertive"
          >
            <FaInfoCircle className="text-beigeDark-150" /> 8 to 32 Characters.
            <br />
            Must include at least one uppercase letter, one lowercase letter,
            one number, and one special character.
          </p>

          <label
            htmlFor="confirm_pwd"
            className={clsx(
              "justify-between duration-100  flex items-center gap-2",
              {
                "font-bold": pwdMatchFocus,
              }
            )}
          >
            Confirm Password:
            {/* {validMatch && user.reEnterPassword ? (
              <FaCheck className="flex text-green-600 mt-1" />
            ) : (
              <FaTimes className="flex text-red-600 mt-1" />
            )} */}
            <span
              className={validMatch && user.reEnterPassword ? "flex" : "hidden"}
            >
              <FaCheck className="flex text-green-600 mt-1" />
            </span>
            <span
              className={(!validMatch || !user) && pwdFocus ? "flex" : "hidden"}
            >
              <FaTimes className="flex text-red-600 mt-1" />
            </span>
          </label>
          <input
            type="password"
            id="confirm_pwd"
            name="reEnterPassword"
            ref={matchPwdRef}
            autoComplete="off"
            onChange={handleChange}
            required
            araia-invalid={validMatch ? "false" : "true"}
            className="text-black w-full px-1 rounded-sm appearance-none"
            aria-describedby="matchpwdnote"
            onFocus={() => setPwdMatchFocus(true)}
            onBlur={() => setPwdMatchFocus(false)}
          />
          <p
            id="matchpwdnote"
            ref={errRef}
            className={
              user.reEnterPassword && !validMatch
                ? "block bg-beige-100 border-beigeDark-150 max-w-72 rounded-md text-black border-2 p-2"
                : "hidden"
            }
            aria-live="assertive"
          >
            <FaInfoCircle className="text-beigeDark-150" /> Must match the
            password entered above.
          </p>

          <div className="text-center flex justify-evenly text-lg-start mt-4 pt-2">
            <button
              type="submit"
              className={
                !validName || !validMail || !validPwd || !validMatch
                  ? "btn btn-primary btn-lg p-2 bg-greenDark-50 bg-opacity-80 hover:cursor-not-allowed rounded-md text-white"
                  : "btn btn-primary btn-lg p-2 bg-greenDark-50 rounded-md text-white"
              }
              disabled={!validName || !validMail || !validPwd || !validMatch}
            >
              Register
            </button>
            <Link href="/login/">
              <button className="btn btn-primary p-2 btn-lg">Sign-in</button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegUser;
