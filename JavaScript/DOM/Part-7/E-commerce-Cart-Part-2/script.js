const main = document.querySelector("main");
const navCreateButton = document.querySelector("#nav-btn");
const createProductForm = document.querySelector(".form");
const closeButtonOfProductForm = document.querySelector("#close-btn");
const productForm = document.querySelector("form");
const products = document.querySelector(".products");
const submitButton = document.querySelector("#submit-btn");

let productsArray = JSON.parse(localStorage.getItem("products")) || [];
let updateIndex = null;

let uiOfProducts = ()=>{
    products.innerHTML = "";
    productsArray.forEach((product)=>{
        products.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                     <img src="${product.productImageUrl}" alt="${product.productName}_${product.productDescription}">
                </div>
                <h3 id="product-name">${product.productName}</h3>
                <p id="product-description">${product.productDescription}</p>
                <p id="product-price">Price: ₹${product.productPrice}</p>
                <div class="action-btns">
                    <button onClick = "updateProduct('${product.id}')" type="button" id="edit"><i class="ri-edit-2-fill"> Edit</i></button>
                    <button onClick = "deleteProduct('${product.id}')" type="button" id="delete"><i class="ri-delete-bin-2-fill"> Delete</i></button>
                </div>
            </div>
        `
    })
}

uiOfProducts();

navCreateButton.addEventListener("click",()=>{
    createProductForm.style.display = "flex";
});

closeButtonOfProductForm.addEventListener("click",()=>{
    createProductForm.style.display = "none";
    productForm.reset();
    updateIndex = null;
    submitButton.textContent = "Create";
});


productForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    let productName = event.target[0].value;
    let productDescription = event.target[1].value;
    let productPrice = event.target[2].value;
    let productImageUrl = event.target[3].value;

    if(productName.trim() === "" || productDescription.trim() === "" || 
        productPrice.trim() === "" || productImageUrl.trim() === "" ) {
            alert("Please fill all the input fields");
            return;
        }
    productPrice = Number(productPrice);

    let productObject = {id: updateIndex !== null
        ? productsArray[updateIndex].id
        : Date.now(),productName,productDescription,productPrice,productImageUrl};

    if(updateIndex!==null){
        productsArray[updateIndex] = productObject;
        updateIndex = null;
        localStorage.setItem("products",JSON.stringify(productsArray));
    }else{
        productsArray.push(productObject);
        localStorage.setItem("products",JSON.stringify(productsArray));
    }
    submitButton.textContent = "Create";
    uiOfProducts();

    createProductForm.style.display = "none";

    console.log(productsArray);

    productForm.reset();
    
});


const updateProduct = (id)=>{
    id = Number(id);
    let product = productsArray.find((item)=>item.id === id);
    updateIndex = productsArray.findIndex((item)=>item.id === id);
    createProductForm.style.display = "flex";
    productForm[0].value = product.productName;
    productForm[1].value = product.productDescription;
    productForm[2].value = product.productPrice;
    productForm[3].value = product.productImageUrl;

    submitButton.textContent = "Update";

}

const deleteProduct = (id) =>{
    id = Number(id);
    let productIndex = productsArray.findIndex((item)=>item.id === id);
    if(productIndex === -1) return;
    productsArray.splice(productIndex,1);
    localStorage.setItem(
        "products",
        JSON.stringify(productsArray)
    );
    uiOfProducts();
}
