import { useState } from "react";
import { useRouter } from "next/router";

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
    <section className="vh-100">
      {/* Your form JSX */}
      {/* Remember to remove the <Link> component */}
    </section>
  );
};

export default Register;
