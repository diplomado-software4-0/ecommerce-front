// import React , { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock, faEyeSlash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

// export const Login = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = () => {
//         // Simulación de autenticación
//         if (username === 'test' && password === 'password') {
//             onLogin();  // Llama a la función de autenticación del App.jsx
//           navigate('/');  // Redirige a la vista principal
//         } else {
//           alert('Invalid credentials');
//         }
//       };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//     <div className="card p-4 shadow-lg" style={{ width: '22rem' }}>
//       <div className="text-center mb-4">
//         <FontAwesomeIcon icon={faUserCircle} size="6x" className="text-primary" />
//       </div>
//       <div className="form-group mb-3">
//         <div className="input-group">
//           <div className="input-group-prepend">
//             <span className="input-group-text">
//               <FontAwesomeIcon icon={faUser} className="text-primary" />
//             </span>
//           </div>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="form-group mb-3">
//         <div className="input-group">
//           <div className="input-group-prepend">
//             <span className="input-group-text">
//               <FontAwesomeIcon icon={faLock} className="text-primary" />
//             </span>
//           </div>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="input-group-append">
//             <span className="input-group-text">
//               <FontAwesomeIcon icon={faEyeSlash} className="text-primary" />
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="form-group d-flex justify-content-between align-items-center mb-4">
//         <div className="form-check">
//           <input type="checkbox" className="form-check-input" id="remember" />
//           <label className="form-check-label text-primary" htmlFor="remember">
//             Remember me
//           </label>
//         </div>
//         <a href="#" className="text-primary">Forgot password?</a>
//       </div>
//       <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>LOGIN</button>
//       <button className="btn btn-secondary w-100" onClick={() => navigate('/register')}>REGISTER</button>
//     </div>
//   </div>
//   )
// }


// export default Login

// src/components/comp/Login.js
import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Llama a la función de login del componente App
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
