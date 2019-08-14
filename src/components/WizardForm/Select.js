import React from 'react';
import Select from 'react-select';

const SelectDropdown = ({value, label, touched, isValid, error, config, options, onChange}) => {

    return (
        <div className="field">
            <Select
                placeholder={`${value ? value : 'Select'}`}
                onChange={onChange}
                {...config}
                options={options}
                isClearable={true}
                maxMenuHeight='140px'
            />
            <label>
                {label}
            </label>
            { !isValid && touched && <p className="error">{error}</p> }
        </div>
    )
};

export default SelectDropdown;