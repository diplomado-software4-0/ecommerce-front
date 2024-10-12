import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import "./index.css";

const Carrito = ({
  productosEnCarrito,
  onRemoveFromCart,
  onModifyQuantity,
}) => {
  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      {productosEnCarrito.length === 0 ? (
        <p className="empty">
          Tu carrito está vacío. ¡Añade algunos productos!
        </p>
      ) : (
        <div className="productos">
          {productosEnCarrito.map((producto) => (
            <CartItem
              key={producto.id}
              producto={producto}
              onRemoveFromCart={onRemoveFromCart}
              onModifyQuantity={onModifyQuantity}
            />
          ))}
          <h3 className="total">
            Total: $
            {productosEnCarrito
              .reduce(
                (total, producto) => total + producto.price * producto.cantidad,
                0
              )
              .toFixed(2)}
          </h3>
          <button className="btn btn-primary">Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

Carrito.propTypes = {
  productosEnCarrito: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      cantidad: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onModifyQuantity: PropTypes.func.isRequired,
};
export default Carrito;
