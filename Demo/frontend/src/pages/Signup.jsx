import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(formData);
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await signupUser(formData);

    // console.log(res.data);

    alert("Signup Successful");
  } catch (error) {
    // console.log(error.response.data);

    alert(error.response.data.message);
  }
};




  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

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

        <button type="submit">Signup</button>

        <p>
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;