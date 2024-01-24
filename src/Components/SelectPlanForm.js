import React, { useState } from 'react';

const SelectPlanForm = ({ onSubmit }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [planError, setPlanError] = useState('');

  const validatePlanSelection = () => {
    const planSelect = document.getElementById('plan');

    planSelect.setCustomValidity('');

    if (!planSelect.checkValidity() || planSelect.value === "") {
      planSelect.setCustomValidity('Por favor, selecciona un plan antes de continuar.');
      setPlanError('Por favor, selecciona un plan antes de continuar.');
      planSelect.reportValidity();
      return false;
    }

    setPlanError('');
    return true;
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
    setPlanError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePlanSelection()) {
      onSubmit({ selectedPlan });
    }
  };

  return (
    <form onSubmit={handleSubmit} id='exercici43' noValidate className='display-form-container'>
      <div className="mb-3">
        <label htmlFor="plan" className="form-label">
          Selecciona un plan
        </label>
        <select
          id="plan"
          className="form-control netflix-form"
          value={selectedPlan}
          onChange={handlePlanChange}
          onBlur={validatePlanSelection}
        >
          <option value="">Selecciona un plan</option>
          <option value="plan1">Plan 1</option>
          <option value="plan2">Plan 2</option>
          <option value="plan3">Plan 3</option>
        </select>
        {planError && <div className="text-danger netflix-danger">{planError}</div>}
      </div>
      <button type="submit" className="btn btn-primary netflix-btn">
        Siguiente
      </button>
    </form>
  );
};

export default SelectPlanForm;
