import { useState } from "react";
import PropTypes from "prop-types";

const Descuentos = ({ aplicarDescuento }) => {
  const [formularioCompletado, setFormularioCompletado] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((name, email)) {
      setFormularioCompletado(true);
      aplicarDescuento();
    }
  };

  return (
    <div>
      <div style={{ marginLeft: "30px", marginTop: "30px" }}>
        <h4>Obtén tu descuento</h4>
      </div>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        {!formularioCompletado ? (
          <>
            <h5>
              ¡Regístrate y obtén un 15% de descuento en tu próxima compra!
            </h5>
            <p>
              En Store, nos dedicamos a ofrecerte productos de alta calidad que
              harán tu día a día más fácil y especial.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Obtener Descuento</button>
            </form>
          </>
        ) : (
          <h5>¡Gracias por registrarte! Tu descuento ha sido aplicado.</h5>
        )}
      </div>
    </div>
  );
};

Descuentos.propTypes = {
  aplicarDescuento: PropTypes.func.isRequired,
};

export default Descuentos;
