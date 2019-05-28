import React from 'react';
import Styles from './Button.module.css'
import RemoveImage from '../../images/trash.png'

const button = (props) => {
    let buttonStyle = [Styles.Button, Styles[props.type]];

    return <button
        disabled = {props.disabled}
        className = {buttonStyle.join(' ')}
        onClick = {props.click}>
        {props.type !== 'Remove'?props.children:<img alt = 'remove' src = {RemoveImage}></img>}
    </button>
}

export default button;