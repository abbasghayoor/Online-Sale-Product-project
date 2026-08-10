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
// UPDATE CATEGORY

function updateCategory(categoryIndex) {

    let newName =
        document.getElementById(
            "editCategoryName" + categoryIndex
        ).value.trim();

    if (newName === "") {

        alert("Please enter category name");

        return;
    }

    categories[categoryIndex].name = newName;

    renderCategories();
}

// EDIT CATEGORY FORM

function editCategory(categoryIndex) {

    let category = categories[categoryIndex];

    categoryList.innerHTML += `

        <div class="product-form">

            <h3>Edit Category</h3>

            <input
                type="text"
                id="editCategoryName${categoryIndex}"
                value="${category.name}"
                placeholder="Category Name"
            >

            <button onclick="updateCategory(${categoryIndex})">
                Update Category
            </button>

        </div>

    `;
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

// EDIT PRODUCT FORM

function editProduct(categoryIndex, productIndex) {

    let product =
        categories[categoryIndex].products[productIndex];

    categoryList.innerHTML += `

        <div class="product-form">

            <h3>Edit Product</h3>

            <input
                type="text"
                id="editProductName${categoryIndex}${productIndex}"
                value="${product.name}"
                placeholder="Product Name"
            >

            <input
                type="number"
                id="editProductPrice${categoryIndex}${productIndex}"
                value="${product.price}"
                placeholder="Product Price"
            >

            <input
                type="file"
                id="editProductImage${categoryIndex}${productIndex}"
                accept="image/*"
            >

            <button
                onclick="updateProduct(${categoryIndex}, ${productIndex})">
                Update Product
            </button>

        </div>

    `;
}
// UPDATE PRODUCT

function updateProduct(categoryIndex, productIndex) {

    let productName =
        document.getElementById(
            "editProductName" +
            categoryIndex +
            productIndex
        ).value.trim();

    let productPrice =
        document.getElementById(
            "editProductPrice" +
            categoryIndex +
            productIndex
        ).value;

    let imageInput =
        document.getElementById(
            "editProductImage" +
            categoryIndex +
            productIndex
        );

    if (productName === "" || productPrice === "") {

        alert("Please enter product details");

        return;
    }

    let product =
        categories[categoryIndex].products[productIndex];

    product.name = productName;
    product.price = productPrice;


    // Agar new image select ki hai
    if (imageInput.files[0]) {

        let reader = new FileReader();

        reader.onload = function () {

            product.image = reader.result;

            renderCategories();
        };

        reader.readAsDataURL(imageInput.files[0]);

    } else {

        // Agar new image nahi select ki
        // purani image same rahegi

        renderCategories();
    }
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
