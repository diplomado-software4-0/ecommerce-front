import { useState } from "react";
import CrudCarrito from "./Crud/crudCarrito";
import CrudCategorias from "./Crud/crudCategorias";
import CrudProductos from "./Crud/crudProductos";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Dashboard Admin</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Categorías</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Carrito</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1 className="text-center mb-4">Gestión de Productos y Carrito</h1>
      
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-3">Productos</h2>
          <CrudProductos onAddToCart={agregarAlCarrito} />
        </div>
        <div className="col-md-4">
          <h2 className="mb-3">Carrito</h2>
          <CrudCarrito
            productosEnCarrito={carrito}
            onRemoveFromCart={eliminarProductoDelCarrito}
            onModifyQuantity={modificarCantidadProducto}
          />
        </div>
      </div>
      
      <div className="my-4">
        <h2 className="mb-3">Categorías</h2>
        <CrudCategorias onCategoryChange={handleCategoryChange} />
      </div>
    </div>
  );
};

export default Dashboard;
