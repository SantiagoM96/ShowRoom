const init = () => {
	fetchData();
	actualizarCarrito();
	boton()
};

const carrito = new Carrito();
localStorage.getItem("MI_CARRITO") && carrito.recuperarDatos();

let stock;
const fetchData = async () => {
	try {
		const res = await fetch("js/data/productos.json");
		const data = await res.json();
		stock = data;
		pintarInventario(stock);
	} catch (error) {
		console.log(error);
	}
};

const pintarInventario = (data) => {
	data.forEach((categoria) => {
		const productos = categoria.modelos;
		productos.forEach((prod) => {
			const { id, nombre, precio, imagen } = prod;
			let card = document.createElement("div");
			card.setAttribute("class", "card");

			card.innerHTML = `
		<div class = 'content'>
			<div class ='img'>
				<img src= '${imagen}'></img>
			</div>
        	<div class ='details'>
				<div class ='cardText'>
        			<h4 class='nombreProducto'>${nombre}</h4>
        			<a href='${categoria.url}' target='_blank' class = 'categoria'>${categoria.nombre}</a>
        			<p> $${precio}</p>
        		</div>
				<a id='agregar${id}' class='btnAdd' title = 'Add to cart'>+</a>
			</div>
		</div>`;

			contenedorProductos.appendChild(card);
			//Botón para agregar al carrito
			const btnAdd = document.getElementById(`agregar${id}`);
			btnAdd.addEventListener("click", () => {
				carrito.agregarAlCarrito(`${categoria.nombre}`, id);
				actualizarCarrito();
				showMessage("Successfully added 😀", "success");
			});
		});
	});
};

const productosDelCarrito = document.getElementById("productosDelCarrito");

/* FUNCIÓN QUE MUESTRA TODAS LAS CARACTERÍSTICAS DEL CARRITO 
DE ACUERDO A LA INTERACCIÓN DEL USUARIO*/

const actualizarCarrito = () => {
	productosDelCarrito.innerHTML = "";
	carrito.productos.forEach((producto) => {

		const { id, imagen, nombre, cantidad, precio } = producto;

		//hago el cálculo de cantidad del producto por su precio
		let sumaPorProducto = cantidad * precio;
		//creo el div para cada modelo seleccionado
		const cardCarrito = document.createElement("div");
		cardCarrito.setAttribute("class", "cardEnMiCarrito");

		cardCarrito.innerHTML = `
		<img class='imgCard' src= '${imagen}'></img>
		<div class='infoCard'>
			<h4>${nombre}</h4> 
			<p id='cantidad'>QUANTITY: ${cantidad} x <span>$${precio}</span></p>
		</div>
    	<div>
    		<b class='sumaPorProducto'> $${sumaPorProducto}</b>
		</div>
		<img src = "img/menos.png" title = "Remove Product" class ='borrarProducto' id = '${id}'>
		</img>`;

		productosDelCarrito.appendChild(cardCarrito);
		//Botón para borrar producto del carrito
		const btnRemover = document.getElementById(`${id}`);
		btnRemover.addEventListener("click", () => {
			showMessage("Successfully removed 😢", "caution");
			carrito.borrarProducto(id);
			actualizarCarrito();
		});
	});

	//muestra la cantidad de productos que añadí al Carrito
	document.getElementById("contadorCarrito").innerText =
		carrito.productos.reduce((acc, prod) => acc + prod.cantidad, 0);

	//muestra el valor total de mi compra
	document.getElementById("valorTotal").innerHTML = `${carrito.total || 0}`;
	carrito.guardar();
};

// Botón dentro del modal del carrito que permite realizar la compra de los productos seleccionados
const botonComprarProductos = document.getElementById("comprarProductos");

// FUNCIÓN PARA REALIZAR LA COMPRA DE LOS PRODUCTOS EN EL CARRITO
const comprarProductos = () => {
	botonComprarProductos.addEventListener("click", () => {
		if (carrito.productos.length > 0) {
			Swal.fire({
				title: "Are you Sure?",
				icon: "question",
				showCancelButton: true,
				customClass: "sweetAlert",
				confirmButtonText: "Yes, I am",
				cancelButtonText: "No, I'm not"
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: "Successful Purchase",
						text: "Thank you very much!",
						icon: "success",
						customClass: "sweetAlert",
						confirmButtonText: "Great",
					})
					//vacio el carrito porque ya ejecuté la compra
					carrito.vaciarCarrito();
					//luego actualizo
					actualizarCarrito();
				}
			})

		} else {
			showMessage("Nothing to buy 🥱", "error");
		}
	});
};

const botónVaciarCarrito = document.getElementById("vaciarCarrito");

//FUNCIÓN QUE LLAMA A VACIAR CARRITO PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
const eliminarProductos = () => {
	botónVaciarCarrito.addEventListener("click", () => {
		if (carrito.productos.length > 0) {
			Swal.fire({
				title: "Are you Sure?",
				icon: "question",
				showCancelButton: true,
				customClass: "sweetAlert",
				confirmButtonText: "Yes, I am",
				cancelButtonText: "No, I'm not"
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: "Successfully Emptied",
						icon: "success",
						customClass: "sweetAlert",
						confirmButtonText: "Great",
					})
					//vacio el carrito porque ya ejecuté la compra
					carrito.vaciarCarrito();
					//luego actualizo
					actualizarCarrito();
				}
			})
		} else {
			showMessage("Nothing to empty 🥱", "error");
		}
	});
};

