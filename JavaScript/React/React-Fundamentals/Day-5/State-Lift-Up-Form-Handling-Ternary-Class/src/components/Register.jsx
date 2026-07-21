import React, { useState } from "react";

const Register = ({ setToggle, setUsersData }) => {
  // const [formData, setFormData] = useState({name: "Your Name", email: "name@example.com", password:"Password@12345",confirmPassword:"Password@12345"});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
  });

  // const [usersData, setUsersData] = useState([]);

  // console.log(usersData);

  const handleFormChangeEvent = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    // setUsersData([...usersData, formData]);
    setUsersData((prev)=>[...prev,formData]);
    setFormData({ name: "", email: "", password: "", confirmPassword: "", imageUrl: "", });
  };

  return (
    <div className="h-in flex flex-col gap-5 items-center justify-between border-4 rounded p-30 bg-white">
      <h1 className="font-[700] text-3xl">Register</h1>
      <form
        onSubmit={handleSubmitEvent}
        className="flex flex-col gap-3"
        action=""
      >
        <input
          required
          value={formData.name}
          name="name"
          onChange={handleFormChangeEvent}
          type="text"
          placeholder="Your Name"
          className="border-2 rounded p-2 bg-blue-50"
        />
        <input
          required
          value={formData.email}
          name="email"
          onChange={handleFormChangeEvent}
          type="email"
          placeholder="Your E-mail"
          className="border-2 rounded p-2 bg-blue-50"
        />
        <input
          required
          value={formData.password}
          name="password"
          onChange={handleFormChangeEvent}
          placeholder="Your Password"
          type="password"
          className="border-2 rounded p-2 bg-blue-50"
        />
        <input
          required
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={handleFormChangeEvent}
          type="password"
          placeholder="Confimr your Password"
          className="border-2 rounded p-2 bg-blue-50"
        />
        <input
          required
          value={formData.imageUrl}
          name="imageUrl"
          onChange={handleFormChangeEvent}
          type="url"
          placeholder="Your Image Url"
          className="border-2 rounded p-2 bg-blue-50"
        />
        <button className="bg-blue-800 font-white border-black-2 rounded text-white font-bold h-10 cursor-pointer">
          Register
        </button>
        <p>
          Already have an Account?{" "}
          <span
            className="font-semibold text-blue-700 cursor-pointer"
            onClick={() => {
              setToggle(false);
            }}
          >
            {" "}
            Login here!{" "}
          </span>
        </p>
        <p>
          Want to check user's Data?{" "}
          <span
            className="font-semibold text-blue-700 cursor-pointer"
            onClick={() => {
              // setToggle(false);
              setToggle(true)
            }}
          >
            {" "}
            Check here!{" "}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
