import React from 'react';

const CheckboxInput = ({value, label, touched, isValid, error, options, config, onChange}) => {

    return (
        <div className="field">
            <div className="input-checkbox">
                {
                    options.map((option, id)=>(
                        <div className="input-checkbox__option"  key={id}>
                            <input
                            onChange={onChange}
                            value={option}
                            {...config}
                            name='genres'
                            checked={value.includes(option) ? true : false}
                            />
                            <div className="input-checkbox__title">
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

export default CheckboxInput;