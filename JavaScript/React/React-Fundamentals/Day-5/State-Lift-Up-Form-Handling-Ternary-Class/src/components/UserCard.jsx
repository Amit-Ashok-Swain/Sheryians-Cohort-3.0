import React from "react";

const UserCard = ({ setToggle, userData, del, idx }) => {
  return (
    <div className="p-6 flex flex-col gap-4 border-gray-400 border rounded-lg bg-white shadow-md w-80">
      <div className="w-full h-48 rounded overflow-hidden bg-gray-100 flex justify-center items-center">
        <img
          className="w-full h-full object-cover"
          src={userData.imageUrl}
          alt={userData.name}
        />
      </div>
      <h1 className="text-xl font-bold">{userData.name}</h1>
      <p className="text-gray-600">{userData.email}</p>

      <button
        className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        // Change the line below to use an arrow function
        onClick={() => del(idx)}
      >
        Delete
      </button>

      <div className="mt-2 text-sm">
        <p>
          Want to get back to Register Page?{" "}
          <span
            className="font-semibold text-blue-700 cursor-pointer hover:underline"
            onClick={() => {
              setToggle(false);
            }}
          >
            Check here!
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
