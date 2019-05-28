import React from 'react';
import Button from '../Button/Button';
import Styles from './SingleUser.module.css';

const singleUser = (props)=>{
    return (
    <div key = {props.id} className = {Styles.User}>
        <div className = {Styles.Nickname}>
            <h2>{props.user.nickname}</h2>
        </div>
        <div className = {Styles.UserDetails}>
            <p><label>Email: </label>{props.user.email}</p>
            <p><label>Ip Adress: </label>{props.user.ipAdress}</p>
        </div>
        <div className = {Styles.Delete}>
            <Button type = 'Remove' click = {props.delete}>Remove</Button>
        </div>
    </div>)
}

export default singleUser;