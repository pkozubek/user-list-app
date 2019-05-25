import Modal from '../Modal/Modal';
import React from 'react';
import Button from '../Button/Button';
import Styles from './Confirmation.module.css';

const confirmation = (props)=>{


    return (
            <div className = {Styles.Confirmation}>
                <h2>{props.info}</h2>
                <Button click = {props.onYesClick}>Yes</Button>
                <Button click = {props.onNoClick}>No</Button>
            </div>
    );
}

export default confirmation;