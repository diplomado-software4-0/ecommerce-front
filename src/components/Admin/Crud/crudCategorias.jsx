import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
    <div>
      <h2>CRUD Categorías</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nueva Categoría"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          required
        />
        <button type="submit">{editar ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {categorias.map((categoria, index) => (
          <li key={index}>
            <h3>{categoria}</h3>
            <button onClick={() => handleEdit(categoria)}>Editar</button>
            <button onClick={() => eliminarCategoria(categoria)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

CrudCategorias.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default CrudCategorias;
