import React, { useState } from 'react';
import { useAuth } from '../ruteo/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";           // Para estilos

// Para verificar que no registre con el mismo correo
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../conexion/firebase';

function RegisterForm() {

  const { register } = useAuth();             // Registra usuario
  
  const [email, setEmail] = useState('');       // Variables para correo
  const [password, setPassword] = useState(''); // Variable para password
  
  const navigate = useNavigate();               // Navegación

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);
      //await registerUser(email, password);    // Verifica correo ya registrado
      navigate('/iniciarsesion'); // Redirigir a ruta /iniciarsesion
    } catch (error) {
      toast("Se guardo con éxito...", {type:'success', autoClose:2000 });
      console.error('Error al registrar usuario:', error.message);
    }
  }

  return (
    
    <div form className='card card-body' onSubmit={RegisterForm}>
          <div className='col-md-12'>
          </div>
        
      
      <button className='btn btn-primary btn-block'>
          Registro de nuevo usuario
      </button>
      
      <form onSubmit={handleRegister}>
        <div className='form-group input-group'>
            <div className='input-group-text bd-light'>
              <i className='material-icons'>mail</i>
            </div>
            <input className='form-control float-start' type='email' placeholder='Email...'  
               onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
    

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>password</i>
          </div>
          <input className='form-control float-start' type='password' placeholder='Contraseña...'  
            onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

        <div className='col-md-12'>
          <button onClick={handleRegister} className='input-group-text bd-light' >
            Registrarse
          </button>
        </div>

      </form>
    </div>
    
  );
}

export default RegisterForm;
