import React, { useState } from 'react';

const SubscriptionForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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
    <form onSubmit={handleSubmit} noValidate id='exercici41' className='display-form-container'>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control netflix-form"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInput={handleBlur}
        />
        {emailError && <div className="text-danger netflix-danger">{emailError}</div>}
      </div>
      <button type="submit" className="btn btn-primary netflix-btn">
        Empezar   
      </button>
    </form>
  );
};

export default SubscriptionForm
