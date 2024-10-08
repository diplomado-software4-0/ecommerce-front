import React from "react";
import Card from "../Card";

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

export default Destacados;
