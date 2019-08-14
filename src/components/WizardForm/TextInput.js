import React from 'react';

const TextInput = ({value, label, touched, isValid, error, config, onChange, emailPS = ""}) => {

    return (
        <div className="field">
            <input
                onChange={onChange}
                value={value}
                {...config}
                className={`${!isValid && touched && 'input-error'}`}
            />
            <label>
                {label} <strong style={{marginLeft:"10px", color: "#db2828"}}>{emailPS}</strong>
            </label>
            { !isValid && touched && <p className="error">{error}</p> }
        </div>
    )
};

export default TextInput;