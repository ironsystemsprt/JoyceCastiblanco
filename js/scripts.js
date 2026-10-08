document.addEventListener("DOMContentLoaded", () => {
// ==========================================
// CONFIGURACIÓN EMAILJS
// ==========================================
const EMAILJS_SERVICE_ID = "service_zkakfxy";
const EMAILJS_PUBLIC_KEY = "PXlXiRUIToILpBcrg";


// Plantilla del formulario ¿Hablemos?
const EMAILJS_CONTACT_TEMPLATE_ID = "template_dp2lo3p";

// Plantilla del formulario de solicitud de eBook
const EMAILJS_EBOOK_TEMPLATE_ID = "template_r3b1ipf";

// Inicializar EmailJS
if (typeof emailjs === "undefined") {
    console.error("EmailJS no está cargado. Revisa el HTML.");
    alert("No se pudo cargar el servicio de envío. Recarga la página.");
    return;
}

emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});

// ==========================================
// ELEMENTOS DEL MODAL EBOOK
// ==========================================
const ebookModal = document.getElementById("ebookModal");
const ebookModalClose = document.getElementById("ebookModalClose");
const ebookModalOverlay = document.getElementById("ebookModalOverlay");
const ebookForm = document.getElementById("ebookForm");
const ebookOpen = document.getElementById("ebookOpen");

// ==========================================
// ABRIR MODAL EBOOK
// ==========================================
if (ebookOpen && ebookModal) {
    ebookOpen.addEventListener("click", (event) => {
        event.preventDefault();

        ebookModal.classList.add("is-open");
        ebookModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    });
}

// ==========================================
// CERRAR MODAL EBOOK
// ==========================================
function closeEbookModal() {
    if (!ebookModal) return;

    ebookModal.classList.remove("is-open");
    ebookModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

if (ebookModalClose) {
    ebookModalClose.addEventListener("click", (event) => {
        event.preventDefault();
        closeEbookModal();
    });
}

if (ebookModalOverlay) {
    ebookModalOverlay.addEventListener("click", closeEbookModal);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeEbookModal();
    }
});

// ==========================================
// BLOQUEAR BOTÓN DURANTE EL ENVÍO
// ==========================================
function setButtonLoading(button, loading, originalText) {
    if (!button) return;

    button.disabled = loading;
    button.textContent = loading ? "Enviando..." : originalText;
}

// ==========================================
// FORMULARIO DE CONTACTO: ¿HABLEMOS?
// ==========================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const contactButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    const contactButtonText = contactButton
        ? contactButton.textContent
        : "Enviar mensaje";

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        setButtonLoading(
            contactButton,
            true,
            contactButtonText
        );

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_CONTACT_TEMPLATE_ID,
                contactForm
            );

            alert(
                "¡Mensaje enviado correctamente!\n\n" +
                "Gracias por contactarnos. Te responderemos pronto."
            );

            contactForm.reset();

        } catch (error) {
            console.error(
                "Error al enviar el formulario de contacto:",
                error
            );

            alert(
                "No fue posible enviar tu mensaje.\n\n" +
                "Revisa la conexión y la configuración de EmailJS."
            );

        } finally {
            setButtonLoading(
                contactButton,
                false,
                contactButtonText
            );
        }
    });
}

// ==========================================
// FORMULARIO DE SOLICITUD DE EBOOK
// ==========================================
if (ebookForm) {
    const ebookButton = ebookForm.querySelector(
        'button[type="submit"]'
    );

    const ebookButtonText = ebookButton
        ? ebookButton.textContent
        : "Solicitar eBook";

    ebookForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!ebookForm.reportValidity()) return;

        setButtonLoading(
            ebookButton,
            true,
            ebookButtonText
        );

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_EBOOK_TEMPLATE_ID,
                ebookForm
            );

            alert(
                "¡Solicitud enviada correctamente!\n\n" +
                "Gracias por tu interés. Hemos recibido tus datos."
            );

            ebookForm.reset();
            closeEbookModal();

        } catch (error) {
            console.error(
                "Error al solicitar el eBook:",
                error
            );

            alert(
                "No fue posible enviar tu solicitud.\n\n" +
                "Inténtalo nuevamente más tarde."
            );

        } finally {
            setButtonLoading(
                ebookButton,
                false,
                ebookButtonText
            );
        }
    });
}


});
