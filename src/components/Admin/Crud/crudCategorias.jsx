import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const CrudCategorias = ({ onCategoryChange }) => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [editar, setEditar] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriasIniciales = [
        "Electronics",
        "Jewelery",
        "Men's Clothing",
        "Women's Clothing",
      ];
      setCategorias(categoriasIniciales);
    };

    fetchCategorias();
  }, []);

  const agregarCategoria = () => {
    if (!nuevaCategoria) return;
    setCategorias([...categorias, nuevaCategoria]);
    setNuevaCategoria("");
    onCategoryChange(nuevaCategoria);
  };

  const eliminarCategoria = (categoria) => {
    setCategorias(categorias.filter((cat) => cat !== categoria));
  };

  const actualizarCategoria = () => {
    setCategorias(
      categorias.map((cat) => (cat === editar ? nuevaCategoria : cat))
    );
    setNuevaCategoria("");
    setEditar(null);
    onCategoryChange(nuevaCategoria);
  };

  const handleEdit = (categoria) => {
    setNuevaCategoria(categoria);
    setEditar(categoria);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editar) {
      actualizarCategoria();
    } else {
      agregarCategoria();
    }
  };

  return (
    <div className="card">
    <div className="card-header">
      <h2 className="mb-0">CRUD Categorías</h2>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nueva Categoría"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            {editar ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {categorias.map((categoria, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{categoria}</span>
            <div>
              <button
                className="btn btn-sm btn-outline-warning me-2"
                onClick={() => handleEdit(categoria)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => eliminarCategoria(categoria)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

CrudCategorias.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default CrudCategorias;
