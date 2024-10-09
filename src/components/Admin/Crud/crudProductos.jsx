import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CrudProductos = ({ onAddToCart }) => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [editar, setEditar] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProductos(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const agregarProducto = async () => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        nuevoProducto
      );
      setProductos([...productos, response.data]);
      setNuevoProducto({ title: "", price: "", description: "", image: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const actualizarProducto = async () => {
    if (editar) {
      try {
        const response = await axios.put(
          `https://fakestoreapi.com/products/${editar.id}`,
          nuevoProducto
        );
        setProductos(
          productos.map((producto) =>
            producto.id === editar.id ? response.data : producto
          )
        );
        setEditar(null);
        setNuevoProducto({ title: "", price: "", description: "", image: "" });
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (producto) => {
    setNuevoProducto(producto);
    setEditar(producto);
  };

  return (
    <div>
      <h2>CRUD Productos</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editar ? actualizarProducto() : agregarProducto();
        }}
      >
        <input
          type="text"
          placeholder="Título"
          value={nuevoProducto.title}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, title: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.price}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, price: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoProducto.description}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, description: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={nuevoProducto.image}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, image: e.target.value })
          }
          required
        />
        <button type="submit">{editar ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <h3>{producto.title}</h3>
            <p>Precio: {producto.price}</p>
            <p>{producto.description}</p>
            <img
              src={producto.image}
              alt={producto.title}
              style={{ width: "100px" }}
            />
            <button onClick={() => handleEdit(producto)}>Editar</button>
            <button onClick={() => eliminarProducto(producto.id)}>
              Eliminar
            </button>
            <button onClick={() => onAddToCart(producto)}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

CrudProductos.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};
export default CrudProductos;
