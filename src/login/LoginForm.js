import React, { useState } from 'react';
import { useAuth } from '../ruteo/AuthContext'; // (7). Importando contexto
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  
  const { signIn } = useAuth();                 // (7). Usando el contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();


  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    try {
      await signIn(email, password);
      // Inicio de sesión exitoso: limpiar el error
      setError(null);
      navigate('/sistema-crud'); // Redirigir a ruta /sistema-crud
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  }

  return (
    <div className='card card-body' onSubmit={handleSignIn}>
        <button className='btn btn-primary btn-block'>
            Iniciar Sesion
        </button>
      
      <form onSubmit={handleSignIn}>

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>mail</i>
          </div>
          <input className='form-control float-start' type="email" placeholder='Email...' 
          onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>password</i>
          </div>
          <input className='form-control float-start' type="password" placeholder='Contraseña...' 
          onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      

        <div className='col-md-12'>
          <button onClick={handleSignIn} className='input-group-text bd-light' >
            Iniciar sesion
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;



/*
const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    try {
      await signIn(email, password);
      // Inicio de sesión exitoso: limpiar el error
      setError(null);
      navigate('/sistema-crud'); // Redirigir a ruta /sistema-crud
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  }
*/
