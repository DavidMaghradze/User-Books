import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import WizardOne from './WizardOne';
import WizardTwo from './WizardTwo';
import Modal from '../modal';

import { addUser } from '../../store/actions';

import validate from '../../helpers/validator/index';

class WizardForm extends React.Component {

    state = {
        wizardOneFormdata: {
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
            }
        },

        wizardTwoFormdata: {
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
        },
        isValid: false,
        activeWizard: 1,
        showModal: false
    }

    updateState = (wizard, newState) => this.setState({ [wizard]: newState })
    

    onInputChange = (e, wizard) => {
        let value = e.target.value;
        const name = e.target.name;

        const updatedFormData = {...this.state[wizard]};
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

        this.updateState(wizard, updatedFormData);
    }

    nextPage = () => {

        document.querySelector('.paging__item:nth-child(2)').classList.add('onNext');
        setTimeout(()=>document.querySelector('.paging__item:nth-child(2)').classList.remove('onNext'), 1000);

        this.setState({
            activeWizard: this.state.activeWizard + 1
        })
    }

    onNextBtnClick = (e) => {
        e.preventDefault();
        let errors = [];
        const formData = {...this.state.wizardOneFormdata};

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

        if(errors.length===0) {
            this.nextPage();
        }

        this.updateState('wizardOneFormdata', formData);
    }

    onSubmitClick = e => {
        e.preventDefault();
        let errors = [];
        const formData = {...this.state.wizardTwoFormdata};

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

        this.updateState('wizardTwoFormdata', formData);

        if(errors.length===0) {
            this.onSubmit();
        }
    }

    onPrevBtnClick = (e) => {
        e.preventDefault();
        document.querySelector('.paging__item:nth-child(1)').classList.add('onPrev');
        setTimeout(()=>document.querySelector('.paging__item:nth-child(1)').classList.remove('onPrev'), 1000);
        this.setState({
            activeWizard: this.state.activeWizard - 1
        })
    }

    onSubmit = () => {
        const wizardOneFormdata = {...this.state.wizardOneFormdata};
        const wizardTwoFormdata = {...this.state.wizardTwoFormdata};
        let wizardOneData = [];
        let wizardTwoData = [];

        for(let item in wizardTwoFormdata) {
            const updatedElement = {...wizardTwoFormdata[item]};
            updatedElement.value = '';
            updatedElement.touched = false;
            wizardTwoData[item] = wizardTwoFormdata[item].value;
            wizardTwoFormdata[item] = updatedElement;
        }

        for(let item in wizardOneFormdata) {
            const updatedElement = {...wizardOneFormdata[item]};
            updatedElement.value = '';
            updatedElement.touched = false;
            wizardOneData[item] = wizardOneFormdata[item].value;
            wizardOneFormdata[item] = updatedElement;
        }

        let dataToSubmit = {...wizardOneData, ...wizardTwoData};

        this.props.addUser(dataToSubmit);

        this.setState({
            showModal: true,
            activeWizard: 1,
        })
        this.updateState('wizardOneFormdata', wizardOneFormdata);
        this.updateState('wizardTwoFormdata', wizardTwoFormdata);
    }

    hideModal = () => this.setState({ showModal: false })

    render(){
        const { wizardOneFormdata, wizardTwoFormdata } = this.state;
        return (
            <div className="wizard">
                <div className="container wizard__container">
                    <header className="wizard__header">
                        <h1 className="wizard__title">Fill the application and add your favorite book to list</h1>
                    </header>
                    <section className="wizard__form-container">
                        <div className="wizard__form-paging">
                            <div className="paging__item">
                                <span className="paging__circle paging__circle--active"></span>
                                <span className={`paging__line ${this.state.activeWizard===2 && 'paging__line--active'}`}></span>
                            </div>
                            <div className="paging__item">
                                <span className={`paging__circle ${this.state.activeWizard===2 && 'paging__circle--active'}`}></span>
                                <span className="paging__line"></span>
                            </div>
                        </div>
                        <div className="wizard__form-slider">
                            <div className={`wizard__form-wrapper active-wizard-${this.state.activeWizard}`}>
                                <WizardOne {...wizardOneFormdata} onChange={this.onInputChange} onNext={this.onNextBtnClick}/>
                                <WizardTwo {...wizardTwoFormdata} onChange={this.onInputChange} onPrev={this.onPrevBtnClick} onSubmit={this.onSubmitClick}/>
                            </div>
                        </div>
                    </section>
                </div>
                <Modal class={this.state.showModal ? 'opened' : '' } hideModal={this.hideModal}>
                    <header className="modal__header">
                        <h1 className="modal__header-title">Congrats! You have succesfully filled application</h1>
                    </header>
                    <footer className="ui buttons" style={{padding: "20px"}}>
                        <Link to="/users" className="ui primary button">Go to Users Page</Link>
                        <div className="or"></div>
                        <button onClick={()=>this.hideModal()}className="ui button">OK, Back to Home</button>
                    </footer>
                </Modal>
            </div>
        )
    }
};

export default connect(null,{ addUser })(WizardForm);