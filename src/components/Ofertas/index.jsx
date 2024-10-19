import { useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import ProductModal from "../Modal/index";

const Ofertas = ({ productos, onAddToCart }) => {
  // Filtro producto(precio < 50)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const productosEnOferta = productos.filter((producto) => producto.price < 50);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };
  return (
    <div>
      <h2 className="product-list">Ofertas</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {productosEnOferta.map((producto) => (
          <Card
            key={producto.id}
            url={producto.image}
            title={producto.title}
            price={producto.price}
            description={producto.description}
            onAddToCart={() => onAddToCart(producto)}
            onImageClick={() => abrirModal(producto)}
          />
        ))}
      </div>

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
Ofertas.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Ofertas;
