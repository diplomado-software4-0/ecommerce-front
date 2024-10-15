import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="card">
      <div className="card-header">
        <h2 className="mb-0">Carrito de Compras</h2>
      </div>
      <div className="card-body">
        {carrito.length === 0 ? (
          <p className="text-center">El carrito está vacío</p>
        ) : (
          <ul className="list-group">
            {carrito.map((producto) => (
              <li
                key={producto.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{producto.title}</h5>
                  <p className="mb-1">Precio: ${producto.price}</p>
                  <p className="mb-1">Cantidad: {producto.cantidad}</p>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() =>
                      modificarCantidad(producto.id, producto.cantidad + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger me-2"
                    onClick={() =>
                      modificarCantidad(producto.id, producto.cantidad - 1)
                    }
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onRemoveFromCart(producto.id)}
                  >
                    Eliminar
                  </button>
                  <h3 className="total">
                    Total: $
                    {productosEnCarrito
                      .reduce(
                        (total, producto) =>
                          total + producto.price * producto.cantidad,
                        0
                      )
                      .toFixed(2)}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

CrudCarrito.propTypes = {
  productosEnCarrito: PropTypes.array.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onModifyQuantity: PropTypes.func.isRequired,
};
export default CrudCarrito;
