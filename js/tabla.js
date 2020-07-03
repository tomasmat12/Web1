let infotabla = [];
let arrFiltro = [{ "option": "Todas", "value": "All" }];
let tablaAutocompletar = [{ "thing": { numero: "19", posicion: "Punta Receptor", nombre: "Luciano Vicentin", altura: "1.97 m", edad: "20 años" } },
{ "thing": { numero: "21", posicion: "Central", nombre: "Joaquin Gallego", altura: "2.04 m", edad: "23 años" } },
{ "thing": { numero: "22", posicion: "Opuesto", nombre: "German Johansen", altura: "2.00 m", edad: "24 años" } }
];


const colecction = "pruebajugador"

const url = "https://web-unicen.herokuapp.com/api/groups/108tomasnagy";



function agregarEnTabla(...arrTabla) {
    for (let elem of arrTabla) {
        let fila = document.createElement("tr");
        fila.id = "id"+elem._id;
        for (let i in elem.thing) {
            let columna = document.createElement("td");
            columna.className = i;
            columna.innerHTML = elem.thing[i];
            fila.appendChild(columna);
        }
        let columEditar = document.createElement("td");
        columEditar.innerHTML = '<i class="fa fa-pencil-square-o" />';
        columEditar.classList.add("edit");
        columEditar.addEventListener("click", editarFila);
        let columDelete = document.createElement("td");
        columDelete.innerHTML = '<i class="fa fa-ban" />';
        columDelete.classList.add("delet");
        columDelete.addEventListener("click", eliminarDeTabla);
        fila.appendChild(columDelete);
        fila.appendChild(columEditar);
        document.querySelector(".tablaInfoEquipo").appendChild(fila);

    }
}

function editarFila(event) {
    let fila = event.currentTarget.parentElement;
    document.querySelector("#form-jugador").className = "";
    document.querySelector("#input-id").value = fila.id.split("id")[1];
    document.querySelector("#inputNro").value = fila.querySelector(".numero").innerHTML;
    document.querySelector("#inputPos").value = fila.querySelector(".posicion").innerHTML;
    document.querySelector("#inputNombre").value = fila.querySelector(".nombre").innerHTML;
    document.querySelector("#inputAltura").value = parseFloat(fila.querySelector(".altura").innerHTML).toFixed(2);
    document.querySelector("#inputEdad").value = parseInt(fila.querySelector(".edad").innerHTML);
    document.querySelector("#btn-agregarRow").value = "Modificar Jugador";

}

function eliminarDeTabla(event) {

    let tr = event.currentTarget.parentElement;
    deleteData(tr.id.split("id")[1], r => {

        for (let index = 0; index < infotabla.length; index++) {
            let elem =Object.assign({},infotabla[index]);
            if (elem._id === tr.id.split("id")[1]) {
                infotabla.splice(infotabla.indexOf(elem), 1);
                if (infotabla.filter(x => x.thing.posicion == elem.thing.posicion).length == 0) {
                    eliminarEnFiltro(elem.thing.posicion);
                }
                index = infotabla.length;
            }
            filtrar();

        }

        document.querySelector(".tablaInfoEquipo").removeChild(tr);


    })


}


function existeEnJsonArray(arr, key, value) {
    for (let elem of arr) {
        if (elem[key] === value) {
            return true;
        }
    }
    return false;
}

function agregarEnfiltro(...arrTabla) {
    let filtro = document.querySelector("#filtro");
    for (let i of arrTabla) {
        if (!existeEnJsonArray(arrFiltro, "option", i.thing.posicion)) {
            let option = document.createElement("option");
            option.value = i.thing.posicion;
            option.innerHTML = i.thing.posicion;
            filtro.appendChild(option);
            arrFiltro.push({ "option": i.thing.posicion, "value": i.thing.posicion });
        }
    }

}

function agregarOptionDefaultFiltro() {
    let option = document.createElement("option");
    option.value = arrFiltro[0].value;
    option.innerHTML = arrFiltro[0].option;
    document.querySelector("#filtro").appendChild(option);
}


function vaciarfiltro() {
    arrFiltro.splice(1, arrFiltro.length - 1);
    document.querySelector("#filtro").innerHTML = "";
    agregarOptionDefaultFiltro();
}


function filtrar() {
    let valor = document.querySelector("#filtro").value;
    for (let elem of document.querySelector(".tablaInfoEquipo").childNodes) {
        elem.className = "";
        if (valor != arrFiltro[0].value) {
            let tdposicion = elem.childNodes[1];
            if (tdposicion != undefined && tdposicion.innerHTML != valor) {
                elem.className = "oculto";
            }
        }
    }
}

function eliminarEnFiltro(valor) {
    let elementoAEliminar = "";
    for (let element of arrFiltro) {
        if (element.value === valor) {
            elementoAEliminar = element;

        }

    }

    arrFiltro.splice(arrFiltro.indexOf(elementoAEliminar), 1);

    //lo saco del dom 
    let filtro = document.querySelector("#filtro");
    for (let elem of filtro.childNodes) {
        if (elem.value === elementoAEliminar.value) {
            filtro.removeChild(elem);
        }
    }

    filtrar();
}



function vaciarTablaInfoEquipo() {
    document.querySelector(".tablaInfoEquipo").innerHTML = "";

}


function agregarJugador() {
    let nro = document.querySelector("#inputNro").value;
    let pos = document.querySelector("#inputPos").value;
    let nombre = document.querySelector("#inputNombre").value;
    let altura = document.querySelector("#inputAltura").value;
    let edad = document.querySelector("#inputEdad").value;

    let fila = { "thing": { numero: nro, posicion: pos, nombre: nombre, altura: altura + " m", edad: edad + " años" } };

    postData(fila, r => {
        infotabla.push(r.information);
        agregarEnTabla(r.information);
        agregarEnfiltro(r.information);
        filtrar();
        setCamposImput();
    })


}


function modificarJugador() {
    let nro = document.querySelector("#inputNro").value;
    let pos = document.querySelector("#inputPos").value;
    let nombre = document.querySelector("#inputNombre").value;
    let altura = document.querySelector("#inputAltura").value;
    let edad = document.querySelector("#inputEdad").value;
    let id = document.querySelector("#input-id").value;


    let fila = { "thing": { numero: nro, posicion: pos, nombre: nombre, altura: altura + " m", edad: edad + " años" } };

    putData(id, fila, r => {
        for (let index = 0; index < infotabla.length; index++) {
            let elem = Object.assign({},infotabla[index]); //uso este metodo por que si no elem es una referencia y no una copia de infotabla
            if (elem._id === r.person._id) {
                infotabla[index].thing = fila.thing;
                if (infotabla.filter(x => x.thing.posicion === elem.thing.posicion).length == 0) {
                    eliminarEnFiltro(elem.thing.posicion);
                }
                modificarFilaTabla(infotabla[index]);
                agregarEnfiltro(infotabla[index]);
                filtrar();
                setCamposImput();
                index = infotabla.length;
            }

        }   

    })


}



function modificarFilaTabla(data){

    let id = "#id"+ data._id;
    let fila = document.querySelector(id.toString());
    fila.querySelector(".numero").innerHTML=data.thing.numero;
    fila.querySelector(".posicion").innerHTML=data.thing.posicion;
    fila.querySelector(".nombre").innerHTML=data.thing.nombre;
    fila.querySelector(".altura").innerHTML=data.thing.altura;
    fila.querySelector(".edad").innerHTML = data.thing.edad;

}


function setCamposImput() {
    document.querySelector("#form-jugador").className = "oculto";
    document.querySelector("#inputNro").value = "";
    document.querySelector("#inputPos").value = "";
    document.querySelector("#inputNombre").value = "";
    document.querySelector("#inputAltura").value = "";
    document.querySelector("#inputEdad").value = "";
    document.querySelector("#input-id").value = "";
    document.querySelector("#btn-agregarRow").value = "Agregar Jugador";
}

function actualizarTabla(respuesta) {

    if (infotabla !== null && JSON.stringify(infotabla) != JSON.stringify(respuesta)) {
        infotabla = respuesta;
        vaciarTablaInfoEquipo();
        vaciarfiltro();
        agregarEnTabla(...infotabla);
        agregarEnfiltro(...infotabla);
    }

}

//
function mostrarError(e){
    alert("Compruebe su coneccion a internet");
    console.log(e);

}

// llamadas a la api
function getTabla(callback) {

    fetch(`${url}/${colecction}`, {
        'method': 'GET',
        'mode': 'cors'
    }
    ).then(response => {
        return response.json();

    }).then(r => {
        /* console.log(r) ; */
        callback(r[colecction]);
    }).catch(e => {
            mostrarError(e);
         }        
    );

}


function postData(data, callback) {

    fetch(`${url}/${colecction}`, {
        'method': 'POST',
        'mode': 'cors',
        'headers': {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    }).then(response => { return response.json() }).then(r => {
        callback(r)
    }).catch(e => {
        mostrarError(e);
     });

}



function deleteData(id, callback) {

    fetch(`${url}/${colecction}/${id}`, {
        'method': 'DELETE',
        'mode': 'cors'
    }).then(response => { return response.json() }).then(r => {
        callback(r)
    }).catch(e => {
        mostrarError(e);
     });

}


function putData(id, data, callback) {

    fetch(`${url}/${colecction}/${id}`, {
        'method': 'PUT',
        'mode': 'cors',
        'headers': {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    }).then(response => { return response.json() }).then(r => {
        callback(r)
    }).catch(e => {
        mostrarError(e);
     });




}



function mostrar(respuesta) {

    infotabla = respuesta;
    vaciarfiltro();
    agregarEnTabla(...infotabla);
    agregarEnfiltro(...infotabla);
    document.querySelector("#btn-vaciarTabla").addEventListener("click", () => {
        setCamposImput();
        infotabla.forEach(element => {
            deleteData(element._id, r => {
                vaciarTablaInfoEquipo();
                vaciarfiltro();
            })
        });
        
    });

    document.querySelector("#btn-cargarTabla").addEventListener("click", () => {
        tablaAutocompletar.forEach(element => {
            setCamposImput();
            postData(element, r => {
                infotabla.push(r.information);
                agregarEnTabla(r.information);
                agregarEnfiltro(r.information);
                filtrar();

            });
        });

    });

    document.querySelector("#btn-agregarJugador").addEventListener("click", (event) => {
        setCamposImput();
        document.querySelector("#form-jugador").className = "";

    });

    document.querySelector("#filtro").addEventListener("change", filtrar);
    document.querySelector("#form-jugador").addEventListener("submit", (event) => {
        event.preventDefault();
        if (document.querySelector("#input-id").value != null && document.querySelector("#input-id").value != ''){
            modificarJugador();
        }
        else{agregarJugador();}
    });
}


export function actualizar() {
    getTabla(actualizarTabla);
}


export function tabla() {
    getTabla(mostrar);

}