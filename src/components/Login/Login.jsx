import { useState } from "react";
import { auth, firestore } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const users = userCredential.user;

      setMessage("Login successful!");
      const userDoc = doc(firestore, "users", users.uid);
      const docSnap = await getDoc(userDoc);
      console.log("UID del usuario:", users.uid);
      console.log("Datos de Firestore:", docSnap.data());

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const isAdmin = userData.isAdmin;
        console.log("Usuario encontrado en Firestore:", userData);

        onLogin(isAdmin);

        navigate(isAdmin ? "/admin" : "/Tienda");
      } else {
        console.log("No se encontró el documento del usuario en Firestore.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">
          <i className="bi bi-person-circle me-2"></i> {/* Icono de usuario */}
          Login
        </h2>
        {message && (
          <div className={`alert ${isError ? "alert-danger" : "alert-success"}`} role="alert">
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
        <button onClick={handleLogin} className="btn btn-primary w-100">
          Login
        </button>
      </div>
    </div>
  );
};
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default Login;
