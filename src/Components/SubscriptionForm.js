import React, { useState } from 'react';

const SubscriptionForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = () => {
    // Pots implementar la lògica de validació d'email aquí
    // En aquest exemple, només comprovarem si l'email té un format vàlid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Introdueix un email vàlid');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleBlur = () => {
    validateEmail();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      onSubmit({ email });
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
        />
        {emailError && <div className="text-danger">{emailError}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Empezar
      </button>
    </form>
  );
};

export default SubscriptionForm;
