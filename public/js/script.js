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

// Show Quantity Tour In Mini-Cart
const showMiniCart = () => {
    const miniCart = document.querySelector("[mini-cart]");
    if (miniCart) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        miniCart.innerHTML = cart.length;
    }
};
showMiniCart();
// End Show Quantity Tour In Mini-Cart

// alert-add-cart-success
const alertAddCartSuccess = () => {
    const elementAlert = document.querySelector("[alert-add-cart-success]");
    if (elementAlert) {
        elementAlert.classList.remove("alert-hidden");

        setTimeout(() => {
            elementAlert.classList.add("alert-hidden");
        }, 4000);
    }
};
// End alert-add-cart-success

// Add Tour into Cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
    formAddToCart.addEventListener("submit", (e) => {
        e.preventDefault();

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
            showMiniCart();
            alertAddCartSuccess();
        }
    });
}

/* End Cart */

/* Table Cart */
// Function Draw Cart
const drawCart = () => {
    const tableCart = document.querySelector("[table-cart]");
    if (tableCart) {
        fetch("/cart/list-json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: localStorage.getItem("cart"),
        })
            .then((res) => res.json())
            .then((data) => {
                const htmlArray = data.cart.map(
                    (item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>
                  <img 
                    src="${item.infoTour.image}" 
                    alt="${item.infoTour.title}" 
                    width="80px"
                  >
                </td>
                <td>
                  <a href="/tours/detail/${item.infoTour.slug}">
                    ${item.infoTour.title}
                  </a>
                </td>
                <td>${item.infoTour.price_special.toLocaleString()}đ</td>
                <td>
                  <input 
                    type="number" 
                    name="quantity" 
                    value="${item.quantity}" 
                    min="1" 
                    item-id="${item.id}" 
                    style="width: 60px"
                  >
                </td>
                <td>${item.infoTour.total.toLocaleString()}đ</td>
                <td>
                  <button 
                    class="btn btn-sm btn-danger" 
                    btn-delete="${item.id}"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
          `
                );

                const tbody = tableCart.querySelector("tbody");
                tbody.innerHTML = htmlArray.join("");

                const elementTotalPrice =
                    document.querySelector("[total-price]");
                elementTotalPrice.innerHTML = data.total.toLocaleString();

                deleteItemInCart();

                updateQuantityInCart();

                showMiniCart();
            });
    }
};
// End Function Draw Cart

// Delete Tour In Cart

const deleteItemInCart = () => {
    const listBtnDelete = document.querySelectorAll("[btn-delete]");

    if (listBtnDelete.length > 0) {
        listBtnDelete.forEach((button) => {
            button.addEventListener("click", () => {
                const tourId = button.getAttribute("btn-delete");
                const cart = JSON.parse(localStorage.getItem("cart"));
                const newCart = cart.filter((item) => item.tourId != tourId);
                localStorage.setItem("cart", JSON.stringify(newCart));

                drawCart();
            });
        });
    }
};
// End Delete Tour In Cart

// Cập nhật số lượng trong giỏ hàng
const updateQuantityInCart = () => {
    const listInputQuantity = document.querySelectorAll(
        "input[name='quantity']"
    );
    if (listInputQuantity.length > 0) {
        listInputQuantity.forEach((input) => {
            input.addEventListener("change", () => {
                const quantity = input.value;
                const tourId = input.getAttribute("item-id");

                const cart = JSON.parse(localStorage.getItem("cart"));
                const tourUpdate = cart.find((item) => item.tourId == tourId);
                if (tourUpdate) {
                    tourUpdate.quantity = quantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    drawCart();
                }
            });
        });
    }
};
// Hết Cập nhật số lượng trong giỏ hàng

// Show DatA In Cart
drawCart();
// End Show DatA In Cart

/* End Table Cart */
