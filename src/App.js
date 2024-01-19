import logo from './logo.svg';
import './App.css';
import Form1 from './Components/Form1';
import React, { useState } from 'react';
import SubscriptionForm from './Components/SubscriptionForm';
import CreatePasswordComponent from './Components/CreatePasswordComponent';

function App() {
  const [formData, setFormData] = useState({
    firstEmail: ""
  });
  const [step, setStep] = useState(1);

  const handleSubscriptionSubmit = (data) => {
    setFormData(prevData => ({
      ...prevData,
      firstEmail: data.email, 
    }));
    setStep(step + 1);
    console.log(data.email)

  };

  return (
    <div className="App">
      <h2>Exercici 3 Validació de formularis en React</h2>
      <Form1 />
      <h2>Exercici 4 Formulari de registre múltiple</h2>
      {step === 1 && <SubscriptionForm onSubmit={handleSubscriptionSubmit} />}
      {step === 2 && <CreatePasswordComponent onSubmit={handleSubscriptionSubmit}/>}
      {/* {step === 3 && } */}
    </div>
  );
}

export default App;
