import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container mt-4">
    <h2>CRUD Productos</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editar ? actualizarProducto() : agregarProducto();
      }}
      className="mb-4"
    >
      <div className="row mb-2">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={nuevoProducto.title}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, title: e.target.value })
            }
            required
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Precio"
            value={nuevoProducto.price}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, price: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Descripción"
          value={nuevoProducto.description}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, description: e.target.value })
          }
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="URL de la imagen"
          value={nuevoProducto.image}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, image: e.target.value })
          }
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editar ? "Actualizar" : "Agregar"}
      </button>
    </form>

    <ul className="list-group">
      {productos.map((producto) => (
        <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{producto.title}</h5>
            <p>Precio: ${producto.price}</p>
            <p>{producto.description}</p>
            <img
              src={producto.image}
              alt={producto.title}
              style={{ width: "100px" }}
              className="img-thumbnail"
            />
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-warning me-2"
              onClick={() => handleEdit(producto)}
            >
              Editar
            </button>
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => eliminarProducto(producto.id)}
            >
              Eliminar
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={() => onAddToCart(producto)}
            >
              Agregar al carrito
            </button>
          </div>
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
