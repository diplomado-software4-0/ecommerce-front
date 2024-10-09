import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ producto, onRemoveFromCart, onModifyQuantity }) => {
  return (
    <div style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
      <h4>{producto.title}</h4>
      <p>
        Cantidad:
        <button
          onClick={() => onModifyQuantity(producto.id, producto.cantidad - 1)}
          disabled={producto.cantidad <= 1}
        >
          -
        </button>
        {producto.cantidad}
        <button
          onClick={() => onModifyQuantity(producto.id, producto.cantidad + 1)}
        >
          +
        </button>
      </p>
      <p>
        Precio: ${producto.price.toFixed(2)} x {producto.cantidad}
      </p>
      <p>Total: ${(producto.price * producto.cantidad).toFixed(2)}</p>
      <button
        onClick={() => {
          console.log("ID del producto a eliminar:", producto.id);
          onRemoveFromCart(producto.id);
        }}
      >
        Eliminar
      </button>{" "}
    </div>
  );
};

CartItem.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onModifyQuantity: PropTypes.func.isRequired,
};

export default CartItem;
