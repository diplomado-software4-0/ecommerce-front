import { useState } from "react";
import { auth, firestore } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default Login;
