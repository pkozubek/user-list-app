import React, {Component} from 'react';

import SingleUser from '../../components/SingleUser/SingleUser';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Confirmation from '../../components/Confirmation/Confirmation';
import Select from '../../components/Select/Select';

import UserForm from '../AddUserForm/AddUserForm';

const OPTIONS = ['nickname', 'email','unsorted'];

class UserList extends Component{
    state = {
            users:[{
                nickname: 'b',
                email: 'd',
                ipAdress: '1.1.1.1'
            },
            {
                nickname: 'a',
                email: 'c',
                ipAdress: '2.1.1.1'
            },
            {
                nickname: 'z',
                email: 'a',
                ipAdress: '2.1.1.1'
            }],

            valueToAdd: null,
            isFormVisible: false,
            isConfirmationVisible: false,
            showError: false,
            userToDelete: null,
            currentlySelected: 'unsorted'
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
        this.setState({
            isConfirmationVisible: true,
            userToDelete: row
        })
    }
    
    confirmRemoving = ()=>{
        let newUsersList = [];

        if(this.state.userToDelete !== 'All'){
            newUsersList = this.state.users;
            newUsersList.splice(this.state.userToDelete,1);
        }        

        this.setState({
        users: newUsersList,
        itemToDelete: null,
        isConfirmationVisible: false
        });
    }
    

    addElementToList = (userObject)=>{
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
        this.setState({isConfirmationVisible: false, valueToAdd: null})
    }

    confirmAddingElementToList = ()=>{
        let currentUsersArray = this.state.users;
        currentUsersArray.push(this.state.valueToAdd);

        this.setState({
            users: currentUsersArray, 
            isConfirmationVisible: false,
            valueToAdd: null
        });
    }

    compareNickname=( user1, user2 )=>{
        if ( user1.nickname < user2.nickname ){
          return -1;
        }
        if ( user1.nickname > user2.nickname ){
          return 1;
        }
        return 0;
    }
    
    compareEmail = ( user1, user2 )=>{
        if ( user1.email < user2.email ){
          return -1;
        }
        if ( user1.email > user2.email ){
          return 1;
        }
        return 0;
    }

    handleSorting = (event)=>{
        let sortedUsers = this.state.users;

        if(event.target.value === 'nickname')
            sortedUsers.sort( this.compareNickname );
        if(event.target.value === 'email')
            sortedUsers.sort( this.compareEmail );

        this.setState({
            currentlySelected: event.target.value,
            users: sortedUsers
        })
    }

    render(){
        let userList = <div>List is empty - add some users!</div>
        if(this.state.users.length>0){
            userList = this.state.users.map((user,index)=>{
                return <SingleUser key = {user.nickname} user = {user} delete = {()=>this.removeUserFromList(index)}/>
                })
        }

        let error = this.state.showError 
            ? <Modal show = {this.state.showError}><h2>Taki uztykownik juz istnieje</h2></Modal>
            : null;
        
        let confirmation = null;
        if(this.state.isConfirmationVisible){
            confirmation = <Confirmation 
            show = {this.state.isConfirmationVisible}
            info = {this.state.valueToAdd !== null
                    ?'Do you want to add this user to List?'
                    :'Do you want to remove user from List'}
            onYesClick = {this.state.valueToAdd !== null
                    ?this.confirmAddingElementToList
                    :this.confirmRemoving}
            onNoClick = {this.handleConfirmationCancel}
            />
        }

        return(
        <div>
            <h1>List of Users:</h1>
            <Modal 
            show = {this.state.isFormVisible} 
            click = {this.handleFormShow}>
                <UserForm 
                formHandler = {this.addElementToList}/>
            </Modal>
            <Modal 
            show = {this.state.isConfirmationVisible}>            
                {confirmation}
            </Modal>
            {error}
            <Select 
            val = {this.state.currentlySelected}
            change = {this.handleSorting}
            usersCount = {this.state.users.length}
            options = {OPTIONS}
            />
            {userList}
            <Button 
            style = 'Add'
            click = {this.handleFormShow}>Add user</Button>
            {this.state.users.length>0 ?
                <Button style = 'Delete' click = {()=>this.removeUserFromList('All')}>Delete All Users</Button>
                :null}
        </div>);
    }
}

export default UserList;