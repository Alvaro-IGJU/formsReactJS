import React, { useState } from 'react';
import visa from './visa.jpg';
import master from './mastercard.jpg';
import americanExpress from './americanExpress.jpg';

const PaymentForm = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardPhoto, setCardPhoto] = useState('')
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expirationDateError, setExpirationDateError] = useState('');
    const [cvvError, setCVVError] = useState('');

    const validateName = (name) => {
        if (name.length < 3 || /\d/.test(name)) {
            setNameError('El nombre debe tener al menos 3 caracteres y no puede contener números.');
            return false;
        }
        setNameError('');
        return true;
    };

    const validateLastName = (lastName) => {
        console.log(lastName.length, "IAIAAIAIA")
        if ((lastName.length === 0 || /\d/.test(lastName))) {
            setLastNameError('El apellido debe tener al menos 1 caracter y no puede contener números.');
            return false;
        }
        setLastNameError('');
        return true;
    };

    const validateCardNumber = (number) => {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const mastercardRegex = /^5[1-5][0-9]{14}$/;
        const amexRegex = /^3[47][0-9]{13}$/;

        if (!visaRegex.test(number) && !mastercardRegex.test(number) && !amexRegex.test(number)) {
            setCardNumberError('Introduce un número de tarjeta válido.');
            return false;
        }

        setCardNumberError('');

        // Detectar el tipo de tarjeta
        let cardType;
        if (visaRegex.test(number)) {
            setCardPhoto(visa)
        } else if (mastercardRegex.test(number)) {
            setCardPhoto(master)

        } else if (amexRegex.test(number)) {
            setCardPhoto(americanExpress)

        }else{
            setCardPhoto('')
        }


        return true;
    };

    const validateExpirationDate = (month, year) => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Meses van de 0 a 11
      
        if (year < currentYear || year > currentYear + 25) {
          setExpirationDateError('El año de vencimiento debe estar entre el año actual y 25 años después.');
          return false;
        }
      
        if (year === currentYear && month < currentMonth) {
          setExpirationDateError('La tarjeta ha expirado.');
          return false;
        }
      
        if (month < 1 || month > 12) {
          setExpirationDateError('Introduce un mes de vencimiento válido.');
          return false;
        }
      
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const currentDay = new Date().getDate();
      
        if (currentYear === year && currentMonth === month && currentDay > lastDayOfMonth) {
          setExpirationDateError('La tarjeta ha expirado.');
          return false;
        }
      
        setExpirationDateError('');
        return true;
      };
          

    const validateCVV = (cvvNumber) => {
        const cvvRegex = /^[0-9]{3,4}$/;
        if (!cvvRegex.test(cvvNumber)) {
            setCVVError('El CVV debe tener 3 o 4 dígitos.');
            return false;
        }
        setCVVError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNameValid = validateName(firstName);
        const isLastNameValid = validateLastName(lastName);
        const isCardNumberValid = validateCardNumber(cardNumber);
        const isExpirationDateValid = validateExpirationDate(
            parseInt(expirationMonth, 10),
            parseInt(expirationYear, 10)
        );
        const isCVVValid = validateCVV(cvv);

        if (isNameValid && isLastNameValid && isCardNumberValid && isExpirationDateValid && isCVVValid) {
            onSubmit({
                firstName,
                lastName,
                cardNumber,
                expirationMonth,
                expirationYear,
                cvv,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                    Nombre
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => validateName(firstName)}
                />
                {nameError && <div className="text-danger">{nameError}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                    Apellido
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => validateLastName(lastName)}
                />
                {lastNameError && <div className="text-danger">{lastNameError}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                    Número de Tarjeta
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    onBlur={() => validateCardNumber(cardNumber)}
                />
                {cardNumberError && <div className="text-danger">{cardNumberError}</div>}

                {!cardNumberError && <img src={cardPhoto} alt='visa' height="100px" width="100px"></img>}
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="expirationMonth" className="form-label">
                        Mes de Vencimiento
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="expirationMonth"
                        value={expirationMonth}
                        onChange={(e) => setExpirationMonth(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="expirationYear" className="form-label">
                        Año de Vencimiento
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="expirationYear"
                        value={expirationYear}
                        onChange={(e) => setExpirationYear(e.target.value)}
                    />
                </div>
                {expirationDateError && (
                    <div className="text-danger col-md-12 mb-3">{expirationDateError}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                    CVV
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                    onBlur={() => validateCVV(cvv)}
                />
                {cvvError && <div className="text-danger">{cvvError}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
                Siguiente
            </button>
        </form>
    );
};

export default PaymentForm;
