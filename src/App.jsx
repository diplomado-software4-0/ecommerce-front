import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio/index";
import Tienda from "./components/Tienda/index";
import Carrito from "./components/Carrito/index";
import Login from "./components/comp/Login";
import "./App.css";
import { signOut } from "fireba se/auth";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [carrito, setCarrito] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };
  // Observa el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);
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

  return (
    <Router>
      <nav style={{ margin: "5px" }}>
        <Link to="/" className="btn btn-dark">
          Inicio
        </Link>
        <Link to="/Tienda" className="btn btn-dark">
          Tienda
        </Link>
        <Link to="/Carrito" className="btn btn-dark">
          Carrito
        </Link>
        <Link to="/Login" className="btn btn-dark">
          Login
        </Link>
        {isAuthenticated && (
          <button onClick={handleLogout} className="btn btn-dark">
            Cerrar Sesión
          </button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/Tienda"
          element={<Tienda onAddToCart={agregarAlCarrito} />}
        />
        <Route
          path="/Carrito"
          element={
            <Carrito
              productosEnCarrito={carrito}
              onRemoveFromCart={eliminarProductoDelCarrito}
              onModifyQuantity={modificarCantidadProducto}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
