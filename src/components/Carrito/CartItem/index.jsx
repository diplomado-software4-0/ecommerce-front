import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css"; 

const CartItem = ({ producto, onRemoveFromCart, onModifyQuantity }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{producto.title}</h4>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-1">
              Cantidad:
              <button
                className="btn btn-outline-secondary btn-sm ms-1"
                onClick={() => onModifyQuantity(producto.id, producto.cantidad - 1)}
                disabled={producto.cantidad <= 1}
              >
                -
              </button>
              <span className="mx-2">{producto.cantidad}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onModifyQuantity(producto.id, producto.cantidad + 1)}
              >
                +
              </button>
            </p>
            <p className="mb-1">
              Precio: <span className="fw-bold">${producto.price.toFixed(2)}</span>
            </p>
            <p className="fw-bold">
              Total: <span className="text-success">${(producto.price * producto.cantidad).toFixed(2)}</span>
            </p>
          </div>
          <button className="btn btn-danger"
            onClick={() => {
              console.log("ID del producto a eliminar:", producto.id);
              onRemoveFromCart(producto.id);
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
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
