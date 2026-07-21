import React from 'react';
import { useForm } from "react-hook-form"

const ReactHookForm = () => {

    let {
        register,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm();

    const formSubmit = (data) =>{
        console.log(data);
        reset();
    }

  return (
    <div className="flex flex-col gap-8 items-center p-4 text-amber-500">
      <h1 className="text-3xl">Product Form (React Hook Form)</h1>
      <form onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col gap-5 border-6 p-12 rounded-xl items-center text-xl"
        action=""
      >
        <div className="flex flex-col gap-4">
          <input {...register("productName")}
            className="border-2 p-1"
            type="text"
            name="productName"
            id="product-name"
            placeholder="Product Name"
          />
          <input {...register("productPrice")}
            className="border-2 p-1"
            type="text"
            name="productPrice"
            id="product-price"
            placeholder="Product Price"
          />
          <span>Select Category: </span>
          <select {...register("productCategory")}
           className="border-2 p-1" name="productCategory" id="product-category">
            <option value="MENS">Men's</option>
            <option value="WOMENS">Women's</option>
            <option value="KIDS">Kid's</option>
          </select>
          <input {...register("imageUrl")}
            className="border-2 p-1"
            type="url"
            name="imageUrl"
            id="image-url"
            placeholder="Image URL"
          />
        </div>
        <button className="bg-amber-800 text-white p-1.5 rounded-xl font-bold cursor-pointer w-full">
          CREATE
        </button>
      </form>
    </div>
  );
};


export default ReactHookForm
