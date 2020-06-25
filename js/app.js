import {default as tabla} from './tabla.js';

import {default as home} from './form.js';

document.addEventListener("DOMContentLoaded", function () {
    
    
    document.querySelector("#iconMenu").addEventListener("click", mostrarMenu);

    function mostrarMenu() {
        let menu = document.querySelector("#menu");
        if (menu.className === "menu") {
            menu.className += " menu-responsive";
        } else {
            menu.className = "menu";
        }
    }


    function cargarPagina(url) {

        fetch(url).then(response => {
            response.text().then(texto => {

                document.querySelector(".body").innerHTML = texto;

                

                if (url === "indoor.html"){
                    //window.history.pushState("" , "Indoor" , url);
                    tabla().call();
                }

                if (url === "home.html"){
                     //window.history.pushState("" , "VolleyBall" , url);
                     home().call();
                    
                }

                if (url === "beachvolley.html"){
                    //window.history.pushState("" , "Beach VolleyBall" , url);
                    
                }

                /*let scripts = document.querySelectorAll('.body script');
                for (let i = 0; i < scripts.length; i++) {
                    let parent = scripts[i].parentElement; 
                    let d = document.createElement('script');
                    d.src = scripts[i].src;
                    parent.appendChild(d); 
                    parent.removeChild(scripts[i]);                   
                }*/






            });
        });


    }



    document.querySelector("#btn-home").addEventListener("click", event => {
        document.querySelector("#btn-beach").classList.remove("actual");
        document.querySelector("#btn-indoor").classList.remove("actual");
        event.currentTarget.classList.add("actual");
        cargarPagina("home.html");


    });

    document.querySelector("#btn-beach").addEventListener("click", event => {
        document.querySelector("#btn-home").classList.remove("actual");
        document.querySelector("#btn-indoor").classList.remove("actual");
        event.currentTarget.classList.add("actual");
        cargarPagina("beachvolley.html");


    });


    document.querySelector("#btn-indoor").addEventListener("click", event => {
        document.querySelector("#btn-home").classList.remove("actual");
        document.querySelector("#btn-beach").classList.remove("actual");
        event.currentTarget.classList.add("actual");
        cargarPagina("indoor.html");




    });


    cargarPagina("home.html");

});