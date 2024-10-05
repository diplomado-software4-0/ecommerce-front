import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import ProductModal from "./modal";

const Tienda = ({ descuentoActivo, onAddToCart }) => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    obtenerproductos();
  }, []);

  const obtenerproductos = async () => {
    const datos = await fetch("https://fakestoreapi.com/products");
    const prod = await datos.json();
    setProductos(prod);
  };

  const manejarCambioCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const manejarCambioBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const productosFiltrados = productos.filter((producto) => {
    const cumpleCategoria =
      categoria === "all" || producto.category === categoria;
    const cumpleBusqueda = producto.title
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  return (
    <div>
      <h1 className="d-flex flex-row justify-content-center">
        Buscar productos
      </h1>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={manejarCambioBusqueda}
        className="form-control mb-4"
      />

      {/* Filtro por categoría */}
      <select
        value={categoria}
        onChange={manejarCambioCategoria}
        className="form-select mb-4"
      >
        <option value="all">Todas las categorías</option>
        <option value="men's clothing">Ropa de Hombre</option>
        <option value="women's clothing">Ropa de Mujer</option>
        <option value="jewelery">Joyería</option>
        <option value="electronics">Electrónica</option>
      </select>

      <h3 className="d-flex flex-row">Productos</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {productosFiltrados.map((producto) => {
          const precioConDescuento = descuentoActivo
            ? producto.price * 0.8
            : producto.price;

          return (
            <div key={producto.id}>
              <Card
                url={producto.image}
                title={producto.title}
                price={precioConDescuento}
                originalPrice={producto.price}
                description={producto.description}
                onAddToCart={() => onAddToCart(producto)}
                onImageClick={() => abrirModal(producto)}
              />
            </div>
          );
        })}
      </div>

      {/* Mostrar el modal si se seleccionó un producto */}
      {mostrarModal && productoSeleccionado && (
        <ProductModal
          producto={productoSeleccionado}
          onClose={cerrarModal}
          onAddToCart={() => {
            onAddToCart(productoSeleccionado);
            cerrarModal();
          }}
        />
      )}
    </div>
  );
};

Tienda.propTypes = {
  descuentoActivo: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Tienda;
