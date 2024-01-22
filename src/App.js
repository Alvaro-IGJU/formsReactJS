import logo from './logo.svg';
import './App.css';
import Form1 from './Components/Form1';
import React, { useState } from 'react';
import SubscriptionForm from './Components/SubscriptionForm';
import CreatePasswordComponent from './Components/CreatePasswordComponent';
import SelectPlanForm from './Components/SelectPlanForm';
import PaymentForm from './Components/PaymentForm';
import DisplayFormData from './Components/DisplayFormData';

function App() {
  const [formData, setFormData] = useState({
    firstEmail: "",
    secondEmail: "",
    password: "",
    selectedPlan: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expirationMonth:"",
    expirationYear: "",
    cvv: ""
  });
  const [step, setStep] = useState(1);

  const handleSubscriptionSubmit = (data) => {

    if(step === 1){
      setFormData(prevData => ({
        ...prevData,
        firstEmail: data.email, 
      }));
    }else if(step === 2){
      setFormData(prevData => ({
        ...prevData,
        secondEmail: data.email2,
        password: data.password 
      }));
    }else if(step === 3){
      setFormData(prevData => ({
        ...prevData,
        selectedPlan: data.selectedPlan 
      }));
    }else if(step === 4){
      console.log("esta")
      console.log(data)
      setFormData(prevData => ({
        ...prevData,
        firstName: data.firstName,
        lastName: data.lastName,
        cardNumber: data.cardNumber,
        expirationMonth:data.expirationMonth,
        expirationYear:data.expirationYear,
        cvv: data.cvv
      }));
    }
    
    setStep(step + 1);
    console.log(step)
    console.log(formData)

  };

  return (
    <div className="App">
      <h2>Exercici 3 Validació de formularis en React</h2>
      <Form1 />
      <h2>Exercici 4 Formulari de registre múltiple</h2>
      {step === 1 && <SubscriptionForm onSubmit={handleSubscriptionSubmit} />}
      {step === 2 && <CreatePasswordComponent onSubmit={handleSubscriptionSubmit}/>}
      {step === 3 && <SelectPlanForm onSubmit={handleSubscriptionSubmit}/>}
      {step === 4 && <PaymentForm onSubmit={handleSubscriptionSubmit}/>}
      {step === 5 && <DisplayFormData formData={formData} />}

    </div>
  );
}

export default App;
