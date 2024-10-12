import { useState } from "react";
import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      setMessage("Por favor completa todos los campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setMessage("Registrer successful!");

      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        isAdmin: isAdmin,
      });
      navigate("/Tienda");

      console.log("User registered:", user.uid);
      setMessage("");
    } catch (error) {
      console.error("Error registering:", error);
      if (error.code === "auth/email-already-in-use") {
        setMessage(
          "Este correo electrónico ya está en uso. Por favor utiliza otro."
        );
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">
          <i className="bi bi-person-plus-fill me-2"></i> {/* Ícono de registro */}
          Registro
        </h2>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label className="form-check-label">Registrar como Admin</label>
        </div>
        <button onClick={handleRegister} className="btn btn-primary w-100">
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Register;
