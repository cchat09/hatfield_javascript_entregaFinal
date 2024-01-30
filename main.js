// CLEARING LOCAL DATA (LEAVE HERE TO CHECK IF POPUPS ARE WORKING)
// function clearUserData() {
//     localStorage.removeItem('userData');
// }
// clearUserData();

//USER DATA + SWEET ALERT POPUPS
let userData = JSON.parse(localStorage.getItem('userData')) || {
    email: null,
    password: null,
};

rewriteUserId ();

const newUserAlert = (triggeredByEvent = false) => {
    if (!localStorage.getItem('userData') || triggeredByEvent) {
        Swal.fire({
            title: "Welcome to Pixel Pride",
            text: "Log in or open an account to get exclusive deals and updates!",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "New account",
            cancelButtonText: "Log in",
            denyButtonText: `No thanks`,
            backdrop: `
            rgba(0,0,123,0.4)
            `,
        }).then((result) => {
            if (result.isConfirmed) {
            newUser ();
            } else if (result.isDenied) {
            Swal.fire({
                title: "Okay, enjoy the shop!",
                backdrop: `
                rgba(0,0,123,0.4)
                `,
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    icon: "error",
                    title: "Just kidding 🤭",
                    text: "I haven't learned databases yet, you can't log in!",
                    backdrop: `
                    rgba(0,0,123,0.4)
                    `,
                  });
            }
        });
    };
}
document.addEventListener("DOMContentLoaded", () => newUserAlert());

function newUser () {
    const steps = ['1', '2', '3']
    const Queue = Swal.mixin({
        progressSteps: steps,
        confirmButtonText: 'Next >',
        backdrop: `
            rgba(0,0,123,0.4)
            `,
    });
    return (async () => {
        const { value: email } = await Queue.fire({
            title: 'Email please!',
            currentProgressStep: 0,
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address",
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            backdrop: `
            rgba(0,0,123,0.4)
            `,
        });
        if (!email) throw null;
        if (email) {
            await Queue.fire({
                text: `Entered email: ${email}`,
                confirmButtonText: 'Next',
                currentProgressStep: 0,
            });
            userData.email = email;
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        const { value: password } = await Queue.fire({
            title: "Enter your password",
            currentProgressStep: 1,
            input: "password",
            inputLabel: "Password",
            backdrop: `
            rgba(0,0,123,0.4)
            `,
            inputPlaceholder: "Enter your password",
            inputAttributes: {
                maxlength: "20",
                autocapitalize: "off",
                autocorrect: "off"
            },
            showCancelButton: true,
            cancelButtonText: 'Cancel',
        });
        if (!password) throw null;
        if (password) {
            await Queue.fire({
                text: `Entered password: ${password}`,
                currentProgressStep: 1,
                backdrop: `
                rgba(0,0,123,0.4)
                `,
            })
            userData.password = password;
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        const { value: terms } = await Queue.fire({
            title: "Terms and conditions",
            currentProgressStep: 2,
            backdrop: `
            rgba(0,0,123,0.4)
            `,
            input: "checkbox",
            inputValue: 1,
            inputPlaceholder: `
            I agree with the terms and conditions
            `,
            confirmButtonText: `
            Finish&nbsp;<i class="fa fa-arrow-right"></i>
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            inputValidator: (result) => {
            return !result && "You need to agree with T&C";
            }
        });
        if (!terms) throw null;
        Queue.fire({
            title: "Awesome!",
            text: "Thanks, now enjoy the shop!",
            imageUrl: "./assets/images/pixelLogo.png",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Pixel Pride logo",
            backdrop: `
            rgba(0,0,123,0.4)
            `,
            confirmButtonText: "Shop!"
        });
        localStorage.setItem('userData', JSON.stringify(userData));
        rewriteUserId ();
    })();
}

function rewriteUserId () {
    if (userData.email) {
        document.getElementById("userLogin").innerHTML = `<a class="nav-link" href="#">User: ${userData.email}</a>`;
    } 
}

document.getElementById("userLogin").addEventListener("click", function() {
    newUserAlert(true);
});

function showGif () {
    fetch('https://api.example.com/gif')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.blob(); // Use blob() to get the binary data of the response
  })
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob);
    
    // Assuming you want to display the GIF in an img tag with id "gifImage"
    const imgElement = document.getElementById('gifImage');
    imgElement.src = imageUrl;
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}

// PRODUCT DATA
const products = [];

let idNumbers = {
    shirt: 0,
    hoodie: 0,
    art: 0,
};

// ENTER NEW PRODUCT LINE
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

    const clothesSizes = ["xs", "s", "m", "l", "xl", "xxl"];
    const artSizes = ["s", "m", "l"];

    if (type.toLowerCase() === "shirt" || type.toLowerCase() === "hoodie") {
        clothesSizes.forEach((size) => {
            const id = idPrefix + idNumber + size;
            const lineId = id.slice(0,2);
            products.push({ id, type, idNumber, lineId, name, size, price, inventory: inventoryToAdd, image, description, tag });
        });
    } else if (type.toLowerCase() === "art") {
        artSizes.forEach((size) => {
        const id = idPrefix + idNumber + size;
        const lineId = id.slice(0,2);
        products.push({ id, type, idNumber, lineId, name, size, price, inventory: inventoryToAdd, image, description, tag });
        });
    }
    idNumbers[type.toLowerCase()] = idNumber;
    console.log("New product line added successfully!");
}

//PRODUCT LINES
ProductLine ("shirt", "Bob's Philosophy", 10, "assets/images/bobQuote.png", "If Bob said it, it must be right.", "drag race")

ProductLine ("art", "Babadook: Queer Icon", 10, "assets/images/babadook.png", "Babadook says 'fuck them kids' -- a gay legend.", "babadook");

ProductLine ("hoodie", "Bowuigi", 10, "assets/images/bowuigi.png", "Mamma mia! The attraction is undeniable.", "mario");

ProductLine ("shirt", "Never Forget - Rose Reveal", 10, "assets/images/neverForget.png", "This is our super bowl - celebrate Sasha Velour's iconic reveal that change herstory.", "drag race");

ProductLine ("art", "Xavier is Bi", 5, 'assets/images/xavier.png', "He may be a jerk but we all know Xavier and Magneto aren't 'good friends.' C'mon now.", "x-men");

ProductLine ("hoodie", "Jumbo is Fabulous", 10, 'assets/images/jumbo.png', "Who cares if Magneto was right? The real story is Jumbo is fab and Quinton sucks.", "x-men");

ProductLine ("shirt", "Gay Hobbits", 10, 'assets/images/oc_lotr.png', "The OC girls ship Sam and Frodo just like us.", "lord of the rings");

ProductLine ("shirt", "Work, Jynx!", 10, "assets/images/jynx.png", "Psychic and Ice Beam? Haters to the back.", "pokemon");

console.log(products);

//BACKEND FUNCTIONS
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

function searchById(id) {
    let product = products.find((p) => p.id === id.toLowerCase());
    if (product) {
        console.log("Product found");
        console.log(product);
    } else {
        console.log("Product not found")
    }
}

function searchByType(type) {
    let productsSearch = products.filter ((p) => p.type === type.toLowerCase());
    if (productsSearch) {
        console.log("Products found");
        console.log(productsSearch);
    } else {
        alert("Product not found")
    }
}

function searchByTag(tag) {
    let productsSearch = products.filter ((p) => p.tag === tag.toLowerCase());
    if (productsSearch) {
        console.log("Products found");
        console.log(productsSearch);
    } else {
        alert("product not found")
    }
}

//testing search functions
searchByTag ("X-MEN");
searchByType ("ART");
searchById ("t1XS");

//AUTO BUILD WEBSITE
//differentiating the different product sets
const uniqueNameSet = new Set();

//auto-populating website
products.forEach(product =>{
    console.log(`Product type: ${product.type}`);
    if (!uniqueNameSet.has(product.name)) {
        let div = document.createElement("div");
        div.className = "box";
        div.classList.add("productBox");
        if (product.tag) {
            let modifiedTag = product.tag.replace(/\s/g, '_');
            div.classList.add(modifiedTag);
        }

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
                        <li><a class="dropdown-item sizeOption" href="#">S</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">M</a></li>
                        <li><a class="dropdown-item sizeOption" href="#">L</a></li>
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
            uniqueNameSet.add(product.name);
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
    document.getElementById(`sizeBtn${product.lineId}`).innerText = "Size: " + size;
}

function handleQuantitySelection(product, quantity) {
    product.selectedQuantity = quantity;
    document.getElementById(`quantityBtn${product.lineId}`).innerText = "Number: " + quantity;
}

//HEADER POPUS
document.getElementById("aboutUs").addEventListener("click", function() {
    openAboutUs ();
});
function openAboutUs () {
    let div = document.createElement("div");
    div.id = "aboutUsWindow";
    div.className = "checkoutWindow";
    document.body.appendChild(div);
    div.innerHTML =`
    <i class="fa-solid fa-x closeCheckout" id="closeCheckout"></i>
    <img src="./assets/images/horizontalLogo2.png" alt="Pixel Pride logo - Pixel Pride spelled in pink pixels, with a pixel rainbow sprouting from the name" id="checkoutLogo">
    <h1>About us</h1>
    <article>Pixel Pride is a space dedicated to the queer, the nerdy, and the wonderfully weird. We're always adding more merchandise, and this is just the beginning. But mostly, it's a project for my Javascript class. 👀 You can't buy anything (or sue me for copywrite infringement), it's just for fun / to learn programming! And speaking of fun...</article>
    <div id=aboutUsFooter>
        <h5>Today's joke of the day:</h5><p id="jokePlaceholder">Loading joke...</p>
    </div>
    `;
    fetchJoke().then(joke => {
        document.getElementById("jokePlaceholder").textContent = `${joke.setup} 
        ${joke.punchline}`; 
    })
}
// ABOUT US JOKE OF THE DAY API
function fetchJoke() {
    return fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

document.getElementById("clothingSizeDropdown").addEventListener("click", function() {
    openClothingSize ();
});
function openClothingSize () {
    let div = document.createElement("div");
    div.id = "sizeWindow";
    div.className = "checkoutWindow";
    document.body.appendChild(div);
    let header = document.createElement("div");
    header.id = "sizeHeader";
    header.className = "header";
    div.appendChild(header);
    header.innerHTML =`
        <i class="fa-solid fa-x closeCheckout" id="closeCheckout"></i>
        <img src="./assets/images/horizontalLogo2.png" alt="Pixel Pride logo - Pixel Pride spelled in pink pixels, with a pixel rainbow sprouting from the name" id="checkoutLogo">
        <h1>Sizing</h1>
        `
    let main = document.createElement("div");
    main.id = "sizeMain";
    div.appendChild(main);
    main.innerHTML = `
        <img src="./assets/images/sizeChart.webp">
        <article>Pixel Pride is dedicated to inclusive sizing, which is why we aim to cover all body types from XS to XXL, and we never upcharge certain sizes.</article>
        `
}

document.getElementById("artSizeDropdown").addEventListener("click", function() {
    openArtSize ();
});
function openArtSize () {
    let div = document.createElement("div");
    div.id = "sizeWindow";
    div.className = "checkoutWindow";
    document.body.appendChild(div);
    let header = document.createElement("div");
    header.id = "sizeHeader";
    header.className = "header";
    div.appendChild(header);
    header.innerHTML =`
        <i class="fa-solid fa-x closeCheckout" id="closeCheckout"></i>
        <img src="./assets/images/horizontalLogo2.png" alt="Pixel Pride logo - Pixel Pride spelled in pink pixels, with a pixel rainbow sprouting from the name" id="checkoutLogo">
        <h1>Art</h1>
        `
    let main = document.createElement("div");
    main.id = "sizeMain";
    div.appendChild(main);
    main.innerHTML = `
        <img src="./assets/images/posterSizes.webp">
        <article>Your space deserves the right style and the right size.</article>
        `
}

// SHOPPING CART AND CHECKOUT
const cartData = localStorage.getItem('cart');
const cart = cartData ? JSON.parse(cartData) : [];
localStorage.setItem('cart', JSON.stringify(cart));

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// empty cart message
cart.length === 0 && (() => {
    let div = document.createElement("div");
    div.id = "emptyCart";
    div.innerHTML = `
    Your cart is empty`;
    document.getElementById("cart").appendChild(div);
    })();

function addToCart (event) {
    let productId = event.target.getAttribute('data-product-id');
    const selectedProduct = products.find(product => product.lineId === productId);
    if (!selectedProduct.selectedQuantity || !selectedProduct.selectedSize) {
        Swal.fire({
            title: "Something's missing",
            text: "Please pick a size and number to add to your cart. Thanks!",
            icon: "warning",
            backdrop: `
            rgba(0,0,123,0.4)
            `,
          });
    } else if (selectedProduct) {
        let productName = selectedProduct.name;
        let productPrice = selectedProduct.price;
        let selectedSize = selectedProduct.selectedSize;
        let selectedType = selectedProduct.type;
        let selectedQuantity = selectedProduct.selectedQuantity;
        let productId = (selectedProduct.lineId + selectedSize);
        let lineId = (selectedProduct.lineId);
        const cartPriceToAdd = productPrice * selectedQuantity;
        cart.push({productName, productPrice, selectedSize, selectedType, selectedQuantity, productId, lineId, cartPriceToAdd});

        const cartPriceTotal = cart.reduce((sum, item) => sum + item.cartPriceToAdd, 0);

        let cartMessage = `
            ${selectedQuantity} of ${productName}: ${selectedType}, ${selectedSize} have been added to your cart.
            <br><b>Your total: €${cartPriceTotal}</b>
        `;
        document.getElementById("emptyCart").innerHTML = cartMessage;

        let checkoutButton = document.getElementById("checkoutButton");
        if (!checkoutButton) {
            checkoutButton = document.createElement("div");
            checkoutButton.id = "checkoutButton";
            checkoutButton.innerHTML = `
            <button type="button" class="btn btn-danger">Checkout or edit cart
            `;
            document.getElementById("cart").appendChild(checkoutButton);
            checkoutButton.addEventListener("click", openCheckout);
        } saveCartToLocalStorage();
    } else {
        alert("Product not found!");
    }
}
let addToCartBtn = document.querySelectorAll(".addToCart");
addToCartBtn.forEach(button => {
    button.addEventListener("click", addToCart);
});

if (cart.length > 0) {
    showCart();
}
function showCart() {
    let div = document.createElement("div");
    div.id = "emptyCart";
    document.getElementById("cart").appendChild(div);
    document.getElementById("emptyCart").innerHTML = `You have items in your cart.`
    let checkoutButton = document.getElementById("checkoutButton");
        if (!checkoutButton) {
            checkoutButton = document.createElement("div");
            checkoutButton.id = "checkoutButton";
            checkoutButton.innerHTML = `
            <button type="button" class="btn btn-danger">Checkout or edit cart
            `;
            document.getElementById("cart").appendChild(checkoutButton);
            checkoutButton.addEventListener("click", openCheckout);
        }
}
// const cartJSON = JSON.stringify(cart);
// localStorage.setItem("userCart", cartJSON);

// OPEN + POPULATE CHECKOUT WINDOW
function openCheckout (e) {
    let div = document.createElement("div");
    div.id = "checkoutWindow";
    div.className = "checkoutWindow";
    document.body.appendChild(div);

    let header = document.createElement("div");
    header.id = "checkoutHeader";
    header.className = "header";
    div.appendChild(header);
    header.innerHTML = 
    `<i class="fa-solid fa-x closeCheckout" id="closeCheckout"></i>
    <img src="./assets/images/horizontalLogo2.png" alt="Pixel Pride logo - Pixel Pride spelled in pink pixels, with a pixel rainbow sprouting from the name" id="checkoutLogo">
    <h1>Your cart</h1>`;

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
            if (item.selectedType === "shirt" || item.selectedType === "hoodie") {
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
                        <button class="btn" id="itemPriceTotal${item.productId}">
                            Item price total:  <b>€${item.cartPriceToAdd}</b>
                        </button>
                        <i class="fa-solid fa-trash removeIcon" id="removeBtn${item.productId}"></i>
                    </div>
                    `;
            } else if (item.selectedType === "art") {
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
                                <li><a class="dropdown-item sizeOptionRev" href="#">S</a></li>
                                <li><a class="dropdown-item sizeOptionRev" href="#">M</a></li>
                                <li><a class="dropdown-item sizeOptionRev" href="#">L</a></li>
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
                        <button class="btn" id="itemPriceTotal${item.productId}">
                            Item price total:  <b>€${item.cartPriceToAdd}</b>
                        </button>
                        <i class="fa-solid fa-trash removeIcon" id="removeBtn${item.productId}"></i>
                    </div>
                `
            }
        });
        main.innerHTML += `<b class="cartTotal">Your total = €${totalSum}</b>
        <div class="checkoutBtnContainer">
            <button type="button" class="btn btn-secondary finalCheckout" id="finalCheckout">Checkout</button>
            <button type="button" class="btn btn-danger clearCart">Clear cart</button>
        </div>
        `;
    }
}

//BUTTON LISTENERS
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
    } else if (event.target.classList.contains("clearCart")) {
        clearCart (event.target);
    }
});

function clearCart () {
    cart.length = 0;
    openCheckout ();
    document.getElementById("emptyCart").innerText = 'Your cart is empty';
    saveCartToLocalStorage();
}

function sizeRevision (element) {
    const sizeRevisionElement = element.closest('.cartItem').querySelector('[id^="sizeRevision"]');
    const productId = sizeRevisionElement.id.replace('sizeRevision', '');
    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        let replacementSize = element.innerText;
        sizeRevisionElement.innerText = "Size: " + replacementSize;
        cartItem.selectedSize = replacementSize;
        cartItem.productId
    }
    let replacementSize = element.innerText;
    sizeRevisionElement.innerText = "Size: " + replacementSize;
    
    cartItem.selectedSize = replacementSize;
    cartItem.productId = cartItem.lineId + replacementSize;
    saveCartToLocalStorage();
}

function quantityRevision (element, item) {
    const quantityRevisionElement = element.closest('.cartItem').querySelector('[id^="quantityRevision"]');
    let productId = quantityRevisionElement.id.match(/\w+/).toString();
    let idPrefix = productId.replace('quantityRevision','');
    let cartItem = cart.find(item => item.lineId === idPrefix);
    const oldQuantity = parseFloat(quantityRevisionElement.innerText.replace('Quantity: ', ''));
    let replacementQuantity = parseFloat(element.innerText);
    quantityRevisionElement.innerText = "Quantity: " + replacementQuantity;

    const itemPriceRevisionElement = element.closest('.cartItem').querySelector('[id^="itemPriceTotal"]');
    const oldPriceTotalText = (itemPriceRevisionElement.querySelector('b').innerText);
    const oldPriceTotal = parseFloat(oldPriceTotalText.replace('€', ''));
    const newItemPriceTotal = oldPriceTotal / oldQuantity * replacementQuantity;
    itemPriceRevisionElement.querySelector('b').innerText = `€${newItemPriceTotal}`;

    cartItem.selectedQuantity = replacementQuantity;
    cartItem.cartPriceToAdd = newItemPriceTotal;

    updateTotal();
    openCheckout();
    saveCartToLocalStorage();
}

function updateTotal() {
    const cartPriceTotal = cart.reduce((sum, item) => sum + item.cartPriceToAdd, 0);
    document.querySelector('.cartTotal').innerText = `Your total = €${cartPriceTotal}`;
    document.getElementById("emptyCart").innerHTML = `Your total = €${cartPriceTotal}`;
}

function finalCheckout () {
    Swal.fire({
        icon: "success",
        title: "Ready to ship",
        text: "But not really because this isn't a real business 😏",
        backdrop: `
            rgba(0,0,123,0.4)
            `,
      });
    updateInventory();
    closeWindow ();
}

function updateInventory() {
    console.log(...[products]);
    console.log(cart);
    let cartInventoryItem = JSON.parse(localStorage.getItem('cart')) || [];
    cartInventoryItem.forEach(cartItem => {
        const matchingProduct = products.find(product => product.id.toLowerCase() === cartItem.productId.toLowerCase());
        if (matchingProduct && typeof matchingProduct.inventory === "number") {
            let quantityToSubtract = parseInt(cartItem.selectedQuantity, 10);
            matchingProduct.inventory -= quantityToSubtract;

            if (matchingProduct.inventory < 0) {
                zeroStock(matchingProduct);
            }
        } else {
            alert("no matching")
        }
    });
    sessionStorage.setItem('products', JSON.stringify(products));
    console.log(products);
}

function zeroStock(matchingProduct) {
    Swal.fire({
        title: "Sorry!",
        text: `We're running low on one of your items. Try lowering the quantity or picking out something else.`,
        icon: "error"
      });
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
    updateTotal();
    openCheckout();
    saveCartToLocalStorage();
}

//FILTER LISTENERS HEADER AND BOXES
document.getElementById("shirtDropdown").addEventListener("click", shirtsOnly);
document.getElementById("hoodieDropdown").addEventListener("click", hoodiesOnly);
document.getElementById("artDropdown").addEventListener("click", artOnly);
document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters);
document.getElementById("shirtSelector").addEventListener("click", shirtsOnly);
document.getElementById("hoodieSelector").addEventListener("click", hoodiesOnly);
document.getElementById("artSelector").addEventListener("click", artOnly);

//FILTERS
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
function matchingTagsOnly (matchingProducts) {
    clearFilters ();
    let productElements = document.querySelectorAll('.productBox');
    productElements.forEach(element => {
        let elementTag = element.classList[2];
        if (matchingProducts.some(product => product.tag.replace(/\s/g, '_').toLowerCase() === elementTag)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

//SEARCH BAR FILTERS
document.getElementById("searchBarBtn").addEventListener("click", function () {
    handleSearch();
});
document.getElementById("productSearch").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        let searchTerm = this.value.trim();
        if (searchTerm !== "") {
            handleSearch();
        }
    }
});

function handleSearch() {
    let searchTerm = document.getElementById("productSearch").value.toLowerCase();
    let displayTerm = searchTerm.toUpperCase();
    let matchingProducts = products.filter(product => {
        return product.tag.toLowerCase().includes(searchTerm);
    });
    if (matchingProducts.length > 0) {
        Swal.fire({
            title: `Our awesome ${displayTerm} swag`,
            showConfirmButton: false,
            timer: 1200,
            backdrop: `
                rgba(0,0,123,0.4)
                `,
        });
       matchingTagsOnly (matchingProducts);
    } else {
        if (searchTerm === "shirt" || searchTerm === "shirts") {
            Swal.fire({
                title: "Showing our lovely shirts",
                showConfirmButton: false,
                timer: 1000,
                backdrop: `
                    rgba(0,0,123,0.4)
                    `,
            });
            shirtsOnly ();
        } else if (searchTerm === "hoodie" || searchTerm === "hoodies") {
            Swal.fire({
                title: "Showing our lovely hoodies",
                showConfirmButton: false,
                timer: 1000,
                backdrop: `
                    rgba(0,0,123,0.4)
                    `,
            });
            hoodiesOnly ();
        } else if (searchTerm === "art" || searchTerm === "arts") {
            Swal.fire({
                title: "Showing our lovely art",
                showConfirmButton: false,
                timer: 1000,
                backdrop: `
                    rgba(0,0,123,0.4)
                    `,
            });
            artOnly ();
        } else {
            Swal.fire({
                title: "Whoops!",
                text: "Doesn't look like that search matches anything.",
                icon: "error",
                backdrop: `
                    rgba(0,0,123,0.4)
                    `,
            });
        }
    }
};