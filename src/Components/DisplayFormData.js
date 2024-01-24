import React from 'react';


const DisplayFormData = ({ formData }) => {
  return (
    <div className="display-form-container">
      <h2 className="display-form-heading"><b>Datos del Formulario:</b></h2>
      <p className="display-form-paragraph"><b>Primer Email: </b>{formData.firstEmail}</p>
      <p className="display-form-paragraph"><b>Segundo Email: </b>{formData.secondEmail}</p>
      <p className="display-form-paragraph"><b>Password: </b>{formData.password}</p>
      <p className="display-form-paragraph"><b>Plan Seleccionado: </b>{formData.selectedPlan}</p>
      <p className="display-form-paragraph"><b>Nombre: </b>{formData.firstName}</p>
      <p className="display-form-paragraph"><b>Apellido: </b>{formData.lastName}</p>
      <p className="display-form-paragraph"><b>Número de Tarjeta: </b>{formData.cardNumber}</p>
      <p className="display-form-paragraph">
      <b>Fecha de Vencimiento:</b> {formData.expirationMonth}/{formData.expirationYear}
      </p>
      <p className="display-form-paragraph"><b>CVV: </b>{formData.cvv}</p>
    </div>
  );
};

export default DisplayFormData;
