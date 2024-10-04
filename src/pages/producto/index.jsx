import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

const Product = ({ descuentoActivo }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerproductos();
  }, []);

  const obtenerproductos = async () => {
    const datos = await fetch("https://fakestoreapi.com/products");
    const prod = await datos.json();
    setProductos(prod);
  };
  return (
    <div>
      <h3 className="d-flex flex-row justify-content-center">Productos</h3>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {productos.map((producto) => {
          const precioConDescuento = descuentoActivo
            ? producto.price * 0.8
            : producto.price;

          return (
            <Card
              key={producto.id}
              url={producto.image}
              title={producto.title}
              price={precioConDescuento}
              originalPrice={producto.price}
              description={producto.description}
            />
          );
        })}
      </div>
    </div>
  );
};
Product.propTypes = {
  descuentoActivo: PropTypes.bool.isRequired,
};
Product.defaultProps = {
  descuentoActivo: false, // O el valor que consideres adecuado
};
export default Product;
