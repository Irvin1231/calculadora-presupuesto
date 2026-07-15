//Variables globales para almacenar los totales
    let totalmensual = 0;
    let totalanual = 0;
    let presupuestoAnteriorGuardado = 0;
    let topePresupuestoGuardado = 0;


    //Cambio a pesos fuera del las funciones
    const formatoPesos = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
    });
/**
 * Agrega un nuevo servicio como una fila en la tabla de la interfaz.
 */
function agregarServicio(){

    if(notificacion() === false){
        return; // Detiene la ejecución si la notificación devuelve false
    }
    
    //Captura los valores ingresados por el usuario en los campos del formulario
    let servicio = document.getElementById("servicio").value;
    let costo = document.getElementById("costo").value;
    let periodicidad = document.getElementById("periodicidad").value;
    let boton = document.createElement("button");

    // Muestra los datos en la consola del navegador (útil para verificar que se están capturando bien)
    console.log("Servicio", servicio);
    console.log("Costo", costo);
    console.log("Periocidad", periodicidad);
    

    // Obtiene la referencia de la tabla HTML donde se insertarán los datos
    let tabla = document.getElementById("tablaServicios");
    
    // Crea los elementos HTML necesarios: una fila (tr) y tres celdas (td)
    let fila = document.createElement("tr");
    let datoServicio = document.createElement("td");
    let datoCosto = document.createElement("td");
    let datoPeriodicidad = document.createElement("td");
    let costoAnual = document.createElement("td");  
    let botonEliminar = document.createElement("td");
    
    // Asigna el texto capturado del formulario a cada una de las celdas correspondientes
    datoServicio.textContent = servicio;
    datoCosto.textContent = costo;
    datoPeriodicidad.textContent = periodicidad;
    
    
    let totalAnualCalculado;

    if (periodicidad === "mensual") {
        totalAnualCalculado = costo * 12;

    } else {
        totalAnualCalculado  = costo;
    }
    datoCosto.textContent = formatoPesos.format(costo);
    costoAnual.textContent = formatoPesos.format(totalAnualCalculado);

    // Configura el botón de eliminar
    botonEliminar.appendChild(boton);
    boton.textContent = "Eliminar"; 
    boton.addEventListener("click", function() {
    // aquí va lo que 
    fila.remove(); // Elimina la fila de la tabla
    actualizarTotales(); 
    });



    // Introduce las celdas (td) dentro de la fila (tr)
    fila.appendChild(datoServicio);
    fila.appendChild(datoCosto);
    fila.appendChild(datoPeriodicidad);
    fila.appendChild(costoAnual); // Agrega la celda de costo a la fila
    fila.appendChild(botonEliminar); // Agrega la celda del botón a la fila
    



    
    tabla.appendChild(fila);// Inserta los datos a la fila
    actualizarTotales(); // Actualiza los totales después de agregar un nuevo servicio
}
//funcion para calcular totales
function calcularTotalAnual() {

    let tabla = document.getElementById("tablaServicios");
    let sumaAnual = 0;

    let filas = tabla.getElementsByTagName("tr");

    for (let i = 0; i < filas.length; i++) {

        let celda = filas[i].getElementsByTagName("td")[3];

        let valor = Number(
            celda.textContent
                .replace(/\$/g, "")
                .replace(/,/g, "")
                .trim()
        );

        sumaAnual += valor;
    }

    return sumaAnual;
}
function actualizarTotales() {

    
    //Funcion para calcular el total anual y mensual de los servicios agregados a la tabla
    let totalAnual = calcularTotalAnual();
    let totalMensual = totalAnual / 12;
    //obtencion de los valores de presupuesto anterior y tope de presupuesto desde el HTML
    let presupuestoAnterior = presupuestoAnteriorGuardado;
    let topePresupuesto = topePresupuestoGuardado;

    //calculo de los totales considerando el presupuesto anterior y el tope de presupuesto
    document.getElementById("totalMensual").textContent = formatoPesos.format(totalMensual);
    document.getElementById("totalAnual").textContent = formatoPesos.format(totalAnual);

    
    let variacion = presupuestoAnterior - totalAnual;
    let disponible = topePresupuesto - totalAnual;

    // Actualiza el texto y el color del elemento "disponible" según el valor calculado
    if (disponible < 0) {   
        document.getElementById("disponible").textContent = formatoPesos.format(disponible) + " (Sobrepasado)";
        document.getElementById("disponible").style.color = "red"; // Cambia el color del texto a rojo si se sobrepasa el presupuesto
    }else if (disponible === 0) {
        document.getElementById("disponible").textContent = formatoPesos.format(disponible) + " (Límite alcanzado)";
        document.getElementById("disponible").style.color = "orange"; // Cambia el color del texto a naranja si se alcanza el límite
    }else {
        document.getElementById("disponible").textContent = formatoPesos.format(disponible) + " (Disponible)";
        document.getElementById("disponible").style.color = "green"; // Cambia el color del texto a verde si hay presupuesto disponible
    }

    
    // Comparativa con el presupuesto anterior y actualización del texto y color del elemento "variacion" según el valor calculado
    if (variacion === 0) {
        document.getElementById("variacion").textContent = "Presupuestos anuales a la par " + formatoPesos.format(variacion);
        document.getElementById("variacion").style.color = "orange";
    } else if (variacion > 0) {
        document.getElementById("variacion").textContent = "Presupuesto disponible " +  formatoPesos.format(variacion);  ;
        document.getElementById("variacion").style.color = "green";
        
    }else{
        document.getElementById("variacion").textContent = "Te haz sobrepasado del presupuesto anterior por " + formatoPesos.format(Math.abs(variacion));
        document.getElementById("variacion").style.color = "red";
    }

    
}
//Notificaciones
function notificacion() {

    let todoValido = true; // Variable para rastrear si todos los campos son válidos
    

    // Validación de que no se guardo el presupuesto
    if (presupuestoAnteriorGuardado === 0 || topePresupuestoGuardado === 0) {
        alert("Por favor guarda el presupuesto antes de agregar servicios.");
        todoValido = false; //detiene
    }
    
    // Validación de que los campos de servicio y costo no estén vacíos
    if(document.getElementById("servicio").value === "") {
        document.getElementById("errorServicio").textContent = "Por favor ingresa un nombre de servicio para continuar";
        todoValido = false; //detiene
    }else{
        document.getElementById("errorServicio").textContent = "";
    }
    if  (document.getElementById("costo").value === "") {
        document.getElementById("errorCosto").textContent = "Por favor ingresa un costo para continuar";
        todoValido = false; //detiene
    }else{
        document.getElementById("errorCosto").textContent = "";
    }
    // Validación de que los valores no sean negativos o cero
    if(document.getElementById("costo").value <= 0) {
        document.getElementById("errorCosto").textContent = "El costo no puede ser negativo o cero";
        todoValido = false; //detiene
    }
    
    return todoValido; // Devuelve true si todos los campos son válidos, de lo contrario devuelve false
}
function guardarPresupuesto() {

    let presupuestoAnterior = Number(document.getElementById("presupuestoAnterior" ).value);
    let topePresupuesto = Number(document.getElementById("topePresupuesto" ).value);
    let validoPresupuesto = true;

    // Validación de que los campos de presupuesto anterior y tope de presupuesto no estén vacíos
    if (document.getElementById("presupuestoAnterior").value  === "") {
        document.getElementById("errorPresupuestoPasado").textContent = "Por favor ingresa un presupuesto anterior para continuar";
        validoPresupuesto = false; //detiene
    }else{
        document.getElementById("errorPresupuestoPasado").textContent = "";

    }
       if(document.getElementById("topePresupuesto").value === "") {
        document.getElementById("errorTopePresupuesto").textContent = "Por favor ingresa un tope de presupuesto para continuar";
        validoPresupuesto = false; //detiene
    }else{
        document.getElementById("errorTopePresupuesto").textContent = "";
    }
    if(document.getElementById("topePresupuesto").value <= 0) {
        document.getElementById("errorTopePresupuesto").textContent = "El tope de presupuesto no puede ser negativo o cero";
        validoPresupuesto = false; //detiene
    }
    if(document.getElementById("presupuestoAnterior").value <= 0) {
        document.getElementById("errorPresupuestoPasado").textContent = "El presupuesto anterior no puede ser negativo o cero";
        validoPresupuesto = false; //detiene
    }
    // Actualiza los elementos de la interfaz con los valores de presupuesto si son válidos
    if (validoPresupuesto) {
    document.getElementById("guardarPresupuesto").textContent = formatoPesos.format(topePresupuesto);
    document.getElementById("GuardarPresupuestoAnterior").textContent = formatoPesos.format(presupuestoAnterior);

    presupuestoAnteriorGuardado = presupuestoAnterior;
    topePresupuestoGuardado = topePresupuesto;
    }
    return validoPresupuesto; // Devuelve true si todos los campos son válidos, de lo contrario devuelve false
}


