import React from 'react';

const DisplayFormData = ({ formData }) => {
    console.log("LLEGA AQUI")
  return (
    <div>
      <h2>Datos del Formulario:</h2>
      <p>Primer Email: {formData.firstEmail}</p>
      <p>Segundo Email: {formData.secondEmail}</p>
      <p>Password: {formData.password}</p>
      <p>Plan Seleccionado: {formData.selectedPlan}</p>
      <p>Nombre: {formData.firstName}</p>
      <p>Apellido: {formData.lastName}</p>
      <p>Número de Tarjeta: {formData.cardNumber}</p>
      <p>Fecha de Vencimiento: {formData.expirationMonth}/{formData.expirationYear}</p>
      <p>CVV: {formData.cvv}</p>
    </div>
  );
};

export default DisplayFormData;
