/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



document.getElementById("formContato").addEventListener("submit", async function (e) {

    e.preventDefault();

    const nome_de = document.getElementById("inputName").value.trim();
    const email = document.getElementById("inputEmail").value.trim();
    const assunto = document.getElementById("inputSubject").value.trim();
    const mensagem = document.getElementById("inputMessage").value.trim();
    const corpo = `
            Nome: ${nome_de}
            Email: ${email}
            Assunto: ${assunto}
            Mensagem:
            ${mensagem}
            `;

    if (!nome_de || !email || !assunto || !mensagem) {

        Swal.fire({
            icon: 'warning',
            title: 'Campos vazios',
            text: 'preencha os campos assim facilita o contato'
        });

        return;
    }

    try {

        Swal.fire({
            title: 'Enviando mensagem...',
            text: 'Aguarde um momento.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const resp = await fetch("http://24.152.35.148:8191/portifolio/enviar_email_portifolio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                de: email,
                nome_de: nome_de,
                corpo: corpo
            })
        });

        if (resp.ok) {
            Swal.fire({
                icon: "success",
                title: "Mensagem enviada!",
                text: "Obrigado pelo contato. Retornarei em breve."
            });
        } else {
            const msg = await resp.text();
            Swal.fire({
                icon: "error",
                title: "Erro ao enviar",
                text: msg || "Não foi possível enviar o e-mail."
            });
        }

    } catch (erro) {

        Swal.close();

        Swal.fire({
            icon: 'error',
            title: 'Erro de conexão',
            text: 'Não foi possível conectar ao servidor.'
        });

        console.error(erro);

    }

});
