import React from "react";
import Card from "../Card";

const Ofertas = ({ productos }) => {
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

export default Ofertas;
