import React, { useRef, useState } from "react";

const Form = () => {

  const [productsData, setProductsData] = useState({});
  console.log(productsData);

  const [usersData,setUsersData] = useState([]);
  console.log(usersData);
  
  
 
  const formRef = useRef({});
  console.log(formRef);
  

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formRef.current.productName.value);
    console.log(formRef.current.productPrice.value);
    console.log(formRef.current.productCategory.value);
    console.log(formRef.current.imageUrl.value);

    let productData = {
      productName : formRef.current.productName.value,
      productPrice : formRef.current.productPrice.value,
      productCategory : formRef.current.productCategory.value,
      imageUrl : formRef.current.productCategory.value,
    }

    setProductsData(productData);

    setUsersData([...usersData,productData])

  }



  return (
    <div className="flex flex-col gap-8 items-center p-4 text-amber-500">
      <h1 className="text-3xl">Product Form</h1>
      <form onSubmit={handleSubmit}
        className="flex flex-col gap-5 border-6 p-12 rounded-xl items-center text-xl"
        action=""
      >
        <div className="flex flex-col gap-4">
          <input ref={(e)=>formRef.current.productName = e}
            className="border-2 p-1"
            type="text"
            name="productName"
            id="product-name"
            placeholder="Product Name"
          />
          <input ref={(e)=>formRef.current.productPrice = e}
            className="border-2 p-1"
            type="text"
            name="productPrice"
            id="product-price"
            placeholder="Product Price"
          />
          <span>Select Category: </span>
          <select ref={(e)=>formRef.current.productCategory = e}
           className="border-2 p-1" name="productCategory" id="product-category">
            <option value="MENS">Men's</option>
            <option value="WOMENS">Women's</option>
            <option value="KIDS">Kid's</option>
          </select>
          <input ref={(e)=>formRef.current.imageUrl = e}
            className="border-2 p-1"
            type="url"
            name="imageURl"
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

export default Form;
