import React from 'react';
import TextInput from './FormFields/TextInput';
import CheckboxInput from './FormFields/CheckboxInput';

const WizardTwo = ({name, price, parts, genres, onChange, onPrev, onSubmit}) => {

    const change = (e) => {
        onChange(e, 'wizardTwoFormdata');
    }

    return (
        <form className="wizard__form wizard__form--two" autoComplete="off">
            <div className="formfields">
                <TextInput
                    {...name}
                    onChange={(e) => change(e)}
                />
                <TextInput
                    {...price}
                    onChange={(e) => change(e)}
                />
                <TextInput
                    {...parts}
                    onChange={(e) => change(e)}
                />
                <CheckboxInput
                    {...genres}
                    onChange={(e) => change(e)}
                />
            </div>
            <div className="ui buttons">
                <button className="ui labeled icon button" onClick={onPrev}><i className="left chevron icon"></i> Prev</button>
                <button className="ui primary button" onClick={onSubmit} style={{marginLeft: '10px'}}>Submit</button>
            </div>
        </form>
    )
};

export default WizardTwo;