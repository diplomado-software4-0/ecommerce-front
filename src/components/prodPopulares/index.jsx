import React from "react";
import Card from "../Card";

const ProdPopulares = ({ productos }) => {
  // Filtro (con más de 200 calificaciones)
  const productosPopulares = productos.filter(
    (producto) => producto.rating.count > 200
  );

  return (
    <div>
      <h2 className="product-list">Productos Populares</h2>
      <div
        className="product-list"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {productosPopulares.map((producto) => (
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

export default ProdPopulares;
