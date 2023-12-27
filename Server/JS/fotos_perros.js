document.addEventListener("DOMContentLoaded", function () {
    // Obtener el contenedor de imágenes
    const imagenContainer = document.getElementById("imagen-container");

    // Hacer el fetch a la API
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta es válida
            if (data.status === "success") {
                // Obtener la URL de la imagen
                const imageUrl = data.message;

                // Crear un elemento de imagen y establecer la fuente
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Perro";

                // Agregar la imagen al contenedor
                imagenContainer.appendChild(img);
            } else {
                // Mostrar un mensaje de error si la respuesta no es válida
                imagenContainer.textContent = "Error al cargar la imagen";
            }
        })
        .catch(error => {
            // Manejar errores de red u otros errores
            console.error("Error:", error);
            imagenContainer.textContent = "Error al cargar la imagen";
        });
});
