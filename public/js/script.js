const sliderMain = document.querySelector(".sliderMain");
if (sliderMain) {
    const swiper = new Swiper(".sliderMain", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}
