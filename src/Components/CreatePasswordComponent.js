import React, { useState } from 'react';

const CreatePasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('El email es obligatorio.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Formato de email no válido.');
    } else if (email.length < 5 || email.length > 50) {
      setEmailError('El email debe tener entre 5 y 50 caracteres.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('El password es obligatorio.');
    } else if (password.length < 6 || password.length > 60) {
      setPasswordError('El password debe tener entre 6 y 60 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleNextClick = () => {
    validateEmail();
    validatePassword();

    // Si no hay errores, puedes realizar acciones adicionales aquí.
    if (!emailError && !passwordError) {
      console.log('Información válida. Realizar acciones adicionales si es necesario.');
    }
  };

  return (
    <div>
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validateEmail}
      />
      {emailError && <p>{emailError}</p>}

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={validatePassword}
      />
      {passwordError && <p>{passwordError}</p>}

      <button onClick={handleNextClick}>Siguiente</button>
    </div>
  );
};

export default CreatePasswordComponent;
