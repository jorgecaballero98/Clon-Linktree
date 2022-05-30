import './App.css';

function App() {
  return (
    <div className='main-container-app'>
      <h1>
      Bienvenido a Tree Link
      </h1>
      <h4>
      Esta es una aplicación creada para compartir tus links entre usuarios.
      </h4>
      <p>
        Para empezar, debes iniciar sesión o crear una cuenta.
      </p>

      <div className='login-container'>
        <button>
          <a href='/login'>Comenzar</a>
        </button>
      </div>
    </div>
  );
}

export default App;
