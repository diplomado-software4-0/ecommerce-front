import { useEffect, useState } from "react";
import Destacados from "../Destacados/index";
import Ofertas from "../Ofertas/index";
import ProdPopulares from "../prodPopulares/index";

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div style={{ marginLeft: "30px", marginTop: "30px", textAlign: "center" }}>
      <section>
        <h4>Bienvenido a Store</h4>
        <p>
          En Store, nos dedicamos a ofrecerte productos de alta calidad que
          harán tu día a día más fácil y especial.
          <br />
          Nos apasiona brindarte la mejor experiencia de compra, combinando lo
          último en tendencias con precios accesibles.
        </p>
      </section>

      <Destacados productos={productos} />
      <Ofertas productos={productos} />
      <ProdPopulares productos={productos} />
    </div>
  );
};

export default Inicio;
