import React, { useState } from 'react';

const CreatePasswordComponent = ({ onSubmit }) => {
  const [email2, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email2)) {
      setEmailError('Introduce un email válido.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6 || password.length > 60) {
      setPasswordError('La contraseña debe tener entre 6 y 60 caracteres.');
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email2}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
        />
        {emailError && <div className="text-danger">{emailError}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
        />
        {passwordError && <div className="text-danger">{passwordError}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Siguiente
      </button>
    </form>
  );
};

export default CreatePasswordComponent;
