window.onload = inicio;

function inicio() {

    document.getElementById("btnInsertar").addEventListener("click", insertarCiudades);

    document.getElementById("btnEliminar").addEventListener("click", eliminarCiudades);


}

function insertarCiudades() {
    console.log("Entro en insertar Ciudades");

    var id = document.getElementById("_id").value;
    var nombre = document.querySelector("#_nombre").value;
    var poblacion = document.querySelector("#_poblacion").value;
    var densidad = document.querySelector("#_densidad").value;
    var extension = document.querySelector("#_superficie").value;

    $.ajax({
        url: "http://moralo.atwebpages.com/menuAjax/ciudades/insertarCiudades.php",
        type: "POST",
        data: {
            id: id,
            nombre: nombre,
            poblacion: poblacion,
            densidad: densidad,
            extension: extension
        }
    });

    mostrar();
}

function mostrar() {
    let cajaMostrarContenido = document.querySelector("#mostrarCiudades");

    let bloqueHtml = document.createElement("div");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = cargar;

    function cargar() {
        if (this.readyState == 4 && this.status == 200) {
            var objeto = JSON.parse(this.responseText);
            objeto.forEach(recorrer);

            function recorrer(datos, index) {
                bloqueHtml.innerHTML += "<div class='row'>" +
                    "<div class='col-lg-2'>" + datos.id + "</div>" +
                    "<div class='col-lg-2'>" + datos.nombre + "</div>" +
                    "<div class='col-lg-2'>" + datos.poblacion + "</div>" +
                    "<div class='col-lg-2'>" + datos.densidad + "</div>" +
                    "<div class='col-lg-2'>" + datos.extension + "</div>" +
                    "</div>";
            }
            cajaMostrarContenido.appendChild(bloqueHtml);
        }
    }

    xhr.open("POST", "http://moralo.atwebpages.com/menuAjax/ciudades/getCiudades.php", true);
    xhr.send();

}

function eliminarCiudades() {
    console.log("Entro en Eliminar Ciudades");

    var id = document.getElementById("_id").value;


    $.ajax({
        url: "http://moralo.atwebpages.com/menuAjax/ciudades/EliminarCiudades.php",
        type: "GET",
        data: {
            id: id
        },
    });

}