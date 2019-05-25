import React from 'react';
import Button from '../Button/Button';
import Styles from './SingleUser.module.css';

const singleUser = (props)=>{
    return (<div key = {props.id} className = {Styles.User}>
        <h2>{props.user.nickname}</h2>
        <p>{props.user.email}</p>
        <p>{props.user.ipAdress}</p>
        <Button click = {props.delete}>Remove</Button>
    </div>)
}

export default singleUser;