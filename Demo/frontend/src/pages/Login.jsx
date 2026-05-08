import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;