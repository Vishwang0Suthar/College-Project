import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

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
      // Make your fetch call here
      try {
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        });
        const data1 = await res.json();
        alert(data1.message);
        if (data1.success) router.push("/", { name: data1.user.name });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 -mt-20 col-xl-5">
            <img
              src="/Images/bgg.jpg"
              className="img-fluid absolute"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 relative justify-center flex items-center h-screen">
            <form
              className="register bg-white bg-opacity-70 p-8 rounded-xl"
              onSubmit={register}
            >
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg rounded-lg px-2 text-lg w-full"
                  type="text"
                  name="name"
                  value={user.name}
                  placeholder="Your Name"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg rounded-lg px-2 text-lg w-full"
                  type="text"
                  name="email"
                  value={user.email}
                  placeholder="Your Email"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg rounded-lg px-2 text-lg w-full"
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Your Password"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg rounded-lg px-2 text-lg w-full"
                  type="password"
                  name="reEnterPassword"
                  value={user.reEnterPassword}
                  placeholder="Re-enter Password"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  style={{ padding: "0rem 2rem" }}
                  type="submit"
                  className="btn btn-primary btn-lg bg-greenDark-50 rounded-2xl text-white"
                >
                  Register
                </button>
                {/* Provide the correct href prop for Link */}
                <Link href="/login/">
                  <button
                    style={{ padding: "0rem 2rem" }}
                    className="btn btn-primary btn-lg"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
