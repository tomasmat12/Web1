document.addEventListener("DOMContentLoaded", function() {

    "use strict";
    let tablaInfoEquipoPreCargada = [
        { colum1: "1", colum2: "Armador", colum3: "Matias Sanchez", colum4: "1,73 m", colum5: "23 años" },
        { colum1: "3", colum2: "Punta Receptor", colum3: "Juan Martinez", colum4: "1,90 m", colum5: "22 años" },
        { colum1: "4", colum2: "Punta Receptor", colum3: "Luciano Palonsky", colum4: "1,98 m", colum5: "20 años" },
        { colum1: "8", colum2: "Central", colum3: "Agustin Loser", colum4: "1,93 m", colum5: "22 años" },
        { colum1: "9", colum2: "Libero", colum3: "Santiago Danani", colum4: "1,76 m", colum5: "24 años" },
        { colum1: "10", colum2: "Punta Receptor", colum3: "Nicolas Lazo", colum4: "1,92 m", colum5: "25 años" },
        { colum1: "12", colum2: "Opuesto", colum3: "Bruno Lima", colum4: "1,98 m", colum5: "24 años" },
        { colum1: "13", colum2: "Punta Receptor", colum3: "Ezequiel Palacios", colum4: "1,98 m", colum5: "27 años" },
        { colum1: "16", colum2: "Armador", colum3: "Matias Giraudo", colum4: "1,96 m", colum5: "22 años" },
        { colum1: "17", colum2: "Central", colum3: "Nicolas Zerba", colum4: "2,03 m", colum5: "20 años" },
        { colum1: "18", colum2: "Central", colum3: "Martin Ramos", colum4: "1,97 m", colum5: "28 años" }
    ];

    let tablaAutocompletar = [{ colum1: "19", colum2: "Punta Receptor", colum3: "Luciano Vicentin", colum4: "1,97 m", colum5: "20 años" },
        { colum1: "21", colum2: "Central", colum3: "Joaquin Gallego", colum4: "2,04 m", colum5: "23 años" },
        { colum1: "22", colum2: "Opuesto", colum3: "German Johansen", colum4: "2,00 m", colum5: "24 años" }
    ];

    const filtroDefault = { "option": "Todas", "value": "All" };
    let arrFiltro = [];
    //arrFiltro.push(filtroDefault);

    // ... Spread lo uso para no tener que recorrer el arrgle para copiar los valores en el
    tablaInfoEquipoPreCargada.push(...tablaAutocompletar);





    function agregarEnTabla(...arrTabla) {


        arrTabla.forEach(elem => {
            document.querySelector(".tablaInfoEquipo").innerHTML += "<tr>" +
                "<td>" + elem.colum1 + "</td>" + "<td>" + elem.colum2 + "</td>" + "<td>" + elem.colum3 + "</td>" +
                "<td>" + elem.colum4 + "</td>" + "<td>" + elem.colum5 + "</td>" + "</tr>";
        });
    }


    function existeEnJsonArray(arr, key, value) {
        for (let elem of arr) {
            if (elem[key] === value) {
                return true;
            }
        }
        return false;
    }

    function agregarEnfiltro(...elem) {
        let filtro = document.querySelector("#filtro");
        let arg = [...elem];
        arg.forEach(element => {
            if (!existeEnJsonArray(arrFiltro, "option", element.colum2)) {
                filtro.innerHTML += `<option value="${element.colum2}"> ${element.colum2} </option>`;
                arrFiltro.push({ "option": element.colum2, "value": element.colum2 });
            }
        });

    }

    function agregarOptionDefaultFiltro() {
        arrFiltro.push(filtroDefault);
        let option = document.createElement("option");
        option.value = filtroDefault.value;
        option.innerHTML = filtroDefault.option;
        document.querySelector("#filtro").appendChild(option);
    }


    function vaciarfiltro() {
        arrFiltro = [];
        document.querySelector("#filtro").innerHTML = "";
        agregarOptionDefaultFiltro();
    }

    agregarEnfiltro();
    agregarEnTabla(...tablaInfoEquipoPreCargada);
    agregarOptionDefaultFiltro();
    agregarEnfiltro(...tablaInfoEquipoPreCargada);
    document.querySelector("#btn-vaciarTabla").addEventListener("click", () => {


        vaciarTablaInfoEquipo();
        vaciarfiltro();
        //recargarFiltro(...tablaInfoEquipoPreCargada);
    });

    document.querySelector("#btn-cargarTabla").addEventListener("click", () => {
        tablaInfoEquipoPreCargada.push(...tablaAutocompletar);
        agregarEnTabla(...tablaAutocompletar);
        agregarEnfiltro(...tablaAutocompletar);
    });


    document.querySelector("#btn-eliminarUltimo").addEventListener("click", eliminarUltimoRegistro);

    document.querySelector("#filtro").addEventListener("change", filtrar);

    document.querySelector("#form-jugador").addEventListener("submit", function(event) {
        event.preventDefault();
        agregarJugador();
    });



    function filtrar() {
        let valor = this.value;
        for (let elem of document.querySelector(".tablaInfoEquipo").childNodes) {
            elem.className = "";
            if (valor != filtroDefault.value) {
                let tdposicion = elem.childNodes[1];
                if (tdposicion != undefined && tdposicion.innerHTML != valor) {
                    elem.className = "oculto";
                }
            }
        }
    }

    function eliminarultimoTabla() {
        let tabla = document.querySelector(".tablaInfoEquipo");
        let posultimo = tabla.childNodes.length - 1;
        tabla.removeChild(tabla.childNodes[posultimo]);
    }

    function eliminarEnFiltro(valor) {
        //lo saco del arreglo
        let elementoAEliminar = arrFiltro.forEach(element => {
            if (element.value === valor) {
                return element;

            }

        });
        arrFiltro.splice(arrFiltro.indexOf(elementoAEliminar), 1);

        //lo saco del dom 
        let filtro = document.querySelector("#filtro");
        for (let elem of filtro.childNodes) {
            if (elem.value === elementoAEliminar.value) {
                filtro.removeChild(elem);
            }
        }
    }

    function eliminarUltimoRegistro() {
        let ulltimoRegistro = tablaInfoEquipoPreCargada[tablaInfoEquipoPreCargada.length - 1];
        tablaInfoEquipoPreCargada.pop();
        eliminarultimoTabla();
        if (!existeEnJsonArray(tablaInfoEquipoPreCargada, "colum2", ulltimoRegistro.colum2)) {
            eliminarEnFiltro(ulltimoRegistro.colum2);
        }
    }

    function vaciarTablaInfoEquipo() {
        tablaInfoEquipoPreCargada = [];
        document.querySelector(".tablaInfoEquipo").innerHTML = "";

    }


    function agregarJugador() {
        let nro = document.querySelector("#inputNro").value;
        let pos = document.querySelector("#inputPos").value;
        let nombre = document.querySelector("#inputNombre").value;
        let altura = document.querySelector("#inputAltura").value;
        let edad = document.querySelector("#inputEdad").value;

        let fila = { colum1: nro, colum2: pos, colum3: nombre, colum4: altura + " m", colum5: edad + " años" };
        tablaInfoEquipoPreCargada.push(fila);
        agregarEnTabla(fila);
        agregarEnfiltro(fila);
        setCamposImput();

    }

    function setCamposImput() {
        document.querySelector("#inputNro").value = "";
        document.querySelector("#inputPos").value = "";
        document.querySelector("#inputNombre").value = "";
        document.querySelector("#inputAltura").value = "";
        document.querySelector("#inputEdad").value = "";

    }


});