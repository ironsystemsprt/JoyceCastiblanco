document.addEventListener("DOMContentLoaded", () => {

    const ebookModal = document.getElementById("ebookModal");
    const ebookModalClose = document.getElementById("ebookModalClose");
    const ebookModalOverlay = document.getElementById("ebookModalOverlay");
    const ebookForm = document.getElementById("ebookForm");

    /*
     * ABRIR MODAL EBOOK
     * Se utiliza delegación de eventos para que funcione
     * aunque el enlace tenga href="#".
     */
    document.addEventListener("click", (event) => {

        const ebookButton = event.target.closest("#ebookOpen");

        if (!ebookButton) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (!ebookModal) {
            console.error("No se encontró #ebookModal");
            return;
        }

        ebookModal.classList.add("is-open");
        ebookModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    });


    /*
     * CERRAR MODAL
     */
    function closeEbookModal() {

        if (!ebookModal) {
            return;
        }

        ebookModal.classList.remove("is-open");
        ebookModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }


    /*
     * BOTÓN X
     */
    if (ebookModalClose) {

        ebookModalClose.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            closeEbookModal();
        });
    }


    /*
     * CLIC FUERA DEL MODAL
     */
    if (ebookModalOverlay) {

        ebookModalOverlay.addEventListener("click", () => {

            closeEbookModal();
        });
    }


    /*
     * TECLA ESC
     */
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeEbookModal();
        }
    });


    /*
     * FORMULARIO
     */
    if (ebookForm) {

        ebookForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const nombre = document.getElementById("ebookNombre")?.value.trim();
            const email = document.getElementById("ebookEmail")?.value.trim();
            const institucion = document.getElementById("ebookInstitucion")?.value.trim();
            const tipo = document.getElementById("ebookTipo")?.value;

            if (!nombre || !email || !institucion || !tipo) {
                alert("Por favor completa todos los campos.");
                return;
            }

            alert(
                "Gracias por tu solicitud.\n\n" +
                "Pronto recibirás tu eBook."
            );

            ebookForm.reset();

            closeEbookModal();
        });
    }

});