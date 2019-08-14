import React from 'react';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import SelectDropdown from './Select';

const WizardOne = ({firstName, lastName, age, email, country, gender, onChange, onNext}) => {

    const change = (e) => {

        if(e===null) {
            const reservedE = {
                value: '',
                name: 'country'
            };
            e = reservedE;
        }

        if(!e.hasOwnProperty('target')){
            e.target = {...e};
            e.target.name = 'country';
        };
        
        onChange(e, 'wizardOneFormdata');
    }

    return (
        <form className="wizard__form wizard__form--one" autoComplete="off">
            <div className="formfields">
                <TextInput
                    {...firstName}
                    onChange={(e)=>change(e)}
                />
                <TextInput
                    {...lastName}
                    onChange={(e)=>change(e)}
                />
                <TextInput
                    {...age}
                    onChange={(e)=>change(e)}
                />
                <TextInput
                    {...email}
                    onChange={(e)=>change(e)}
                />
                <SelectDropdown
                    {...country}
                    onChange={(e)=>change(e)}
                />
                <RadioInput
                    {...gender}
                    onChange={(e)=>change(e)}
                />
            </div>
            <div className="ui buttons">
                <button className="ui right labeled icon button" onClick={onNext}> <i className="right chevron icon"></i> Next</button>
            </div>
        </form>
    )
};

export default WizardOne;