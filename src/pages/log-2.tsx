import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "@/api/axios";
const LOGIN_URL = "/auth";
type Props = {};

const LogUser = (props: Props) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    try {
      const response = await axios.port;
    } catch (err) {}
    setUser("");
    setPwd("");
    // setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "flex" : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In:</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={userRef}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <a href="/signup">Sign-Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default LogUser;
