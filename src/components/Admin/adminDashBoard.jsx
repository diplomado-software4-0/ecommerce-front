import { useState } from "react";
import CrudCarrito from "./Crud/crudCarrito";
import CrudCategorias from "./Crud/crudCategorias";
import CrudProductos from "./Crud/crudProductos";

const Dashboard = () => {
  const [carrito, setCarrito] = useState([]);
  const [, setCategorias] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProductoDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((producto) => producto.id !== id)
    );
  };

  const modificarCantidadProducto = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const handleCategoryChange = (nuevaCategoria) => {
    setCategorias((prevCategorias) => [...prevCategorias, nuevaCategoria]);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CrudProductos onAddToCart={agregarAlCarrito} />
      <CrudCategorias onCategoryChange={handleCategoryChange} />
      <CrudCarrito
        productosEnCarrito={carrito}
        onRemoveFromCart={eliminarProductoDelCarrito}
        onModifyQuantity={modificarCantidadProducto}
      />
    </div>
  );
};

export default Dashboard;
