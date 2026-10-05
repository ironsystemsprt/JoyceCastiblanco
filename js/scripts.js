document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        alert("Gracias por contactarnos. Pronto nos comunicaremos contigo.");

        form.reset();

    });

});