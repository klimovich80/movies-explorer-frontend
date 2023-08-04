import { useState, useCallback } from "react";
//хук управления формой
export function useForm(initialState) {
    const [values, setValues] = useState(initialState);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation(initialState) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(initialState || false);

    const handleChange = (event) => {
        const target = event.target;
        const { name, value, validationMessage } = target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, setIsValid, resetForm };
}