import React, { useState } from 'react';
import visa from './visa.jpg';
import master from './mastercard.jpg';
import americanExpress from './americanExpress.jpg';

const PaymentForm = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationMonthYear, setExpirationMonthYear] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardPhoto, setCardPhoto] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expirationDateError, setExpirationDateError] = useState('');
    const [cvvError, setCVVError] = useState('');

    const validateName = () => {
        const nameInput = document.getElementById('firstName');
        nameInput.setCustomValidity('');

        if (!nameInput.checkValidity() || nameInput.value === "") {
            if (nameInput.validity.patternMismatch || nameInput.value === "") {
                nameInput.setCustomValidity('Introduce un nombre válido');
                setNameError('Introduce un nombre con más de 3 caracteres');
                nameInput.reportValidity();
            }
            return false;
        }

        setNameError('');
        return true;
    };

    const validateLastName = () => {
        const lastNameInput = document.getElementById('lastName');
        lastNameInput.setCustomValidity('');

        if (!lastNameInput.checkValidity() || lastNameInput.value === "") {
            if (lastNameInput.validity.patternMismatch || lastNameInput.value === "") {
                lastNameInput.setCustomValidity('Introduce un apellido válido');
                setLastNameError('Introduce como mínimo un caracter');
                lastNameInput.reportValidity();
            }
            return false;
        }

        setLastNameError('');
        return true;
    };

    const validateCardNumber = () => {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const mastercardRegex = /^5[1-5][0-9]{14}$/;
        const amexRegex = /^3[47][0-9]{13}$/;

        if (!visaRegex.test(cardNumber) && !mastercardRegex.test(cardNumber) && !amexRegex.test(cardNumber)) {
            setCardNumberError('Introduce un número de tarjeta válido.');
            return false;
        }

        setCardNumberError('');

        // Detectar el tipo de tarjeta
        if (visaRegex.test(cardNumber)) {
            setCardPhoto(visa);
        } else if (mastercardRegex.test(cardNumber)) {
            setCardPhoto(master);
        } else if (amexRegex.test(cardNumber)) {
            setCardPhoto(americanExpress);
        } else {
            setCardPhoto('');
        }

        return true;
    };

    const validateExpirationDate = () => {
        const expirationInput = document.getElementById('expiration');
        expirationInput.setCustomValidity('');

        let currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        if (!expirationInput.checkValidity()) {
            expirationInput.setCustomValidity('Introduce una fecha de vencimiento válida (MM/YY).');
            setExpirationDateError('Introduce una fecha de vencimiento válida (MM/YY).');
            expirationInput.reportValidity();
            return false;
        }
        console.log(expirationMonthYear)
        let auxMonthYear = expirationMonthYear;
        let [month, year] = auxMonthYear.split('/');
        setExpirationYear(year);
        setExpirationMonth(month)
        currentYear = currentYear % 100;
        console.log(currentYear)
        console.log(year)
        const parsedYear = parseInt(year);
        const parsedMonth = parseInt(month, 10);

        if (parsedYear < currentYear || parsedYear > currentYear + 25) {
            expirationInput.setCustomValidity('El año de vencimiento debe estar entre el año actual y 25 años después.');
            setExpirationDateError('El año de vencimiento debe estar entre el año actual y 25 años después.');
            expirationInput.reportValidity();
            return false;
        }

        if (parsedYear === currentYear && parsedMonth < currentMonth) {
            setExpirationDateError('La tarjeta ha expirado.');
            return false;
        }

        if (parsedMonth < 1 || parsedMonth > 12) {
            setExpirationDateError('Introduce un mes de vencimiento válido.');
            return false;
        }

        const lastDayOfMonth = new Date(parsedYear, parsedMonth, 0).getDate();
        if (lastDayOfMonth < 1 || lastDayOfMonth > 31) {
            setExpirationDateError('Error en el cálculo del último día del mes.');
            return false;
        }

        const currentDay = new Date().getDate();
        if (parsedYear === currentYear && parsedMonth === currentMonth && currentDay > lastDayOfMonth) {
            setExpirationDateError('La tarjeta ha expirado.');
            return false;
        }

        setExpirationDateError('');
        return true;
    };

    const validateCVV = () => {
        const cvvRegex = /^[0-9]{3,4}$/;
        if (!cvvRegex.test(cvv)) {
            setCVVError('El CVV debe tener 3 o 4 dígitos.');
            return false;
        }

        setCVVError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isLastNameValid = validateLastName();
        const isCardNumberValid = validateCardNumber();
        const isExpirationDateValid = validateExpirationDate();
        const isCVVValid = validateCVV();
        console.log("HIMANO",expirationMonthYear)
        if (isNameValid && isLastNameValid && isCardNumberValid && isExpirationDateValid && isCVVValid) {
            onSubmit({
                firstName,
                lastName,
                cardNumber,
                expirationMonth,
                expirationYear,
                expirationMonthYear,
                cvv,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate id='exercici44' className='display-form-container'>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                    Nombre
                </label>
                <input
                    type="text"
                    className="form-control netflix-form"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    pattern='^[^\d]{3,}$'
                    onInput={validateName}
                />
                {nameError && <div className="text-danger netflix-danger">{nameError}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                    Apellido
                </label>
                <input
                    type="text"
                    className="form-control netflix-form"
                    id="lastName"
                    value={lastName}
                    pattern='^[^\d]*[a-zA-ZÀ-ÿ][^\d]*$'
                    onChange={(e) => setLastName(e.target.value)}
                    onInput={validateLastName}
                />
                {lastNameError && <div className="text-danger netflix-danger">{lastNameError}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                    Número de Tarjeta
                </label>
                <input
                    type="text"
                    className="form-control netflix-form"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    onBlur={validateCardNumber}
                />
                {cardNumberError && <div className="text-danger netflix-danger">{cardNumberError}</div>}
                {!cardNumberError && <img src={cardPhoto} alt='visa' height="100px" width="200px" />}
            </div>
            <div className="mb-3">
                <label htmlFor="expiration" className="form-label">
                    Fecha de Vencimiento (MM/YY)
                </label>
                <input
                    type="text"
                    className="form-control netflix-form"
                    id="expiration"
                    placeholder='Fecha de vencimiento (MM/AA)'
                    value={expirationMonthYear}
                    onChange={(e) => setExpirationMonthYear(e.target.value)}
                    pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                    onBlur={validateExpirationDate}
                />
                {expirationDateError && (
                    <div className="text-danger netflix-danger">{expirationDateError}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                    CVV
                </label>
                <input
                    type="text"
                    className="form-control netflix-form "
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                    onBlur={validateCVV}
                />
                {cvvError && <div className="text-danger netflix-danger">{cvvError}</div>}
            </div>
            <button type="submit" className="btn btn-primary netflix-btn">
                Siguiente
            </button>
        </form>
    );
};

export default PaymentForm;
