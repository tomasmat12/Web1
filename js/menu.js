document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#iconMenu").addEventListener("click", mostrarMenu);

    function mostrarMenu() {
        let menu = document.querySelector("#menu");
        if (menu.className === "menu") {
            menu.className += " menu-responsive";
        } else {
            menu.className = "menu";
        }
    }
});