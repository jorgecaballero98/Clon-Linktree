import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import style from "./loginView.module.css";

// const [currentUser, setCurrentUser] = useState(null);
/* 
States:
0.Inicializado
1. Cargando
2. Login Completo
3. Login pero sin registrar
4. No hay nadie logueado
5. Ya esta logueado
6. Nuevo username, click para continuar
7. No existe
*/

const LoginView = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }
  function handleUserNotLoggedIn() {
    setCurrentState(4);
  }

  if (currentState === 4) {
    return (
      <div className={style.loginView}>
        <div>
          <h1>Login</h1>
        </div>
        <button className={style.provider} onClick={handleOnClick}>
          Login with Google
        </button>
      </div>
    );
  }
  if (currentState === 5) {
    return (
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
};

export default LoginView;
