// ENTER SITE DATA REQUEST
// while (true) {
//     let answer = prompt ("Hello, would you like a customized alerts?").toLowerCase();
//     if (answer === "yes") {
//         let customerName = prompt ("Amazing! Please enter your name")
//         let customerEmail = prompt ("And your email")

//         let customerInterests = [];

//         for (let i = 0; i < 3; i++){
//             let customerInterest = prompt("Almost done, what are you into? (we'll take three topics, one at a time)");
//             customerInterests.push(customerInterest);
//         }
//         alert(`You've got great taste ${customerName} ;) We'll be sure to email you at ${customerEmail} if we have new or discounted merch with the topics ${customerInterests.join(`, `)}. Happy shopping!`);
//         break;
//     }
//     else if (answer === "no") {
//         alert("Okay, enjoy our fun and freaky merch!");
//         break;
//     }
//     else {
//         alert("please enter yes or no");
//     }
// }

// PRODUCT DATA
const products = [];

//easiest way to designate different product lines as separate numbers
let idNumbers = {
    shirt: 0,
    hoodie: 0,
    art: 0,
};

// Enter a new product line all at once - need to manually enter the name, type, inventoryToAdd, image
function ProductLine(type, name, inventoryToAdd, image, description, tag) {
    let idPrefix;
    let price;
    let size;

    if (type.toLowerCase() === "shirt") {
        idPrefix = "t"; 
        price = 20;
        idNumbers.shirt += 1;
    } else if (type.toLowerCase() === "hoodie") {
        idPrefix = "h";
        price = 50
        idNumbers.hoodie += 1;
    } else if (type.toLowerCase() === "art") {
        idPrefix = "a";
        price = 35
        size = "na"
        idNumbers.art += 1;
    } else {
        alert("Please enter a valid product type");
    }

    const idNumber = idNumbers[type.toLowerCase()];

    const sizes = ["xs", "s", "m", "l", "xl", "xxl"];
    if (type.toLowerCase() === "shirt" || type.toLowerCase() === "hoodie") {
        sizes.forEach((size) => {
            const id = idPrefix + idNumber + size;
            const lineId = id.slice(0,2);
            products.push({ id, type, idNumber, lineId, name, size, price, inventory: inventoryToAdd, image, description, tag });
        });
    } else if (type.toLowerCase() === "art") {
        const id = idPrefix + idNumber + size;
        const lineId = id.slice(0,2);
        products.push({ id, type, idNumber, lineId, name, size, price, inventory: inventoryToAdd, image, description, tag });
    }
    idNumbers[type.toLowerCase()] = idNumber;
    console.log("New product line added successfully!");
}

//PRODUCT LINES
ProductLine ("shirt", "Never Forget - Rose Reveal", 10, "assets/images/neverForget.png", "This is our super bowl - celebrate Sasha Velour's iconic reveal that change herstory.", "drag race");

ProductLine ("art", "Xavier is Bi", 5, 'assets/images/xavier.png', "He may be a jerk but we all know Xavier and Magneto aren't 'good friends.' C'mon now.", "x-men");

ProductLine ("hoodie", "Jumbo is Fabulous", 10, 'assets/images/jumbo.png', "Who cares if Magneto was right? The real story is Jumbo is fab and Quinton sucks.", "x-men");

ProductLine ("shirt", "Gay Hobbits", 10, 'assets/images/oc_lotr.png', "The OC girls ship Sam and Frodo just like us.", "lord of the rings");

console.log(products);




// add inventory to specific model/size (by specific ID)
function addInventory(id, inventoryToAdd) {
    let searchId = id.toLowerCase();
    let inventorytoAdd = inventoryToAdd;
    let productIndex = products.findIndex((p) => p.id === searchId);
    if (productIndex != -1) {
        products[productIndex].inventory += inventorytoAdd;
    } else {
        console.log("Product not found")
    }
}

addInventory ("t1m", 4);


// subtract inventory to specific model/size (by specific ID)
function subtractInventory(id, inventoryToSubtract) {
    let searchId = id.toLowerCase();
    let inventorytoSubtract = inventoryToSubtract;
    let productIndex = products.findIndex((p) => p.id === searchId);
    if (productIndex != -1) {
        products[productIndex].inventory -= inventorytoSubtract;
    } else {
        console.log("Product not found")
    }
}

subtractInventory ("T1xs", 2);

//search by ID - for backend users
function searchById(id) {
    let product = products.find((p) => p.id === id.toLowerCase());
    if (product) {
        console.log("Product found");
        console.log(product);
    } else {
        console.log("Product not found")
    }
}

// search by type (shirt, hoodie, or art) - eventually will use pulldown menu or search bar to filter - need to incorporate into site
function searchByType(type) {
    let productsSearch = products.filter ((p) => p.type === type.toLowerCase());
    if (productsSearch) {
        console.log("Products found");
        console.log(productsSearch);
    } else {
        alert("Product not found")
    }
}

// search by tag - eventually will use search bar to filter - need to incorporate into site
function searchByTag(tag) {
    let productsSearch = products.filter ((p) => p.tag === tag.toLowerCase());
    if (productsSearch) {
        console.log("Products found");
        console.log(productsSearch);
    } else {
        alert("product not found")
    }
}

// search by size - eventually will use pulldown menu or search bar to filter - currently have to search by xs, s, m, l, xl, xxl - eventually will make it so you can search large, medium, etc - need to incorporate into site
function searchBySize(size) {
    let productsSearch = products.filter ((p) => p.size === size.toLowerCase());
    if (productsSearch.length > 0) {
        console.log("Products found");
        console.log(productsSearch);
    } else {
        alert("Product not found")
    }
}


//AUTO BUILD WEBSITE
//differentiating the different product sets - needed to autopopulate by full model rather than having a .box for each size
const uniqueNameSet = new Set();

//auto-populating website with array info
products.forEach(product =>{
    console.log(`Product type: ${product.type}`);
    if (!uniqueNameSet.has(product.name)) {
        let div = document.createElement("div");
        div.className = "box";

        if (product.type === "shirt") {
            div.classList.add("shirtBox");
        } else if (product.type === "hoodie") {
            div.classList.add("hoodieBox");
        } else if (product.type === "art") {
            div.classList.add("artBox");
        }

        if (product.type === "shirt" || product.type === "hoodie") {
            div.innerHTML = `
            <H2>${product.name}: ${product.type}</H2>
            <img src="${product.image}">
            <p>${product.description} - <b>€${product.price}</b></p>
            <div class="buttonContainer">
                <div class="dropdown">
                    <button id="sizeBtn${product.lineId}" class="btn btn-secondary dropdown-toggle sizeSelector" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Shop sizes
                    </button>
                    <ul class="dropdown-menu" id="sizeSelector${product.lineId}">
                        <li><a class="dropdown-item sizeOption" href="#">XS</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">S</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">M</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">L</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">XL</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">XXL</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <button id="quantityBtn${product.lineId}" class="btn btn-secondary dropdown-toggle sizeSelectionBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Number
                    </button>
                    <ul class="dropdown-menu" id="quantitySelector${product.lineId}">
                        <li><a class="dropdown-item quantityOption" href="#">1</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">2</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">3</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">4</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">5</a></li>
                    </ul>
                </div>
                <button type="button" class="btn btn-danger addToCart" data-product-id="${product.lineId}">Add to cart</button>
            </div>
            `;
            document.getElementById("productContainer").appendChild(div);
            uniqueNameSet.add(product.name);
        } else if (product.type === "art") {
            div.innerHTML = `
            <H2>${product.name}: ${product.type}</H2>
            <img src="${product.image}">
            <p>${product.description} - <b>€${product.price}</b></p>
            <div class="buttonContainer">
            <div class="dropdown">
                    <button id="sizeBtn${product.lineId}" class="btn btn-secondary dropdown-toggle sizeSelector" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Shop sizes
                    </button>
                    <ul class="dropdown-menu" id="sizeSelector${product.lineId}">
                        <li><a class="dropdown-item sizeOption" href="#">12x24 cm</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">15x30 cm</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">20x40 cm</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <button id="quantityBtn${product.lineId}" class="btn btn-secondary dropdown-toggle sizeSelectionBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Number
                    </button>
                    <ul class="dropdown-menu" id="quantitySelector${product.lineId}">
                        <li><a class="dropdown-item quantityOption" href="#">1</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">2</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">3</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">4</a></li>
                        <li><a class="dropdown-item quantityOption" href="#">5</a></li>
                    </ul>
                </div>
                <button type="button" class="btn btn-danger addToCart" data-product-id="${product.lineId}">Add to cart</button>
            </div>
            `
            document.getElementById("productContainer").appendChild(div);
        }

        const sizeDropdown = document.getElementById(`sizeSelector${product.lineId}`);
        const quantityDropdown = document.getElementById(`quantitySelector${product.lineId}`);
        
        const sizeOptions = sizeDropdown.getElementsByClassName('sizeOption');
        Array.from(sizeOptions).forEach(option => {
            option.addEventListener('click', (event) => {
                event.preventDefault();
                handleSizeSelection(product, option.innerText);
            });
        });
        const quantityOptions = quantityDropdown.getElementsByClassName('quantityOption');
        Array.from(quantityOptions).forEach(option => {
            option.addEventListener('click', (event) => {
                event.preventDefault();
                handleQuantitySelection (product, option.innerText);    
            });
        });
    };
});

function handleSizeSelection(product, size) {
    product.selectedSize = size;
    document.getElementById(`sizeBtn${product.lineId}`).innerText = size;
}

function handleQuantitySelection(product, quantity) {
    product.selectedQuantity = quantity;
    document.getElementById(`quantityBtn${product.lineId}`).innerText = quantity;
}

//sale function - eventually will link to site so user will not need to know id, but backend that's how we can manage inventory -- currently not incorporated - might be useful for updating inventory post sale
function sale(id, quantity) {
    let productIndex = products.findIndex((p) => p.id === id.toLowerCase());
    if (productIndex) {
        let product = products[productIndex];
        if (product.inventory >= quantity) {
            product.inventory -= quantity;
            alert(`${quantity} ${product.name} - ${product.type} has been added to your cart for a price of €${quantity * product.price}.`);
            } else {
                alert(`We're running low on that, sorry!`);
            } 
        }
    }

// shopping cart javascript
cart = [];

// empty cart message
cart.length === 0 && (() => {
    let div = document.createElement("div");
    div.id = "emptyCart";
    div.innerHTML = `
    Your cart is empty`;
    document.getElementById("cart").appendChild(div);
    })();

// adding to cart function
function addToCart (event) {
    let productId = event.target.getAttribute('data-product-id');
    const selectedProduct = products.find(product => product.lineId === productId);
    if (!selectedProduct.selectedQuantity || !selectedProduct.selectedSize) {
        alert("Please pick a size and number to add to your cart. Thanks!")
    } else if (selectedProduct) {
        let productName = selectedProduct.name;
        let productPrice = selectedProduct.price;
        let selectedSize = selectedProduct.selectedSize;
        let selectedType = selectedProduct.type;
        let selectedQuantity = selectedProduct.selectedQuantity;
        let productId = (selectedProduct.lineId + selectedSize);
        const cartPriceToAdd = productPrice * selectedQuantity;
        cart.push({productName, productPrice, selectedSize, selectedType, selectedQuantity, productId, cartPriceToAdd});

        const cartPriceTotal = cart.reduce((sum, item) => sum + item.cartPriceToAdd, 0);

        let cartMessage = `${selectedQuantity} of ${productName}: ${selectedType}, ${selectedSize} have been added to your cart.
        <br><b>Your total: €${cartPriceTotal}</b>`;
        document.getElementById("emptyCart").innerHTML = cartMessage;

        let checkoutButton = document.getElementById("checkoutButton");
        if (!checkoutButton) {
            checkoutButton = document.createElement("div");
            checkoutButton.id = "checkoutButton";
            checkoutButton.innerHTML = `Checkout or edit cart`;
            document.getElementById("cart").appendChild(checkoutButton);
            checkoutButton.addEventListener("click", openCheckout);
        }
    } else {
        alert("Product not found!");
    }
}

let addToCartBtn = document.querySelectorAll(".addToCart");

addToCartBtn.forEach(button => {
    button.addEventListener("click", addToCart);
});

const cartJSON = JSON.stringify(cart);
localStorage.setItem("userCart", cartJSON);


// open / populate checkout window 
function openCheckout (e) {
    let div = document.createElement("div");
    div.id = "checkoutWindow";
    div.className = "checkoutWindow";
    document.body.appendChild(div);

    let header = document.createElement("div");
    header.id = "checkoutHeader";
    div.appendChild(header);
    header.innerHTML = `
    <img src="./assets/images/horizontalLogo2.png" alt="Pixel Pride logo - Pixel Pride spelled in pink pixels, with a pixel rainbow sprouting from the name" id="checkoutLogo">
    <h1>Your cart</h1>
    <i class="fa-solid fa-x closeCheckout" id="closeCheckout"></i>
    `;

    let main = document.createElement("div");
    main.id = "checkoutMain";
    div.appendChild(main);
    if (cart.length === 0) {
        main.innerHTML = `
        <p>Your cart is empty</p>
        <b>Your total = €0</b>
        `;
    } else {
        let totalSum = 0;
        cart.forEach(item => {
            totalSum += item.cartPriceToAdd;
            main.innerHTML += `
            <div class="cartItem" id="cartItem${item.productId}">
                <button class="btn">
                    <b>${item.productName}</b> - ${item.selectedType}
                </button>
                <div class="dropdown">
                    <button class="btn dropdown-toggle" id="sizeRevision${item.productId}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Size: ${item.selectedSize}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item sizeOptionRev" href="#">XS</a></li>
                        <li><a class="dropdown-item sizeOptionRev" href="#">S</a></li>
                        <li><a class="dropdown-item sizeOptionRev" href="#">M</a></li>
                        <li><a class="dropdown-item sizeOptionRev" href="#">L</a></li>
                        <li><a class="dropdown-item sizeOptionRev" href="#">XL</a></li>
                        <li><a class="dropdown-item sizeOptionRev" href="#">XXL</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <button class="btn dropdown-toggle" id="quantityRevision${item.lineId}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Quantity: ${item.selectedQuantity}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item quantityOptionRev" href="#">1</a></li>
                        <li><a class="dropdown-item quantityOptionRev" href="#">2</a></li>
                        <li><a class="dropdown-item quantityOptionRev" href="#">3</a></li>
                        <li><a class="dropdown-item quantityOptionRev" href="#">4</a></li>
                        <li><a class="dropdown-item quantityOptionRev" href="#">5</a></li>
                    </ul>
                </div>
                <button class="btn">
                    Item price total:  <b>€${item.cartPriceToAdd}</b>
                </button>
                <i class="fa-solid fa-trash removeIcon" id="removeBtn${item.productId}"></i>
            </div>
            `;
            const sizeDropdownRevision = document.getElementById(`sizeRevision${item.productId}`);
            const quantityDropdownRevision = document.getElementById(`quantityRevision${item.productId}`);
            
            // const sizeOptionsRevision = sizeDropdownRevision.getElementsByClassName('sizeOptionRev');
            // Array.from(sizeOptionsRevision).forEach(option => {
            //     option.addEventListener('click', (event) => {
            //         event.preventDefault();
            //         alert("click!")
            //         reviseSizeSelection(product, option.innerText);
            //     });
            // });

        })
        main.innerHTML += `<b>Your total = €${totalSum}</b>
        <button id="finalCheckout" class="finalCheckout">Checkout</button>
        `;

        // const sizeDropdownRevision = document.getElementById(`sizeRevision${item.productId}`);
        // const quantityDropdownRevision = document.getElementById(`quantityRevision${item.productId}`);
        
        // const sizeOptionsRevision = sizeDropdownRevision.getElementsByClassName('sizeOptionRev');
        // Array.from(sizeOptionsRevision).forEach(option => {
        //     option.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         reviseSizeSelection(product, option.innerText);
        //     });
        // });

        // const quantityOptionsRevision = quantityDropdownRevision.getElementsByClassName('quantityOptionRev');
        // Array.from(quantityOptionsRevision).forEach(option => {
        //     option.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         reviseQuantitySelection (product, option.innerText);
                
        //     });
        // });

    }
}



//button listeners
document.body.addEventListener("click", function(event) {
    if (event.target.classList.contains("removeIcon")) {
        removeItem(event);
    } else if (event.target.classList.contains("closeCheckout")) {
        closeWindow ();
    } else if (event.target.classList.contains("finalCheckout")) {
        finalCheckout ();
    } else if (event.target.classList.contains("sizeOptionRev")) {
        sizeRevision (event.target);
    } else if (event.target.classList.contains("quantityOptionRev")) {
        quantityRevision (event.target);
    }
});

function sizeRevision (element) {
    const sizeRevisionElement = element.closest('.cartItem').querySelector('[id^="sizeRevision"]');
    // const productIdString = sizeRevisionElement.id;
    alert("Size adjusted!");
    let replacementSize = element.innerText;
    sizeRevisionElement.innerText = replacementSize
}

function quantityRevision (element) {
    const quantityRevisionElement = element.closest('.cartItem').querySelector('[id^="quantityRevision"]');
    // const productIdStringQuant = quantityRevisionElement.id;
    alert("Quantity adjusted!");
    let replacementQuantity = element.innerText;
    quantityRevisionElement.innerText = replacementQuantity;
}



function finalCheckout () {
    alert("Your order has been sent! Thanks!")
    closeWindow ();
}

function closeWindow () {
    let checkoutWindows = document.querySelectorAll(".checkoutWindow");
    checkoutWindows.forEach(window => {
        window.style.display = "none";
    });
}

function removeItem (event) {
    const productIdToRemove = event.target.id.replace('removeBtn', '');
    const indexToRemove = cart.findIndex(item => item.productId === productIdToRemove);
    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
        
    }

    document.getElementById(`cartItem${productIdToRemove}`).innerHTML = "";

    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('userCart', cartJSON);
    openCheckout ();
}

//header and type box filters listeners
document.getElementById("shirtDropdown").addEventListener("click", shirtsOnly);
document.getElementById("hoodieDropdown").addEventListener("click", hoodiesOnly);
document.getElementById("artDropdown").addEventListener("click", artOnly);
document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters);
document.getElementById("shirtSelector").addEventListener("click", shirtsOnly);
document.getElementById("hoodieSelector").addEventListener("click", hoodiesOnly);
document.getElementById("artSelector").addEventListener("click", artOnly);

//filters
function clearFilters () {
    document.querySelectorAll(".shirtBox, .hoodieBox, .artBox").forEach(box => {
        box.style.display = "block";
    })
}
function shirtsOnly () {
    clearFilters ();
    document.querySelectorAll(".hoodieBox, .artBox").forEach(box => {
        box.style.display = "none";
    })
}
function hoodiesOnly () {
    clearFilters ();
    document.querySelectorAll(".shirtBox, .artBox").forEach(box => {
        box.style.display = "none";
    })
}
function artOnly () {
    clearFilters ();
    document.querySelectorAll(".hoodieBox, .shirtBox").forEach(box => {
        box.style.display = "none";
    })
}


// function handleSizeSelection(product, size) {
//     product.selectedSize = size;
//     document.getElementById(`sizeBtn${product.lineId}`).innerText = size;
// }

// function handleQuantitySelection(product, quantity) {
//     product.selectedQuantity = quantity;
//     document.getElementById(`quantityBtn${product.lineId}`).innerText = quantity;
// }


//testing search functions
// searchBySize ("L");

// searchByTag ("X-MEN");

// searchByType ("ART");

// searchById ("A1NA");

// searchById ("t1XS");


//test sale function
// sale ("a1na", 12);