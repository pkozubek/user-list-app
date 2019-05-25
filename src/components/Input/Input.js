import React from 'react';
import Styles from './Input.module.css';

const input = (props)=>{

    let currentStyle = [Styles.Input]

    if(!props.isValid){
        currentStyle.push([Styles.Invalid])
    }

    return <input
    className = {currentStyle.join(' ')}
    value = {props.value}
    onChange = {props.change}
    placeholder = {props.placeholder}
    />
}

export default input;