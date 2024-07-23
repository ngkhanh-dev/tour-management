const sliderMain = document.querySelector(".sliderMain");
if (sliderMain) {
    const swiper = new Swiper(".sliderMain", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

/* Cart */

// Initial Cart
const cart = localStorage.getItem("cart");
if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// Add Tour into Cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
    formAddToCart.addEventListener("submit", (e) => {
        e.preventDefault;

        const quantity = parseInt(formAddToCart.quantity.value);
        const tourId = parseInt(formAddToCart.getAttribute("tour-id"));

        if (quantity > 0 && tourId) {
            const cart = JSON.parse(localStorage.getItem("cart"));

            const indexExistTour = cart.findIndex(
                (item) => item.tourId == tourId
            );

            if (indexExistTour == -1) {
                cart.push({
                    tourId: tourId,
                    quantity: quantity,
                });
            } else {
                cart[indexExistTour].quantity =
                    cart[indexExistTour].quantity + quantity;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });
}

/* End Cart */
