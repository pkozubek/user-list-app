import React, {Component} from 'react';

import SingleUser from '../../components/SingleUser/SingleUser';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Confirmation from '../../components/Confirmation/Confirmation';

import UserForm from '../AddUserForm/AddUserForm';

class UserList extends Component{
    
    state = {
            users:[],
            valueToAdd: {},
            isFormVisible: false,
            isConfirmationVisible: false,
            showError: false
    }

    
    containsUser=(user)=>{
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].nickname === user.nickname 
                || this.state.users[i].email === user.email) {
                return true;
            }
        }
    
        return false;
    }

    removeUserFromList = (row)=>{
        if (row === 'All')
            this.setState({
                users: []
            })
        else{
        let newUserList = this.state.users;
        newUserList.splice(row,1);

        this.setState({users: newUserList});
        }
    }

    formHandler = (userObject)=>{
        let isInArray = this.containsUser(userObject); 
        
        if(isInArray){
            this.setState({
                valueToAdd: null,
                isFormVisible: false,
                isConfirmationVisible: false,
                showError: true
            })
            setTimeout(()=>{this.setState({showError: false})},1000);
        }
        else{ 
            this.setState({
                valueToAdd: userObject,
                isFormVisible: false,
                isConfirmationVisible: true,
                showError: false
            })
        }
    }

    handleFormShow = ()=>{
        this.setState({
            isFormVisible: !this.state.isFormVisible
        });
    }

    handleConfirmationCancel = ()=>{
        this.setState({isConfirmationVisible: false, valueToAdd: {}})
    }

    addElementToList = ()=>{
        let currentUsersArray = this.state.users;
        currentUsersArray.push(this.state.valueToAdd);

        this.setState({users: currentUsersArray, 
            isConfirmationVisible: false,
            valueToAdd: {}
        });
    }

    render(){
        let userList = <div>List is empty - add some users!</div>
        console.log(this.state.users);
        if(this.state.users.length>0){
            userList = this.state.users.map((user,index)=>{
                return <SingleUser key = {user.nickname} user = {user} delete = {()=>this.removeUserFromList(index)}/>
                })
        }

        let error = this.state.showError ? <Modal show = {this.state.showError}><h2>Taki uztykownik juz istnieje</h2></Modal> : null;

        return(
        <div>
            <Modal show = {this.state.isFormVisible} click = {this.handleFormShow}>
                <UserForm formHandler = {this.formHandler}/>
            </Modal>
            <Modal show = {this.state.isConfirmationVisible}>            
            <Confirmation 
            show = {this.state.isConfirmationVisible}
            info = 'Do you want to add this user to List?'
            onYesClick = {this.addElementToList}
            onNoClick = {this.handleConfirmationCancel}
            />
            </Modal>
            {error}
            <Button click = {this.handleFormShow}>Add user</Button>
            {userList}
            {this.state.users.length>0 ? <Button click = {()=>this.removeUserFromList('All')}>Delete All Users</Button>:null}
        </div>);
    }
}

export default UserList;