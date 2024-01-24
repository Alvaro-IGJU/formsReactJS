import React, { useState } from 'react';

const CreatePasswordComponent = ({ onSubmit }) => {
  const [email2, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    const emailInput = document.getElementById('email');

    emailInput.setCustomValidity('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      emailInput.setCustomValidity('Introduce un email válido');
      setEmailError('Introduce un email válido');
      emailInput.reportValidity();
      return false;
    }

    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    const passwordInput = document.getElementById('password');

    passwordInput.setCustomValidity('');

    if (!passwordInput.checkValidity() || passwordInput.value === "") {
      if (passwordInput.validity.patternMismatch || passwordInput.value === "") {
        passwordInput.setCustomValidity('La contraseña debe tener entre 6 y 60 caracteres.');
        setPasswordError('La contraseña debe tener entre 6 y 60 caracteres.');
        passwordInput.reportValidity();
      }
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleBlur = (field) => {
    if (field === 'email') {
      validateEmail();
    } else if (field === 'password') {
      validatePassword();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      onSubmit({ email2, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} id="exercici42" noValidate className='display-form-container'>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control netflix-form"
          id="email"
          value={email2}
          onChange={(e) => setEmail(e.target.value)}
          onInput={() => handleBlur('email')}
        />
        {emailError && <div className="text-danger netflix-danger" noValidate>{emailError}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control netflix-form"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInput={() => handleBlur('password')}
          pattern=".{6,60}" 
          title="La contraseña debe tener entre 6 y 60 caracteres."
        />
        {passwordError && <div className="text-danger netflix-danger">{passwordError}</div>}
      </div>
      <button type="submit" className="btn btn-primary netflix-btn">
        Siguiente
      </button>
    </form>
  );
};

export default CreatePasswordComponent;
