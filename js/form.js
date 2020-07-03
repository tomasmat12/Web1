export default function () {

    return () => {
        let button = document.querySelector("#buttonAceptar");

        let form = document.querySelector("#form-contacto");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            document.querySelector("#succes").innerHTML = 'Se ha enviado un correo a ' + email.value;
        });

        button.disabled = true;



        //---------------------------------------------

        let capchat = document.querySelector(".captcha"); //  Contenedor de las imagenes de CHeck y el texto 

        capchat.addEventListener("click", activar); // Le agrego un evento "click" q llama a la funcion activar

        let captchaArray = [
            { "image": "image/captcha/re-captcha1.jpg", "string": "Hol4 TuD?4" },
            { "image": "image/captcha/re-captcha2.jpg", "string": "H?l4 TuD14" }, // Arreglo de 3 elementos con 2 llaves(campo,valor)
            { "image": "image/captcha/re-captcha3.jpg", "string": "H0l4 TuDI4" }
        ];



        let captchaActual = captchaArray[Math.floor(Math.random() * captchaArray.length)]; // Random entre 0 y dimesn Array

        //seteo imagen de validacion 
        let reCaptchaImage = document.querySelector("#img-recaptcha");
        reCaptchaImage.src = captchaActual.image; //valor de "image" del arreglo en la posicion random

        //setea el evento input en el campo a validar
        let inputreCaptcha = document.querySelector("#input-recaptcha");
        inputreCaptcha.addEventListener("input", validar);

        //oculto el segundo div del captcha
        let reCaptcha = document.querySelector("#re-captcha");
        reCaptcha.className = "oculto";


        //activa el segundo div de captcha
        function activar() {
            reCaptcha.className = 're-captcha';
        }

        //valida lo ingresado en el input y lo compara con el valor "string" obtenido de  del arreglo en la posicion random
        function validar() {
            if (inputreCaptcha.value === captchaActual.string) {
                //cambiar por clase css y no el style directo
                reCaptcha.className = 'oculto';
                button.disabled = false;
                capchat.querySelector("#checkbox").src = "image/icon/checked.png"

            }
        }



    }
}