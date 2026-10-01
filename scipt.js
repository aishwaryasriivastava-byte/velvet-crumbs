/* =====================================================
   VELVET CRUMBS - PREMIUM CAKE SHOP
   Complete JavaScript
===================================================== */


/* =====================================================
   1. CAKE DATA - ONLY 13 MATCHING IMAGES
===================================================== */

const cakes = [
    {
        id: 1,
        name: "Blueberry Bliss",
        price: 849,
        category: "designer",
        badge: "NEW",
        description: "A delightful blueberry cake for special moments.",
        image: "images/Blueberry Bliss.jpeg"
    },
    {
        id: 2,
        name: "Chocolate Truffle Cake",
        price: 699,
        category: "chocolate",
        badge: "BESTSELLER",
        description: "Rich chocolate layers with silky truffle cream.",
        image: "images/Chocolate Truffle.jpeg"
    },
    {
        id: 3,
        name: "Classic Vanilla Cake",
        price: 549,
        category: "birthday",
        badge: "CLASSIC",
        description: "Soft vanilla sponge with smooth cream frosting.",
        image: "images/Classic Vanilla.jpeg"
    },
    {
        id: 4,
        name: "Coffee Mocha Cake",
        price: 799,
        category: "chocolate",
        badge: "FAVOURITE",
        description: "Coffee flavour blended with delicious cream.",
        image: "images/Coffee Mocha.jpeg"
    },
    {
        id: 5,
        name: "Ferrero Rocher Cake",
        price: 1099,
        category: "chocolate",
        badge: "PREMIUM",
        description: "Chocolate and hazelnut inspired celebration cake.",
        image: "images/Ferrero Rocher.jpeg"
    },
    {
        id: 6,
        name: "Heart Love Cake",
        price: 899,
        category: "designer",
        badge: "SPECIAL",
        description: "A heart-shaped cake for memorable occasions.",
        image: "images/Heart Love.jpeg"
    },
    {
        id: 7,
        name: "Lotus Biscoff Cake",
        price: 999,
        category: "chocolate",
        badge: "TRENDING",
        description: "Creamy cake inspired by caramel biscuit flavours.",
        image: "images/Lotus Biscoff.jpeg"
    },
    {
        id: 8,
        name: "Mango Cream Cake",
        price: 749,
        category: "birthday",
        badge: "SEASONAL",
        description: "A fruity mango cake with smooth cream.",
        image: "images/Mango Cream.jpeg"
    },
    {
        id: 9,
        name: "Oreo Crunch Cake",
        price: 749,
        category: "chocolate",
        badge: "POPULAR",
        description: "Chocolate cake with a delicious Oreo-inspired flavour.",
        image: "images/Oreo Crunch.jpeg"
    },
    {
        id: 10,
        name: "Pink Blossom Cake",
        price: 999,
        category: "designer",
        badge: "PREMIUM",
        description: "A beautifully decorated cake for elegant celebrations.",
        image: "images/Pink Blossom.jpeg"
    },
    {
        id: 11,
        name: "Rainbow Unicorn Cake",
        price: 1199,
        category: "birthday",
        badge: "KIDS FAVOURITE",
        description: "A colourful celebration cake for kids.",
        image: "images/Rainbow Unicorn.jpeg"
    },
    {
        id: 12,
        name: "Red Velvet Dream",
        price: 799,
        category: "red-velvet",
        badge: "PREMIUM",
        description: "Classic red velvet flavour with creamy frosting.",
        image: "images/Red Velvet.jpeg"
    },
    {
        id: 13,
        name: "Strawberry Rose Cake",
        price: 899,
        category: "designer",
        badge: "NEW",
        description: "A strawberry-inspired cake with a delicate design.",
        image: "images/Strawberry Rose.jpeg"
    }
];


/* =====================================================
   2. ELEMENTS
===================================================== */

const cakeGrid = document.getElementById("cakeGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const searchResult = document.getElementById("searchResult");
const categoriesContainer = document.getElementById("categories");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

const themeBtn = document.getElementById("themeBtn");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

const customForm = document.getElementById("customForm");
const contactForm = document.getElementById("contactForm");

const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxImage = document.getElementById("lightboxImage");

const toast = document.getElementById("toast");


/* =====================================================
   3. CART DATA
===================================================== */

let cart = [];
let activeCategory = "all";
let searchTerm = "";


/* =====================================================
   4. HELPER FUNCTIONS
===================================================== */

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}


function getCakeById(id) {
    return cakes.find(cake => cake.id === Number(id));
}


function showToast(message) {

    if (!toast) {
        alert(message);
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =====================================================
   5. DISPLAY CAKES
===================================================== */

function displayCakes() {

    if (!cakeGrid) return;

    const filteredCakes = cakes.filter(cake => {

        const matchesCategory =
            activeCategory === "all" ||
            cake.category === activeCategory;

        const matchesSearch =
            cake.name.toLowerCase().includes(searchTerm) ||
            cake.category.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });


    if (searchResult) {

        searchResult.textContent =
            `${filteredCakes.length} cake${filteredCakes.length !== 1 ? "s" : ""} found`;
    }


    if (filteredCakes.length === 0) {

        cakeGrid.innerHTML = `
            <div class="no-results">
                <h3>No cakes found 🍰</h3>
                <p>Try another cake name or category.</p>
            </div>
        `;

        return;
    }


    cakeGrid.innerHTML = filteredCakes.map(cake => `

        <article class="cake-card">

            <div class="cake-image-wrapper">

                <img
                    src="${cake.image}"
                    alt="${cake.name}"
                    class="cake-image"
                    loading="lazy"
                >

                <span class="cake-badge">
                    ${cake.badge}
                </span>

            </div>


            <div class="cake-info">

                <h3>${cake.name}</h3>

                <p>${cake.description}</p>


                <div class="cake-bottom">

                    <span class="cake-price">
                        ${formatPrice(cake.price)}
                    </span>


                    <button
                        class="order-btn"
                        type="button"
                        data-add-cart="${cake.id}"
                    >
                        + Add
                    </button>

                </div>

            </div>

        </article>

    `).join("");


    /* Missing image handling */

    cakeGrid.querySelectorAll(".cake-image").forEach(img => {

        img.addEventListener("error", function () {

            this.alt = "Image not found: " + this.alt;

            this.style.visibility = "hidden";

            this.parentElement.style.background = "#f1e2d8";

        }, { once: true });

    });
}


/* =====================================================
   6. SEARCH
===================================================== */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        searchTerm =
            this.value.trim().toLowerCase();

        displayCakes();

    });
}


if (clearSearch) {

    clearSearch.addEventListener("click", function () {

        if (searchInput) {
            searchInput.value = "";
        }

        searchTerm = "";

        displayCakes();

        if (searchInput) {
            searchInput.focus();
        }

    });
}


/* =====================================================
   7. CATEGORY FILTER
===================================================== */

if (categoriesContainer) {

    categoriesContainer.addEventListener("click", function (event) {

        const button =
            event.target.closest(".category-btn");

        if (!button) return;


        activeCategory =
            button.dataset.category ||
            button.dataset.filter ||
            "all";


        categoriesContainer
            .querySelectorAll(".category-btn")
            .forEach(btn => {
                btn.classList.remove("active");
            });


        button.classList.add("active");


        displayCakes();

    });
}


/* =====================================================
   8. ADD TO CART
===================================================== */

function addToCart(id) {

    const cake = getCakeById(id);


    if (!cake) {

        showToast(
            "Sorry, this cake was not found."
        );

        return;
    }


    const existingItem =
        cart.find(item => item.id === cake.id);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...cake,
            quantity: 1
        });

    }


    updateCart();


    showToast(
        cake.name + " added to cart! 🍰"
    );
}


/* Cake card buttons */

if (cakeGrid) {

    cakeGrid.addEventListener("click", function (event) {

        const button =
            event.target.closest("[data-add-cart]");


        if (!button) return;


        addToCart(
            button.dataset.addCart
        );

    });
}


/* =====================================================
   9. UPDATE CART
===================================================== */

function updateCart() {

    /* Total quantity */

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    /* Total price */

    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    /* Cart count */

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    /* Cart total */

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(totalPrice);

    }


    /* Empty cart */

    if (emptyCart) {

        emptyCart.style.display =
            cart.length === 0
                ? "block"
                : "none";

    }


    /* Checkout button */

    if (checkoutButton) {

        checkoutButton.disabled =
            cart.length === 0;

        checkoutButton.style.opacity =
            cart.length === 0
                ? "0.5"
                : "1";

    }


    /* Cart items */

    if (cartItems) {

        cartItems
            .querySelectorAll(".cart-item")
            .forEach(item => item.remove());


        cart.forEach(item => {

            const row =
                document.createElement("div");


            row.className =
                "cart-item";


            row.innerHTML = `

                <!-- SMALL CART IMAGE -->

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-image"
                >


                <!-- CAKE INFORMATION -->

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>


                    <p>
                        ${formatPrice(
                            item.price * item.quantity
                        )}
                    </p>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            data-cart-action="decrease"
                            data-id="${item.id}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            data-cart-action="increase"
                            data-id="${item.id}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- REMOVE BUTTON -->

                <button
                    type="button"
                    class="remove-btn"
                    data-cart-action="remove"
                    data-id="${item.id}"
                    aria-label="Remove ${item.name}"
                >
                    ×
                </button>

            `;


            cartItems.appendChild(row);

        });

    }


    updateCheckoutSummary();
}


/* =====================================================
   10. CART QUANTITY / REMOVE
===================================================== */

if (cartItems) {

    cartItems.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-cart-action]"
                );


            if (!button) return;


            const id =
                Number(button.dataset.id);


            const action =
                button.dataset.cartAction;


            const item =
                cart.find(
                    cake => cake.id === id
                );


            if (!item) return;


            /* Increase */

            if (action === "increase") {

                item.quantity++;

            }


            /* Decrease */

            if (action === "decrease") {

                item.quantity--;


                if (item.quantity <= 0) {

                    cart =
                        cart.filter(
                            cake =>
                                cake.id !== id
                        );

                }

            }


            /* Remove */

            if (action === "remove") {

                cart =
                    cart.filter(
                        cake =>
                            cake.id !== id
                    );

            }


            updateCart();

        }
    );
}


/* =====================================================
   11. OPEN / CLOSE CART
===================================================== */

function openCart() {

    if (cartPanel) {
        cartPanel.classList.add("active");
    }


    if (cartOverlay) {
        cartOverlay.classList.add("active");
    }


    document.body.classList.add("cart-open");
}


function hideCart() {

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }


    if (cartOverlay) {
        cartOverlay.classList.remove("active");
    }


    document.body.classList.remove("cart-open");
}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        hideCart
    );

}


/* Overlay click */

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        function (event) {

            if (event.target === cartOverlay) {
                hideCart();
            }

        }
    );

}


/* =====================================================
   12. CHECKOUT SUMMARY
===================================================== */

function updateCheckoutSummary() {

    if (checkoutItems) {

        checkoutItems.innerHTML =
            cart.map(item => `

                <div class="checkout-item">

                    <span>
                        ${item.name} × ${item.quantity}
                    </span>

                    <strong>
                        ${formatPrice(
                            item.price * item.quantity
                        )}
                    </strong>

                </div>

            `).join("");

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatPrice(total);

    }
}


/* =====================================================
   13. CHECKOUT MODAL
===================================================== */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                showToast(
                    "Please add a cake first."
                );

                return;
            }


            updateCheckoutSummary();


            hideCart();


            if (checkoutModal) {

                checkoutModal.classList.add(
                    "active"
                );

            }

        }
    );

}


function closeCheckoutModal() {

    if (checkoutModal) {

        checkoutModal.classList.remove(
            "active"
        );

    }
}


if (closeCheckout) {

    closeCheckout.addEventListener(
        "click",
        closeCheckoutModal
    );

}


if (checkoutModal) {

    checkoutModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === checkoutModal
            ) {

                closeCheckoutModal();

            }

        }
    );

}


/* =====================================================
   14. WHATSAPP ORDER
===================================================== */

/*
   IMPORTANT:
   Your WhatsApp number:
   6289263336

   India country code = 91

   So use:
   916289263336

   No + sign
   No spaces
*/

const WHATSAPP_NUMBER =
    "916289263336";


function openWhatsApp(message) {

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =====================================================
   15. BUILD ORDER MESSAGE
===================================================== */

function buildOrderMessage(details) {

    const cakeLines =
        cart.map(item =>

            `${item.name} x ${item.quantity} = ${formatPrice(
                item.price * item.quantity
            )}`

        ).join("\n");


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    return `

Hello Velvet Crumbs! 🎂

I would like to place an order.

${cakeLines}

Total: ${formatPrice(total)}

Name: ${details.name}
Phone: ${details.phone}
Email: ${details.email || "Not provided"}
Address: ${details.address}
Delivery date: ${details.date || "To be confirmed"}

Additional note: ${details.note || "None"}

Please confirm my order. Thank you!

    `.trim();
}


/* =====================================================
   16. CHECKOUT FORM
===================================================== */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (cart.length === 0) {

                showToast(
                    "Your cart is empty."
                );

                return;
            }


            const name =
                document
                    .getElementById("orderName")
                    ?.value.trim() || "";


            const phone =
                document
                    .getElementById("orderPhone")
                    ?.value.trim() || "";


            const email =
                document
                    .getElementById("orderEmail")
                    ?.value.trim() || "";


            const address =
                document
                    .getElementById("orderAddress")
                    ?.value.trim() || "";


            const date =
                document
                    .getElementById("deliveryDate")
                    ?.value || "";


            const note =
                document
                    .getElementById("orderNote")
                    ?.value.trim() || "";


            if (!name || !phone || !address) {

                showToast(
                    "Please fill in all required details."
                );

                return;
            }


            const message =
                buildOrderMessage({
                    name,
                    phone,
                    email,
                    address,
                    date,
                    note
                });


            openWhatsApp(message);


            closeCheckoutModal();


            showToast(
                "WhatsApp opened. Send the message to confirm."
            );

        }
    );
}


/* =====================================================
   17. TODAY'S SPECIAL
===================================================== */

window.addToCart =
    addToCart;


/* =====================================================
   18. CUSTOM CAKE ORDER
===================================================== */

if (customForm) {

    customForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("customName")
                    ?.value.trim() || "";


            const phone =
                document
                    .getElementById("customPhone")
                    ?.value.trim() || "";


            const flavour =
                document
                    .getElementById("customFlavour")
                    ?.value || "";


            const size =
                document
                    .getElementById("customSize")
                    ?.value || "";


            const date =
                document
                    .getElementById("customDate")
                    ?.value || "";


            const message =
                document
                    .getElementById("customMessage")
                    ?.value.trim() || "";


            const whatsappMessage = `

Hello Velvet Crumbs! 🎂

I want to order a custom cake.

Name: ${name}
Phone: ${phone}
Flavour: ${flavour}
Size: ${size}
Required date: ${date}
Design details: ${message || "Please contact me to discuss."}

Please share the details and price.

            `.trim();


            openWhatsApp(
                whatsappMessage
            );


            showToast(
                "Custom cake request prepared!"
            );

        }
    );
}


/* =====================================================
   19. CONTACT FORM
===================================================== */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            showToast(
                "Thank you for contacting Velvet Crumbs! ❤️"
            );


            contactForm.reset();

        }
    );
}


/* =====================================================
   20. DARK MODE
===================================================== */

function setTheme(isDark) {

    document.body.classList.toggle(
        "dark-mode",
        isDark
    );


    if (themeBtn) {

        themeBtn.textContent =
            isDark ? "☀️" : "🌙";


        themeBtn.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }
}


let savedTheme = false;


try {

    savedTheme =
        localStorage.getItem(
            "velvetCrumbsDarkMode"
        ) === "true";

} catch (error) {

    savedTheme = false;

}


setTheme(savedTheme);


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {

            const isDark =
                !document.body.classList.contains(
                    "dark-mode"
                );


            setTheme(isDark);


            try {

                localStorage.setItem(
                    "velvetCrumbsDarkMode",
                    String(isDark)
                );

            } catch (error) {

                // Storage unavailable.

            }

        }
    );

}


/* =====================================================
   21. MOBILE HAMBURGER MENU
===================================================== */

if (hamburger && navLinks) {

    hamburger.addEventListener(
        "click",
        function () {

            const isOpen =
                navLinks.classList.toggle(
                    "active"
                );


            hamburger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            hamburger.textContent =
                isOpen ? "✕" : "☰";

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "active"
                    );


                    hamburger.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    hamburger.textContent =
                        "☰";

                }
            );

        });


    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                hamburger.contains(event.target);


            if (!clickedInsideMenu) {

                navLinks.classList.remove(
                    "active"
                );


                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );


                hamburger.textContent =
                    "☰";

            }

        }
    );

}


/* =====================================================
   22. GALLERY LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-grid img"
    );


galleryImages.forEach(img => {

    img.style.cursor = "pointer";


    img.addEventListener(
        "click",
        function () {

            if (
                !lightbox ||
                !lightboxImage
            ) {
                return;
            }


            lightboxImage.src =
                img.src;


            lightboxImage.alt =
                img.alt ||
                "Cake gallery image";


            lightbox.classList.add(
                "active"
            );

        }
    );

});


function closeImageLightbox() {

    if (lightbox) {

        lightbox.classList.remove(
            "active"
        );

    }
}


if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closeImageLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeImageLightbox();

            }

        }
    );

}


/* =====================================================
   23. KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            hideCart();

            closeCheckoutModal();

            closeImageLightbox();


            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }


            if (hamburger) {

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );


                hamburger.textContent =
                    "☰";

            }

        }

    }
);


/* =====================================================
   24. SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =====================================================
   25. INITIALIZE WEBSITE
===================================================== */

displayCakes();

updateCart();


console.log(
    "Velvet Crumbs website loaded successfully!"
);

console.log(
    "Total matching cake images:",
    cakes.length
);