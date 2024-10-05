import React from "react";
import PropTypes from "prop-types";
import "./modal.css";

const ProductModal = ({ producto, onClose, onAddToCart }) => {
  const agregarAlCarritoDesdeModal = () => {
    onAddToCart(producto);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={onClose} className="close-button">
          &times;
        </span>
        <img
          src={producto.image}
          alt={producto.title}
          style={{ width: "100%" }}
        />
        <h2>{producto.title}</h2>
        <p>{producto.description}</p>
        <h4>Precio: ${producto.price.toFixed(2)}</h4>
        <button
          className="btn btn-primary"
          onClick={agregarAlCarritoDesdeModal}
        >
          Añadir al carrito
        </button>
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
