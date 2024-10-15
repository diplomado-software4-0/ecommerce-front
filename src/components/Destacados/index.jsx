import Card from "../Card";
import PropTypes from "prop-types";

const Destacados = ({ productos }) => {
  // Filtro productos destacados por rating
  const productosDestacados = productos.filter(
    (producto) => producto.rating.rate > 4.5
  );

  return (
    <div>
      <h2>Destacados</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {productosDestacados.map((producto) => (
          <Card
            key={producto.id}
            url={producto.image}
            title={producto.title}
            price={producto.price}
            description={producto.description}
            onAddToCart={() =>
              console.log(`Producto añadido: ${producto.title}`)
            }
            onImageClick={() =>
              console.log(`Ver detalles de: ${producto.title}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

Destacados.propTypes = {
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
export default Destacados;
