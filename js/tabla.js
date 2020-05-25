document.addEventListener("DOMContentLoaded", cargarPagina);

function cargarPagina() {

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
        { colum1: "18", colum2: "Central", colum3: "Martin Ramos", colum4: "1,97 m", colum5: "28 años" },
        { colum1: "19", colum2: "Punta Receptor", colum3: "Luciano Vicentin", colum4: "1,97 m", colum5: "20 años" },
        { colum1: "21", colum2: "Central", colum3: "Joaquin Gallego", colum4: "2,04 m", colum5: "23 años" },
        { colum1: "22", colum2: "Opuesto", colum3: "GermanJohansen", colum4: "2,00 m", colum5: "24 años" }
    ];

    let tablaResultadoPreCargada = [
        { colum1: "Argentina", colum2: 16, colum3: 25, colum4: 25, colum5: 23, colum6: 16 },
        { colum1: "Polonia", colum2: 25, colum3: 23, colum4: 23, colum5: 25, colum6: 14 },
        { colum1: "-------", colum2: "-------", colum3: "Siguiente", colum4: "Partido", colum5: "-------", colum6: "-------" }
    ];



    function CargaTablas() {

        for (let elem of tablaInfoEquipoPreCargada) {
            document.querySelector(".tablaInfoEquipo").innerHTML += "<tr>" +
                "<td>" + elem.colum1 + "</td>" + "<td>" + elem.colum2 + "</td>" + "<td>" + elem.colum3 + "</td>" +
                "<td>" + elem.colum4 + "</td>" + "<td>" + elem.colum5 + "</td>" + "</tr>";

            let filtro = document.querySelector("#filtro");
            let agregar = true;
            for (let i of filtro.childNodes) {
                if (i.value === elem.colum2)
                    agregar = false;
            }
            if (agregar) {
                filtro.innerHTML += `<option value="${elem.colum2}"> ${elem.colum2} </option>`
            }


        }

        for (let elem of tablaResultadoPreCargada) {
            document.querySelector(".tablaResultado").innerHTML += "<tr>" +
                "<td>" + elem.colum1 + "</td>" + "<td>" + elem.colum2 + "</td>" + "<td>" + elem.colum3 + "</td>" +
                "<td>" + elem.colum4 + "</td>" + "<td>" + elem.colum5 + "</td>" + "<td>" + elem.colum6 + "</td>" + "</tr>"
        }
    }

    CargaTablas();
    document.querySelector(".botonAgregarRow").addEventListener("submit", agregarFila);
    document.querySelector(".botonVaciarTabla").addEventListener("click", vaciarTabla);
    /*document.querySelector(".botonFiltro").addEventListener("click",FiltrarGanador);*/
    document.querySelector(".botonCargarTabla").addEventListener("click", CargaTablas);
    document.querySelector(".botonEliminarUltimoRegistro").addEventListener("click", eliminarRegistro);

    document.querySelector("#filtro").addEventListener("change", filtrar);

    function filtrar() {
        let valor = this.value;

        for (let elem of document.querySelector(".tablaInfoEquipo").childNodes) {
            elem.className = "";
            if (valor != "all") {
                let tdposicion = elem.childNodes[1];
                if (tdposicion && tdposicion.innerHTML != valor) {
                    elem.className = "oculto";
                }
            }
        }
    }

    function eliminarRegistro() {
        tablaResultadoPreCargada.pop();
        vaciarTabla();
        CargaTablas();
    }

    function vaciarTabla() {
        document.querySelector(".tablaResultado").innerHTML = "";
    }


    function agregarFila(e) {
        e.preventDefault();
        let equipo = document.querySelector("#inputEquipo").value;
        let set1 = document.querySelector("#input1erSet").value;
        let set2 = document.querySelector("#input2doSet").value;
        let set3 = document.querySelector("#input3erSet").value;
        let set4 = document.querySelector("#input4toSet").value;
        let tieBreak = document.querySelector("#inputTieBreak").value;

        if ((tablaResultadoPreCargada.length % 3) != 2) {



            let fila = { colum1: equipo, colum2: set1, colum3: set2, colum4: set3, colum5: set4, colum6: tieBreak };
            tablaResultadoPreCargada.push(fila);
            agregarFilaDada(fila);
            setCamposImput();
        } else {
            let filaP = { colum1: "-------", colum2: "-------", colum3: "Siguiente", colum4: "Partido", colum5: "-------", colum6: "-------" };
            let fila = { colum1: equipo, colum2: set1, colum3: set2, colum4: set3, colum5: set4, colum6: tieBreak };
            tablaResultadoPreCargada.push(filaP);
            tablaResultadoPreCargada.push(fila);
            agregarFilaDada(filaP);
            agregarFilaDada(fila);
        }
    }

    function setCamposImput() {
        document.querySelector("#inputEquipo").value = "";
        document.querySelector("#input1erSet").value = "";
        document.querySelector("#input2doSet").value = "";
        document.querySelector("#input3erSet").value = "";
        document.querySelector("#input4toSet").value = "";
        document.querySelector("#inputTieBreak").value = "";

    }

    function agregarFilaDada(elem) {

        document.querySelector(".tablaResultado").innerHTML += "<tr>" +
            "<td>" + elem.colum1 + "</td>" + "<td>" + elem.colum2 + "</td>" + "<td>" + elem.colum3 + "</td>" +
            "<td>" + elem.colum4 + "</td>" + "<td>" + elem.colum5 + "</td>" + "<td>" + elem.colum6 + "</td>" + "</tr>"
    }

}


/*<input type="text" placeholder="1er Set" id="input1erSet"> </input>
           <input type="text" placeholder="2do Set" id="input2doSet"> </input>
           <input type="text" placeholder="3er Set" id="input3erSet"> </input>
           <input type="text" placeholder="4to Set" id="input4toSet"> </input>
           <input type="text" placeholder="tie break" id="inputTieBreak"> </input>
           <button class="botonAgregarRow" value="">Agregar Datos</button>
           <button class="botonVaciarTabla" value="">Vaciar Tabla</button>
           <button class="botonFiltro" value="">Filtrar Ganador</button>
*/