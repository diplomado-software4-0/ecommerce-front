import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Inicio from "./components/Inicio/index";
import Product from "./components/Producto/index";
import Descuentos from "./components/Descuentos";
import { useState } from "react";

const App = () => {
  const [descuentoActivo, setDescuentoActivo] = useState(false);

  const aplicarDescuento = () => {
    setDescuentoActivo(true);
  };
  return (
    
    // <Router>
    //   <nav style={{ margin: "5px" }}>
    //     <Link to="/" className="btn btn-dark">
    //       Inicio
    //     </Link>
    //     <Link to="/Productos" className="btn btn-dark">
    //       Productos
    //     </Link>
    //     <Link to="/Descuetos" className="btn btn-dark">
    //       Descuetos
    //     </Link>
    //   </nav>
    //   <Routes>
    //     <Route path="/" element={<Inicio />} />
    //     <Route
    //       path="/Productos"
    //       element={<Product descuentoActivo={descuentoActivo} />}
    //     />
    //     <Route
    //       path="/Descuetos"
    //       element={<Descuentos aplicarDescuento={aplicarDescuento} />}
    //     />
    //   </Routes>
    // </Router>
  );
};

export default App;
