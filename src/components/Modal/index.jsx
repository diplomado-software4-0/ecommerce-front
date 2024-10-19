import PropTypes from "prop-types";
import "./modal.css";

const ProductModal = ({ producto, onClose, onAddToCart }) => {
  const agregarAlCarritoDesdeModal = () => {
    onAddToCart(producto);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span onClick={onClose} className="close-button">
          &times;
        </span>
        <div className="modal-body">
          <img
            src={producto.image}
            alt={producto.title}
            className="modal-product-image"
          />
          <div className="modal-product-details">
            <h2 className="modal-product-title">{producto.title}</h2>
            <p className="modal-product-description">{producto.description}</p>
            <h4 className="modal-product-price">Precio: ${producto.price.toFixed(2)}</h4>
            <h5 className="modal-product-category">Categoría: {producto.category}</h5>
            <button
              className="btn btn-primary"
              onClick={agregarAlCarritoDesdeModal}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  producto: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductModal;
