import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CrudCarrito = ({
  productosEnCarrito,
  onRemoveFromCart,
  onModifyQuantity,
}) => {
  const [carrito, setCarrito] = useState(productosEnCarrito);

  useEffect(() => {
    setCarrito(productosEnCarrito);
  }, [productosEnCarrito]);

  const modificarCantidad = (id, cantidad) => {
    onModifyQuantity(id, cantidad);
  };

  return (
    <div>
      <h2>CRUD Carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {carrito.map((producto) => (
            <li key={producto.id}>
              <h3>{producto.title}</h3>
              <p>Precio: {producto.price}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <button
                onClick={() =>
                  modificarCantidad(producto.id, producto.cantidad + 1)
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  modificarCantidad(producto.id, producto.cantidad - 1)
                }
              >
                -
              </button>
              <button onClick={() => onRemoveFromCart(producto.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CrudCarrito.propTypes = {
  productosEnCarrito: PropTypes.array.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onModifyQuantity: PropTypes.func.isRequired,
};
export default CrudCarrito;
