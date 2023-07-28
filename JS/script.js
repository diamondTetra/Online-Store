// Initially display all products
window.onload = () => {
    filterProduct("all");
};

// Navigation
document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body");
    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu-list");
    const menuBtn = document.querySelector(".menu-btn");
    const cancelBtn = document.querySelector(".cancel-btn");

    menuBtn.onclick = () => {
        menu.classList.add("active");
        menuBtn.classList.add("hide");
        cancelBtn.classList.add("show");
        body.classList.add("disabledScroll");
    };

    cancelBtn.onclick = () => {
        menu.classList.remove("active");
        menuBtn.classList.remove("hide");
        cancelBtn.classList.remove("show");
        body.classList.remove("disabledScroll");
    };

    window.onscroll = () => {
        this.scrollY > 20
            ? navbar.classList.add("sticky")
            : navbar.classList.remove("sticky");
    };
});

// Slider
document.addEventListener("DOMContentLoaded", () => {
    let slider = document.querySelector(".slider .list");
    let items = document.querySelectorAll(".slider .list .item");
    let next = document.getElementById("next");
    let prev = document.getElementById("prev");
    let dots = document.querySelectorAll(".slider .dots li");

    let lengthItems = items.length - 1;
    let active = 0;

    next.onclick = function () {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    };

    prev.onclick = function () {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    };

    let refreshInterval = setInterval(() => {
        next.click();
    }, 3000);

    function reloadSlider() {
        slider.style.left = -items[active].offsetLeft + "px";

        let last_active_dot = document.querySelector(".slider .dots li.active");
        last_active_dot.classList.remove("active");
        dots[active].classList.add("active");

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next.click();
        }, 3000);
    }

    dots.forEach((li, key) => {
        li.addEventListener("click", () => {
            active = key;
            reloadSlider();
        });
    });

    window.onresize = function (event) {
        reloadSlider();
    };
});

// Preview Products
document.addEventListener("DOMContentLoaded", () => {
    let preveiwContainer = document.querySelector(".products-preview");
    let previewBox = preveiwContainer.querySelectorAll(".preview");

    document
        .querySelectorAll(".products-container .product")
        .forEach((product) => {
            product.onclick = () => {
                preveiwContainer.style.display = "flex";
                let name = product.getAttribute("data-name");
                previewBox.forEach((preview) => {
                    let target = preview.getAttribute("data-target");
                    if (name == target) {
                        preview.classList.add("active");
                    }
                });
            };
        });

    previewBox.forEach((close) => {
        close.querySelector(".fa-times").onclick = () => {
            close.classList.remove("active");
            preveiwContainer.style.display = "none";
        };
    });
});

// Store information on the text files
window.addEventListener("DOMContentLoaded", () => {
    const clientsParagraph = document.getElementById("clients");
    const displayButton = document.getElementById("displayButton");
    const saveButton = document.getElementById("saveButton");

    displayButton.addEventListener("click", () => {
        fetch("data/clients.txt")
            .then((response) => response.text())
            .then((data) => {
                clientsParagraph.innerHTML = ""; // Clear the existing content

                const lines = data.split("\n");
                lines.forEach((line) => {
                    const [name, age] = line.split(",");

                    const clientSpan = document.createElement("span");
                    clientSpan.textContent = `${name.trim()} - ${age.trim()} years old`;

                    clientsParagraph.appendChild(clientSpan);
                    clientsParagraph.appendChild(document.createElement("br"));
                });
            })
            .catch((error) => console.log("Error:", error));
    });
});

// Filtering products
function filterProduct(value) {
    // Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        // Check if value equals innerText
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // Select all cards
    let elements = document.querySelectorAll(".card");
    // Loop through all cards
    elements.forEach((element) => {
        // Display all cards on 'all' button click
        if (value == "all") {
            element.classList.remove("hide");
        } else {
            // Check if element contains category class
            if (element.classList.contains(value)) {
                // Display element based on category
                element.classList.remove("hide");
            } else {
                // Hide other elements
                element.classList.add("hide");
            }
        }
    });
}

// Search button click
document.getElementById("search").addEventListener("click", () => {
    // Initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");

    // Loop through all elements
    elements.forEach((element, index) => {
        // Check if text includes the search value
        if (element.innerText.includes(searchInput.toUpperCase())) {
            // Display matching card
            cards[index].classList.remove("hide");
        } else {
            // Hide others
            cards[index].classList.add("hide");
        }
    });
});

// Cart
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listcardCart = document.querySelector('.listcardCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('alive');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('alive');
})

let products = [
    {
        id: 1,
        name: 'Toilet Papers',
        image: '2.PNG',
        price: 48
    },
    {
        id: 2,
        name: 'Cleaning Material',
        image: '3.PNG',
        price: 50
    },
    {
        id: 3,
        name: 'Broom',
        image: '4.PNG',
        price: 15
    },
    {
        id: 4,
        name: 'Towels',
        image: '1.PNG',
        price: 10
    },
    {
        id: 5,
        name: 'Toilet Papers',
        image: '2.PNG',
        price: 80
    },
    {
        id: 6,
        name: 'Toilet Cleaning',
        image: '6.PNG',
        price: 10
    }
];
let listcardCarts  = [];

function addTocardCart(key){
    if(listcardCarts[key] == null){
        // copy product form list to list cardCart
        listcardCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listcardCarts[key].quantity = 1;
    }
    reloadcardCart();
}
function reloadcardCart(){
    listcardCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listcardCarts.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/shop/products/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listcardCart.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listcardCarts[key];
    }else{
        listcardCarts[key].quantity = quantity;
        listcardCarts[key].price = quantity * products[key].price;
    }
    reloadcardCart();
}