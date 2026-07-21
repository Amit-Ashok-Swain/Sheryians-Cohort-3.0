import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from 'nanoid';

const Form = ({usersData, setUsersData, setToggle, updatedData, setUpdatedData}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues : updatedData
  });

  const formSubmit = (data) => {
    // console.log(data);
    // setUsersData((prev)=>[...prev,data]);

    if(updatedData){
      let updatedArray = usersData.map((userData)=>{
        return userData.id === updatedData.id ? {...data,id:updatedData.id} : userData;
      });
      setUsersData(updatedArray);
      localStorage.setItem("users",JSON.stringify(updatedArray));
    }else{
      let arrData = [...usersData,{...data,id: nanoid()}];
      setUsersData(arrData);
      localStorage.setItem("users", JSON.stringify(arrData));
    }
    setToggle((prev)=>!prev);
    setUpdatedData(null);
    reset();
  };

  return (
    <div className="p-20 flex flex-col items-center gap-10 border-2 border-white rounded">
      <h1 className="text-3xl font-bold">User Form</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col gap-4 w-100"
        action=""
      >
        <input
          {...register("name", { required: "Name is Required", pattern : {
            value : /^\S.*$/ , message: "Blank Spaces are not allowed"
          } })}
          className="p-2 outline-0 border-1 rounded"
          type="text"
          placeholder="Your Name"
          name="name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input
          {...register("email", { required: "E-mail is Required" , pattern : {
            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter Valid E-mail"
          }})}
          className="p-2 outline-0 border-1 rounded"
          type="email"
          placeholder="Your E-mail"
          name="email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register("mobileNumber", { required: "Mobile Number is Required", minLength : {
            value : 10, message: "Minimum 10 digits are required"
          }, maxLength : {
            value : 10, message: "Maximum 10 digits are required"
          }, pattern : {
            value : /^\d{10}$/ ,
            message : "Enter Valid Indian Mobile Number"
          } })}
          className="p-2 outline-0 border-1 rounded"
          type="number"
          placeholder="Your Mobile Number"
          name="mobileNumber"
        />
        {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
        <input
          {...register("imageUrl", { required: "Image URL is Required", pattern:{
            value : /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            message : "Enter a valid URL"
          } })}
          className="p-2 outline-0 border-1 rounded"
          type="url"
          placeholder="Your Image URL"
          name="imageUrl"
        />
        {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
        <button
          className="bg-blue-700 p-2 rounded font-semibold cursor-pointer"
          type="submit"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Form;
