class Carrito {
	constructor() {
		this.productos = [];
	}
	//FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
	agregarAlCarrito(categoria, prodId) {

		const existe = this.productos.some((prod) => prod.id == prodId);
		const producto = {
			...stock
				.find((cat) => cat.nombre === categoria)
				.modelos.find((prod) => prod.id == prodId)
		};

		existe
			? [...this.productos.filter((prod) => {
				if (prod.id === prodId) {
					prod.cantidad++;
				}
			})]
			: this.productos.push(producto);

		carrito.calcularTotal();
		carrito.guardar();
	};

	//FUNCIÓN PARA BORRAR TODOS LOS PRODUCTOS DEL CARRITO
	vaciarCarrito() {
		[...this.productos].map((item) => (item.cantidad = 1));
		this.productos = [];
		carrito.calcularTotal();
		carrito.guardar();
	}

	//FUNCIÓN PARA DISMINUIR LA CANTIDAD DE UN PRODUCTO SELECCIONADO
	borrarProducto(prodId) {
		const existe = this.productos.some((prod) => prod.id == prodId);
		const producto = this.productos.find((prod) => prod.id === prodId);
		const indice = this.productos.indexOf(producto);

		if (existe) {
			this.productos.filter((prod) => {
				if (prod.id === prodId) {
					prod.cantidad > 1
						? prod.cantidad--
						: this.productos.splice(indice, 1);
				}

			});
		}
		carrito.calcularTotal();
		carrito.guardar();
	}

	//FUNCIÓN PARA CALCULAR EL TOTAL DE COMPRA
	calcularTotal() {
		let total = 0;
		this.productos.forEach((producto) => {
			total = total + producto.cantidad * producto.precio;
		});
		this.total = total.toFixed(2)
	}

	recuperarDatos() {
		this.productos = JSON.parse(localStorage.getItem('MI_CARRITO'));
		this.calcularTotal();
	}

	guardar() {
		localStorage.setItem('MI_CARRITO', JSON.stringify(this.productos));
	}
}

