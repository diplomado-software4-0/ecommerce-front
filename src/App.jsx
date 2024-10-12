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
import AdminDashboard from "./components/Admin/adminDashBoard";
import "./App.css";
import Register from "./components/Login/Register";
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              
              Tu Tienda
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Tienda" className="nav-link">
                    Tienda
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Carrito" className="nav-link">
                  <FaShoppingCart className="me-2" /> {/* Ícono de carrito */}
                    ({carrito.length})
                  </Link>
                </li>
                {isAuthenticated && isAdmin && (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </ul>

              <div className="d-flex">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="btn btn-outline-danger">
                    Cerrar Sesión
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-primary me-2">
                      <FaUser className="me-1" /> {/* Ícono de usuario */}
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-outline-secondary">
                      Registrar
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        {/* Rutas accesibles para todos los usuarios */}
        <Route path="/" element={<Inicio />} />
        <Route path="/Tienda" element={<Tienda onAddToCart={agregarAlCarrito} />} />
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
            {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        )}

        {/* Redirigir rutas no definidas a inicio */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;