import Destacados from "../Destacados";
import Ofertas from "../Ofertas";
import ProdPopulares from "../prodPopulares";
const Inicio = () => {
  const styled = {
    lol: {
      display: "flex",
      textAlign: "center",
    },
  };
  return (
    <div style={{ marginLeft: "30px", marginTop: "30px" }}>
      <section>
        <h4 style={styled.lol}>Bienvenido a Store</h4>{" "}
        <p>
          En Store, nos dedicamos a ofrecerte productos de alta calidad que
          harán tu día a día más fácil y especial.
          <br /> Nos apasiona brindarte la mejor experiencia de compra,
          combinando lo último en tendencias con precios accesibles.
        </p>
      </section>
      <Destacados />
      <Ofertas />
      <ProdPopulares />
    </div>
  );
};

export default Inicio;
