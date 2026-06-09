import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };



  const handleGoogleSuccess = async (
  credentialResponse
) => {

  console.log(
    credentialResponse
  );

  alert(
    "Google Login Success"
  );
};
  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />

<button
  type="submit"
  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
  disabled={!formData?.email || !formData?.password}
>
  Login
</button>

<div className="my-4 text-center text-gray-500">
  OR
</div>

<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => {
    alert("Google Login Failed");
  }}
/>


        <p className="text-center mt-4 text-gray-600">
          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-500 ml-1"
          >
            Signup
          </Link>

        </p>

      </form>

    </div>
  );
}

// <Link to="/forgot-password">
//   Forgot Password?
// </Link>
export default Login;