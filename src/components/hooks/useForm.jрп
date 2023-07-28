import { useState } from "react";

function useForm(initialState) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { value, validationMessage, name } = event.target;
        setErrors({ ...errors, [name]: validationMessage });
        setValues({ ...values, [name]: value });
    };
    return { values, errors, handleChange };
}

export default useForm;