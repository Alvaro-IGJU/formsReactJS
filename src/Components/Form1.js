import React, { useState } from 'react';

const App = () => {
    const [formData, setFormData] = useState({
        input1: '',
        input2: '',
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        select: [],
    });

    const [validationMessages, setValidationMessages] = useState({
        input1: '',
        input2: '',
        checkbox: '',
        select: '',
    });

    const [areCorrect, setAreCorrect] = useState({
        input1: '',
        input2: '',
        checkbox: '',
        select: '',
    });
    const firstInput = () => {
        const isValid = formData.input1.trim().length >= 3 && 5 >= formData.input1.trim().length;
        setValidationMessages((prevMessages) => ({
            ...prevMessages,
            input1: isValid ? 'Text correcte' : 'Text incorrecte',
        }));
        setAreCorrect((areCorrects) => ({
            ...areCorrects,
            input1: isValid,
        }));
    };

    const emailInput = (e) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(e.target.value.trim());
        setFormData({ ...formData, input2: e.target.value });
        setValidationMessages((prevMessages) => ({
            ...prevMessages,
            input2: isValid ? 'Email correcte' : 'Format d\'email incorrecte',
        }));
        setAreCorrect((areCorrects) => ({
            ...areCorrects,
            input2: isValid,
        }));
    };


    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        const checkboxName = e.target.name;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          [checkboxName]: isChecked,
        }));
    
        const selectedCheckboxes = Object.values(formData).filter((value) => value === true);
        const isValid = selectedCheckboxes.length === 2;
    
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          checkbox: isValid ? 'Ha seleccionat 2 opcions correctament' : 'Ha de seleccionar 2 opcions',
        }));
    
        setAreCorrect((prevAreCorrects) => ({
          ...prevAreCorrects,
          checkbox: isValid,
        }));
      };

    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, select: selectedOptions });
        setValidationMessages((prevMessages) => ({
            ...prevMessages,
            select: selectedOptions.length === 2 ? 'Ha seleccionat 2 opcions correctament' : 'Ha de seleccionar 2 opcions',
        }));
        setAreCorrect((areCorrects) => ({
            ...areCorrects,
            select: selectedOptions.length === 2,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones adicionales o enviar el formulario si todas las validaciones son correctas
        console.log('Formulario enviado:', formData);
        console.log('Estados:', areCorrect);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Input 1:
                        <input
                            type="text"
                            className={areCorrect.input1 ? "valid" : "invalid"}
                            name="input1"
                            value={formData.input1}
                            onBlur={firstInput}
                            onChange={(e) => setFormData({ ...formData, input1: e.target.value })}
                            required
                        />
                        <div>{validationMessages.input1}</div>
                    </label>
                </div>
                <div>
                    <label>
                        Input 2:
                        <input
                            type="text"
                            className={areCorrect.input2 ? "valid" : "invalid"}
                            name="input2"
                            value={formData.input2}
                            onChange={emailInput}
                            required
                        />
                        <div>{validationMessages.input2}</div>
                    </label>
                </div>
                <div className={areCorrect.checkbox ? "valid" : "invalid"}
                >
                    <div>
                        <label>
                            Checkbox 1:
                            <input
                                type="checkbox"
                                name="checkbox1"
                                checked={formData.checkbox1}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Checkbox 2:
                            <input
                                type="checkbox"
                                name="checkbox2"
                                checked={formData.checkbox2}
                                onChange={handleCheckboxChange}
                            />
                           
                        </label>
                    </div>
                    <div>
                        <label>
                            Checkbox 3:
                            <input
                                type="checkbox"
                                name="checkbox3"
                                checked={formData.checkbox3}
                                onChange={handleCheckboxChange}
                            />
                            <div>{validationMessages.checkbox}</div>
                        </label>
                    </div>
                </div>
                <div>
                    <label>
                        Select (múltiple):
                        <select
                            name="select"
                            className={areCorrect.select ? "valid" : "invalid"}
                            multiple
                            value={formData.select}
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="option1">Opción 1</option>
                            <option value="option2">Opción 2</option>
                            <option value="option3">Opción 3</option>
                            <option value="option4">Opción 4</option>
                        </select>
                        <div>{validationMessages.select}</div>
                    </label>
                </div>
                <button type="submit" >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default App;
