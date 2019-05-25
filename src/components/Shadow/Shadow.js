import React from 'react';
import styles from './Shadow.module.css';

const shadow = (props)=>{
    return props.show ? <div onClick = {props.click} className = {styles.Backdrop}></div> : null;
}

export default shadow;