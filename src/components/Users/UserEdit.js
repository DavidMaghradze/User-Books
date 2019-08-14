import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import validate from '../../helpers/validator/index';
import { editUser } from '../../store/actions';

import TextInput from '../WizardForm/FormFields/TextInput';
import SelectDropdown from '../WizardForm/FormFields/Select';
import RadioInput from '../WizardForm/FormFields/RadioInput';
import CheckboxInput from '../WizardForm/FormFields/CheckboxInput';

class UserEdit extends React.Component {

    state = {
        formData: {
            firstName: {
                value: '',
                label: 'First Name',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    minLength: 4
                },
                config: {
                    name: "firstName",
                    type: "text"
                }
            },

            lastName: {
                value: '',
                label: 'Last Name',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    minLength: 4
                },
                config: {
                    name: "lastName",
                    type: "text"
                }
            },
            
            age: {
                value: '',
                label: 'Age',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    ageLimit: 18
                },
                config: {
                    name: "age",
                    type: "number"
                }
            },

            email: {
                value: '',
                label: 'Email',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                    isEmail: true
                },
                config: {
                    name: "email",
                    type: "text"
                }
            },

            country: {
                value: '',
                label: 'Select Country',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                },
                config: {
                    name: "country",
                    type: "select"
                },
                options: [
                    {value: 'Georgia', label: 'Georgia'},
                    {value: 'Russia', label: 'Russia'},
                    {value: 'England', label: 'England'}
                ]
            },

            gender: {
                value: '',
                label: 'Gender',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                },
                config: {
                    name: "gender",
                    type: "radio"
                },
                options: [
                    'Male',
                    'Female',
                    'Other'
                ]
            },

            name: {
                value: '',
                label: 'Your Favorite Book Title',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                    required: true,
                },
                config: {
                    name: "name",
                    type: "text"
                }
            },

            price: {
                value: '',
                label: 'Book Price',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                },
                config: {
                    name: "price",
                    type: "number"
                }
            },

            parts: {
                value: '',
                label: 'Book Parts',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                },
                config: {
                    name: "parts",
                    type: "number"
                }
            },

            genres: {
                value: [],
                label: 'Your favourite genres',
                error: '',
                touched: false,
                isValid: true,
                validationRules: {
                },
                config: {
                    name: "genres",
                    type: "checkbox"
                },
                options: [
                    'Drama',
                    'Detective',
                    'Erotic',
                    'Historical fiction'
                ]
            }
        }
    }

    updateState = newFormData => this.setState({ formData: newFormData })

    componentDidMount() {
        const user = {...this.props.user};
        if(_.isEmpty(user)) {
            this.props.history.push('/');
        }
        const INITIAL_VALUES = {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            email: user.email,
            country: user.country,
            gender: user.gender,
            name: user.name,
            price: user.price,
            parts: user.parts,
            genres: user.genres
        }

        const formData = {...this.state.formData};

        for (let value in INITIAL_VALUES) {
            const updatedElement = {...formData[value]}
            updatedElement.value = INITIAL_VALUES[value];
            updatedElement.error = '';
            formData[value] = updatedElement;
        }

        this.updateState(formData);
    }

    onInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        const updatedFormData = {...this.state.formData};
        const updatedElement = {...updatedFormData[name]};

        const valid = validate(value, updatedElement.validationRules);

        updatedElement.isValid = valid.isValid;
        updatedElement.error = valid.error;

        if(name==="genres") {
            if(updatedElement.value.includes(value)){
                updatedElement.value = updatedElement.value.filter((val)=> val!==value);
            } else {
                updatedElement.value = [...updatedElement.value, value];
            }
        } else {
            updatedElement.value = value;
        }

        updatedFormData[name] = updatedElement;

        this.updateState(updatedFormData);
    }

    change = (e) => {

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
        
        this.onInputChange(e);
    }

    onSaveChanges = e => {
        e.preventDefault();
        let errors = [];
        const formData = {...this.state.formData};

        for (let item in formData) {
            const updatedElement = {...formData[item]}
            const valid = validate(updatedElement.value, updatedElement.validationRules);
            updatedElement.touched = true;
            updatedElement.isValid = valid.isValid;
            updatedElement.error = valid.error;

            if(updatedElement.error) {
                errors.push(updatedElement.error);
            }
            formData[item] = updatedElement;
        }

        this.updateState(formData);

        if(errors.length===0) {
            let dataToSubmit = [];

            for(let item in formData) {
                const updatedElement = {...formData[item]};
                updatedElement.value = '';
                updatedElement.touched = false;
                dataToSubmit[item] = formData[item].value;
                formData[item] = updatedElement;
            }

            this.props.editUser(dataToSubmit);
            this.props.history.push('/users');
        }
    }

    render(){
        const { firstName, lastName, age, email, country, gender, name, price, parts, genres } = this.state.formData;
        return (
            <div className="container users__container">
                <div className="wizard__form">
                    <div className="formfields">
                        <TextInput
                            {...firstName}
                            onChange={(e)=>this.change(e)}
                        />
                        <TextInput
                            {...lastName}
                            onChange={(e)=>this.change(e)}
                        />
                        <TextInput
                            {...age}
                            onChange={(e)=>this.change(e)}
                        />
                        <TextInput
                            {...email}
                            emailPS="PLEASE DO NOT CHANGE EMAIL *"
                            onChange={(e)=>this.change(e)}
                        />
                        <SelectDropdown
                            {...country}
                            onChange={(e)=>this.change(e)}
                        />
                        <RadioInput
                            {...gender}
                            onChange={(e)=>this.change(e)}
                        />
                        <TextInput
                            {...name}
                            onChange={(e) =>this.change(e)}
                        />
                        <TextInput
                            {...price}
                            onChange={(e) =>this.change(e)}
                        />
                        <TextInput
                            {...parts}
                            onChange={(e) =>this.change(e)}
                        />
                        <CheckboxInput
                            {...genres}
                            onChange={(e) =>this.change(e)}
                        />
                    </div>
                    <button onClick={()=>this.props.history.push('/users')} className="ui button">Cancel</button>
                    <button className="submit" onClick={this.onSaveChanges} className="ui green button">Save Changes</button>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state, OwnProps) => {
    return {
        user: state.users[OwnProps.match.params.id]
    }
}

export default connect(mapStateToProps, { editUser })(UserEdit);