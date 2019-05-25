import React,{Component} from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import input from '../../components/Input/Input';

class AddUserForm extends Component{
    state = {
        inputs:{
            nickname:{
                definition:{
                    placeHolder: 'Write your nickname',
                    name: 'nickname'
                },
                validation:{
                needed: true
                },
                value: '',
                isChanged: false,
                isValid: false
            },
            email:{
                definition:{
                placeHolder: 'Write your email',
                name: 'email'
                },
                validation:{
                needed: true,
                checkMonkey: true
                },
                value: '',
                isChanged: false,
                isValid: false
            },
            ipAdress:{
                definition:{
                placeHolder: 'Write your ipAdress',
                name: 'ipAdress'
                },
                validation:{
                needed: true,
                checkIp: true
                },
                value: '',
                isChanged: false,
                isValid: false
            }
        },
        isFormValid: false,
        isConfirmationVisible: false
    }

    inputValidation = (currentVal, validationRules)=>{
        let isValid = true;

        if(validationRules.needed){
            isValid = currentVal.trim() !== '' && isValid;

            if(validationRules.checkMonkey){
                if(currentVal.includes('@')){
                    let splitedEmailValues = currentVal.split('@');
                    isValid = splitedEmailValues[0].trim() !== '' &&  splitedEmailValues[1].trim() !== '' && isValid;
                }
                else
                    isValid  = false;
            }
            if(validationRules.checkIp){
                //https://stackoverflow.com/questions/4460586/javascript-regular-expression-to-check-for-ip-addresses
                const octet = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
                const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);
                isValid = regex.test(currentVal) && isValid; 
            }
        }

        return isValid;
    }

    inputHandle = (event, inputId)=>{
        
        const newInputs = {
            ...this.state.inputs
        }

        const updatedInputElement = {
            ...this.state.inputs[inputId]
        }

        updatedInputElement.value = event.target.value;
        updatedInputElement.isValid = 
        this.inputValidation(updatedInputElement.value,updatedInputElement.validation);
        updatedInputElement.moded = true;
        newInputs[inputId] = updatedInputElement;

        let updatedFormIsValid =  true;
        for(let elementId in newInputs){
            updatedFormIsValid = newInputs[elementId].isValid && updatedFormIsValid;
        }

        this.setState({inputs: newInputs, isFormValid: updatedFormIsValid});
    }

    formHandler = (event)=>{
        event.preventDefault();

        let userToAdd = {
            nickname: this.state.inputs.nickname.value,
            email: this.state.inputs.email.value,
            ipAdress: this.state.inputs.ipAdress.value
        }

        this.props.formHandler(userToAdd);

        let newInputs = this.state.inputs;
        Object.keys(newInputs).forEach((key)=>{newInputs[key].value = ''});

        this.setState({
            inputs: newInputs
        })
    }
    
    render(){

        let arrayOfInputs = [];

        for (let inputName in this.state.inputs){
            arrayOfInputs.push(
                {
                    id: inputName,
                    config: this.state.inputs[inputName]
                }
            ) 
        }

        return (
            <div>
            <form onSubmit ={this.formHandler}>
                <h1>Add user:</h1>
                {arrayOfInputs.map((inputElement)=>{
                    return (<Input
                        key = {inputElement.id}
                        isValid = {inputElement.config.isValid}
                        value = {inputElement.config.value}
                        placeholder = {inputElement.config.definition.placeHolder}
                        change = {(event)=>this.inputHandle(event, inputElement.id)}
                    />);
                })
                }
                <Button
                disabled = {!this.state.isFormValid}
                >
                Add User!
                </Button>
            </form>
            </div>
        )
    }
}

export default AddUserForm;