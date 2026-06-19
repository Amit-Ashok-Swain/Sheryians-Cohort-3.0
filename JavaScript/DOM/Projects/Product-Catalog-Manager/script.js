const main = document.querySelector("main");
const navCreateButton = document.querySelector("#create-btn");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");
const productForm = document.querySelector("form");
const productContainer = document.querySelector(".products");
const submitBtn = document.querySelector(".submit-btn");
const searchInput = document.querySelector("#search-input");

let productsArr = JSON.parse(localStorage.getItem("products")) || [] ;
let updateIndex = null;


navCreateButton.addEventListener("click",()=>{
    overlay.style.display = "flex";
});

closeBtn.addEventListener("click",()=>{
    overlay.style.display = "none";
    updateIndex = null;
    submitBtn.textContent = "Create Product";
    productForm.reset();
});


const renderOnUI = (products = productsArr) => {
    if(products.length === 0){
        productContainer.innerHTML = `
            <div class="empty-state">
                <i class="ri-shopping-bag-3-line"></i>
                <h2>No Products Found</h2>
                <p>
                    Start by creating your first product.
                </p>
            </div>
        `;
        return;
    }

    productContainer.innerHTML = "";
    products.forEach((product,productIndex) => {
        productContainer.innerHTML += `
                <!-- Product Card -->

                <div class="product-card">

                    <div class="product-image">
                        <img
                            src="${product.productImageUrl}"
                            alt="${product.productName}"
                        >
                    </div>

                    <div class="product-content">

                        <h3>${product.productName}</h3>

                        <p>
                            ${product.productDescription}.
                        </p>

                        <span class="price">
                            ₹${product.productPrice.toLocaleString("en-IN")}
                        </span>

                        <div class="card-actions">

                            <button onClick = "updateProduct('${product.id}')" class="edit-btn">
                                <i class="ri-edit-line"></i>
                                Edit
                            </button>

                            <button onClick = "deleteProduct('${productIndex}')" class="delete-btn">
                                <i class="ri-delete-bin-line"></i>
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
                    `
    });
}

renderOnUI();

productForm.addEventListener("submit",(event)=>{

    event.preventDefault();

    let productName = event.target[0].value;
    let productDescription = event.target[1].value
    let productPrice = event.target[2].value;
    let productImageUrl = event.target[3].value;

    // console.log(productName,productDescription,productPrice,productImageUrl);

    if(productName.trim() === "" ||
        productDescription.trim() === "" ||
        productPrice.trim() === "" || 
        productImageUrl.trim() === "") return alert("All fields are required to be filled") ;
    
    productPrice = Number(productPrice);

    let productObject = {id: updateIndex !== null ? productsArr[updateIndex].id:Date.now(), 
                            productName, 
                            productDescription,
                            productPrice,
                            productImageUrl};

    if(updateIndex!== null){
        productsArr[updateIndex] = productObject;
        updateIndex = null;
    }else{
        productsArr.push(productObject);
    }
    localStorage.setItem("products",JSON.stringify(productsArr));
    renderOnUI();
    submitBtn.textContent = "Create Product";
    
    productForm.reset();
    overlay.style.display = "none";
});


window.updateProduct = (id) =>{
    id = Number(id);
    let product = productsArr.find((item)=>item.id === id);
    updateIndex = productsArr.findIndex((item)=>item.id === id);

    overlay.style.display = "flex";

    productForm[0].value = product.productName;
    productForm[1].value = product.productDescription;
    productForm[2].value = product.productPrice;
    productForm[3].value = product.productImageUrl;

    submitBtn.textContent = "Update Product";

}


window.deleteProduct = (productIndex) =>{
    productsArr.splice(productIndex,1);
    localStorage.setItem("products",JSON.stringify(productsArr));
    renderOnUI();
}

searchInput.addEventListener("input",(event)=>{
    const searchTerm = event.target.value.toLowerCase();

    const filterProducts = productsArr.filter((product)=>{
        return product.productName.toLowerCase().includes(searchTerm);
    });
    renderOnUI(filterProducts);
})

// More to be added

// Event Delegation (remove inline onclick)
// Search by description
// Product count
// Delete confirmation
// Sort by price
// Filter by price range
// Image fallback