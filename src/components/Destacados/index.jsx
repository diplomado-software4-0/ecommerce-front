import Card from "../Card";
import { useState } from "react";
import PropTypes from "prop-types";
import ProductModal from "../Modal/index";

const Destacados = ({ productos, onAddToCart }) => {
  // Filtro productos destacados por rating
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const productosDestacados = productos.filter(
    (producto) => producto.rating.rate > 4.5
  );
  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };
  return (
    <div>
      <h2>Destacados</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {productosDestacados.map((producto) => (
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

Destacados.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
export default Destacados;
