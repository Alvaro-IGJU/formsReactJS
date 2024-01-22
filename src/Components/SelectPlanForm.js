import React, { useState } from 'react';

const SelectPlanForm = ({ onSubmit }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [planError, setPlanError] = useState('');

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
    setPlanError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPlan) {
      onSubmit({ selectedPlan });
    } else {
      setPlanError('Por favor, selecciona un plan antes de continuar.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="plan" className="form-label">
          Selecciona un plan
        </label>
        <select
          id="plan"
          className="form-control"
          value={selectedPlan}
          onChange={handlePlanChange}
        >
          <option value="">Selecciona un plan</option>
          <option value="plan1">Plan 1</option>
          <option value="plan2">Plan 2</option>
          <option value="plan3">Plan 3</option>
        </select>
        {planError && <div className="text-danger">{planError}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Siguiente
      </button>
    </form>
  );
};

export default SelectPlanForm;
