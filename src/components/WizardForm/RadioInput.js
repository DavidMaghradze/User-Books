import React from 'react';

const RadioInput = ({value, label, touched, isValid, error, options, config, onChange}) => {

    return (
        <div className="field">
            <div className="input-radio">
                {
                    options.map((option, id)=>(
                        <div className="input-radio"  key={id}>
                            <input
                            onChange={onChange}
                            value={option}
                            {...config}
                            name="gender"
                            checked={value && value===option && true}
                            />
                            <div className="input-radio__title">
                                {option}
                            </div>
                        </div>
                    ))
                }
            </div>
            <label>
                {label}
            </label>
            { !isValid && touched && <p style={{color: 'red'}}>{error}</p> }
        </div>
    )
};

export default RadioInput;