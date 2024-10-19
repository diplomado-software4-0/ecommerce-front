import { useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import ProductModal from "../Modal/index";

const ProdPopulares = ({ productos, onAddToCart }) => {
  // Filtro (con más de 200 calificaciones)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const productosPopulares = productos.filter(
    (producto) => producto.rating.count > 200
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
      <h2 className="product-list">Productos Populares</h2>
      <div
        className="product-list"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {productosPopulares.map((producto) => (
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

ProdPopulares.propTypes = {
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
export default ProdPopulares;
