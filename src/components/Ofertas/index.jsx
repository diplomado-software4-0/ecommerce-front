import Card from "../Card";
import PropTypes from "prop-types";

const Ofertas = ({ productos, onAddToCart }) => {
  // Filtro producto(precio < 50)
  const productosEnOferta = productos.filter((producto) => producto.price < 50);

  return (
    <div>
      <h2 className="product-list">Ofertas</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {productosEnOferta.map((producto) => (
          <Card
            key={producto.id}
            url={producto.image}
            title={producto.title}
            price={producto.price}
            description={producto.description}
            onAddToCart={() => onAddToCart(producto)}

            // onAddToCart={() =>
            //   console.log(`Producto añadido: ${producto.title}`)
            // }
            onImageClick={() =>
              console.log(`Ver detalles de: ${producto.title}`)
            }
          />
        ))}
      </div>
    </div>
  );
};
Ofertas.propTypes = {
  onAddToCart: PropTypes.func.isRequired,

  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Ofertas;
