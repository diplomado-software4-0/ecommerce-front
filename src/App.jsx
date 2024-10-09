import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Inicio from "./components/Inicio/index";
import Tienda from "./components/Tienda/index";
import Carrito from "./components/Carrito/index";
import Login from "./components/Login/Login";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";
import Register from "./components/Login/Register";

const App = () => {
  const [carrito, setCarrito] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  const handleLogin = (isAdmin) => {
    setIsAdmin(isAdmin);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Router>
      <nav style={{ margin: "5px" }}>
        {isAuthenticated ? (
          <>
            <Link to="/" className="btn btn-dark">
              Inicio
            </Link>
            <Link to="/Tienda" className="btn btn-dark">
              Tienda
            </Link>
            <Link to="/Carrito" className="btn btn-dark">
              Carrito
            </Link>
            {isAdmin && (
              <Link to="/admin" className="btn btn-dark">
                Admin Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className="btn btn-dark">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="btn btn-dark">
              Inicio
            </Link>
            <Link to="/Tienda" className="btn btn-dark">
              Tienda
            </Link>
            <Link to="/Carrito" className="btn btn-dark">
              Carrito
            </Link>
            <Link to="/login" className="btn btn-dark">
              Login
            </Link>
            <Link to="/register" className="btn btn-dark">
              Register
            </Link>
          </>
        )}
      </nav>
      <Routes>
        {/* Rutas accesibles para usuarios no autenticados */}
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
        <Route path="/register" element={<Register />} />

        {/* Rutas accesibles solo para usuarios autenticados */}
        {isAuthenticated && (
          <>
            {/* Si el usuario es admin, mostrar solo el Admin Dashboard */}
            {isAdmin ? (
              <Route path="/admin" element={<AdminDashboard />} />
            ) : (
              // Redirigir a la página de inicio si un usuario normal intenta acceder al Admin
              <Route path="/admin" element={<Navigate to="/" />} />
            )}
            {/* Redirigir a la tienda u otra ruta si se intenta acceder a /login o /register */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        )}

        {/* Si el usuario no está autenticado, redirigir a inicio en caso de rutas no definidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
