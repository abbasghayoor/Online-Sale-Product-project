let categories = [];

const categoryInput = document.getElementById("categoryName");
const addBtn = document.getElementById("addCategoryBtn");
const categoryList = document.getElementById("categoryList");

// ADD CATEGORY

addBtn.addEventListener("click", function () {

    let category = categoryInput.value.trim();

    if (category === "") {
        alert("Please enter category name");
        return;
    }

    categories.push({
        name: category,
        products: []
    });

    categoryInput.value = "";

    renderCategories();
});

// SHOW CATEGORIES

function renderCategories() {

    categoryList.innerHTML = "";

    categories.forEach(function (category, categoryIndex) {

        let productHTML = "";

        // Products of this category
        category.products.forEach(function (product, productIndex) {

            productHTML += `

                <div class="product-card">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        
                    >

                    <h3>${product.name}</h3>

                    <p>Rs. ${product.price}</p>
                    

                    <button onclick="editProduct(${categoryIndex}, ${productIndex})">
                        Edit
                    </button>

                    <button onclick="deleteProduct(${categoryIndex}, ${productIndex})">
                        Delete
                    </button>

                </div>

            `;
        });


        // Category
        categoryList.innerHTML += `

            <div class="category-card">

                <h2>${category.name}</h2>

                <button onclick="editCategory(${categoryIndex})">
                    Edit Category
                </button>

                <button onclick="deleteCategory(${categoryIndex})">
                    Delete Category
                </button>

                <button onclick="addProduct(${categoryIndex})">
                    + Add Product
                </button>

                <div class="products-container">

                    ${productHTML}

                </div>

            </div>

        `;
    });
}

// EDIT CATEGORY

function editCategory(categoryIndex) {

    let category = categories[categoryIndex];

    let newName = prompt(
        "Enter New Category Name:",
        category.name
    );

    if (newName === null || newName.trim() === "") {
        return;
    }

    category.name = newName.trim();

    renderCategories();
}

// DELETE CATEGORY

function deleteCategory(categoryIndex) {

    let confirmDelete = confirm(
        "Delete this category?"
    );

    if (confirmDelete) {

        categories.splice(categoryIndex, 1);

        renderCategories();
    }
}

// ADD PRODUCT FORM

function addProduct(categoryIndex) {

    let category = categories[categoryIndex];

    categoryList.innerHTML += `

        <div class="product-form">

            <h3>Add Product in ${category.name}</h3>

            <input
                type="text"
                id="productName${categoryIndex}"
                placeholder="Product Name"
            >

            <input
                type="number"
                id="productPrice${categoryIndex}"
                placeholder="Product Price"
            >

            <input
                type="file"
                id="productImage${categoryIndex}"
                accept="image/*"
            >

            <button onclick="saveProduct(${categoryIndex})">
                Add Product
            </button>

        </div>

    `;
}

// SAVE PRODUCT

function saveProduct(categoryIndex) {

    let productName =
        document.getElementById(
            "productName" + categoryIndex
        ).value.trim();

    let productPrice =
        document.getElementById(
            "productPrice" + categoryIndex
        ).value;

    let imageInput =
        document.getElementById(
            "productImage" + categoryIndex
        );


    if (productName === "" || productPrice === "" ) {

        alert("Please enter product details");

        return;
    }


    let file = imageInput.files[0];

    if (!file) {

        alert("Please select product image");

        return;
    }


    let reader = new FileReader();


    reader.onload = function () {

        categories[categoryIndex].products.push({

            name: productName,

            price: productPrice,

            image: reader.result

        });

        renderCategories();
    };


    reader.readAsDataURL(file);
}

// EDIT PRODUCT

function editProduct(categoryIndex, productIndex) {

    let product =
        categories[categoryIndex].products[productIndex];


    let newName = prompt(
        "Enter Product Name:",
        product.name
    );

    if (
        newName === null ||
        newName.trim() === ""
    ) {
        return;
    }


    let newPrice = prompt(
        "Enter Product Price:",
        product.price
    );

    if (
        newPrice === null ||
        newPrice.trim() === ""
    ) {
        return;
    }


    product.name = newName.trim();

    product.price = newPrice.trim();


    renderCategories();
}

// DELETE PRODUCT

function deleteProduct(categoryIndex, productIndex) {

    let confirmDelete = confirm(
        "Delete this product?"
    );


    if (confirmDelete) {

        categories[categoryIndex].products.splice(
            productIndex,
            1
        );

        renderCategories();
    }
}

// SEARCH CATEGORY + PRODUCT

function searchData() {

    let categorySearch =
        document.getElementById("searchCategory")
        .value
        .toLowerCase()
        .trim();

    let productSearch =
        document.getElementById("searchProduct")
        .value
        .toLowerCase()
        .trim();


    categoryList.innerHTML = "";


    categories.forEach(function (category, categoryIndex) {

        // Category match
        let categoryMatch =
            category.name
            .toLowerCase()
            .includes(categorySearch);


        // Products filter
        let matchingProducts =
            category.products.filter(function (product) {

                return product.name
                    .toLowerCase()
                    .includes(productSearch);

            });


        // Agar category search nahi hai
        // aur product search match nahi karta
        if (
            categorySearch !== "" &&
            !categoryMatch
        ) {
            return;
        }


        if (
            productSearch !== "" &&
            matchingProducts.length === 0
        ) {
            return;
        }


        let productHTML = "";


        matchingProducts.forEach(function (
            product
        ) {

            let productIndex =
                category.products.indexOf(product);


            productHTML += `

                <div class="product-card">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <h3>${product.name}</h3>

                    <p>Rs. ${product.price}</p>

                    <button
                        onclick="editProduct(${categoryIndex}, ${productIndex})">
                        Edit
                    </button>

                    <button
                        onclick="deleteProduct(${categoryIndex}, ${productIndex})">
                        Delete
                    </button>

                </div>

            `;
        });


        categoryList.innerHTML += `

            <div class="category-card">

                <h2>${category.name}</h2>

                <button
                    onclick="editCategory(${categoryIndex})">
                    Edit Category
                </button>

                <button
                    onclick="deleteCategory(${categoryIndex})">
                    Delete Category
                </button>

                <button
                    onclick="addProduct(${categoryIndex})">
                    + Add Product
                </button>

                <div class="products-container">

                    ${productHTML}

                </div>

            </div>

        `;
    });
}
