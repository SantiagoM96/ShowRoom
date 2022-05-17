
// Botón carrito que refiere al ícono de un carrito y que permitirá abrir el 'modal' del carrito
const botonCarrito = document.getElementById('botonCarrito');
// Simulador de un modal que permitirá visualizar e interactuar con el carrito
const modalCarrito = document.querySelector('.modalCarrito');

document.querySelector(".contenedorProductos")

botonCarrito.addEventListener('click', (e) => moverCarrito(e));

// FUNCIÓN QUE HACE VISIBLE EL MODAL CARRITO
const moverCarrito = e => {
    if (e.target.classList.contains('botonCarrito')) {
        modalCarrito.classList.toggle('visible');
        eliminarProductos();
        comprarProductos();
    }
    e.stopPropagation();

}

const buttonUp = document.getElementById('buttonUp');

//FUNCIÓN PARA LLEVAR EL VISOR A LO MÁS INICIO DE PANTALLA
window.onscroll = function () {
    document.documentElement.scrollTop >= 300
        ? buttonUp.style.transform = 'scale(1)'
        : buttonUp.style.transform = 'scale(0)'
}

buttonUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
    })
})

//Funciones de Toastify para mostrar mensajes en pantalla
const showMessage = (message, type) => {
    Toastify({
        text: message,
        duration: 2500,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        className: type,
    }).showToast();
}

const showMessageCentered = (message, type) => {
    Toastify({
        text: message,
        duration: 4500,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        className: type,
    }).showToast();
}

//FUNCIÓN PARA VISUALIZAR UN LOADER
const showPage = (wait, transition) => {
    const loader = document.querySelector('.loader');

    setTimeout(() => {
        loader.classList.add('fadeOut');
        setTimeout(() => {
            loader.remove();
        }, transition + 1);
    }, wait);
}
showPage(2000, 300);

const secciones = document.querySelectorAll('.seccion');
const menuItems = document.querySelectorAll('.menuItem')

/* FUNCIÓN QUE MARCA POR DEBAJO UN SUBRAYADO A LOS ITEMS 
DEL MENU DE NAVEGACIÓN DE ACUERDO A LA POSICIÓN DENTRO DEL NAVEGADOR*/
const funcionObserver = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const itemActual = Array.from(menuItems).find(item =>
                item.dataset.url === entry.target.id);
            itemActual.classList.add('active');
            for (const item of menuItems) {
                item != itemActual &&
                    item.classList.remove('active')
            }
        }
    })
}

const observer = new IntersectionObserver(funcionObserver, {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
})

secciones.forEach(seccion => observer.observe(seccion));

//MANIPULA SEGÚN EL SCROLLEO LA VISIÓN DEL CONTENEDOR DE PRODUCTOS

const contenedorProductos = document.querySelector(".contenedorProductos");
const scrollAppear = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contenedorProductos.classList.add("appear")

        } else {
            contenedorProductos.classList.remove("appear")
        }
    })
}

const observerDos = new IntersectionObserver(scrollAppear, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
})

observerDos.observe(contenedorProductos)

