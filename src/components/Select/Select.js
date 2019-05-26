import React from 'react';
import Styles from './Select.module.css';

const select = (props)=>{
    let options =  null;

    if(props.usersCount > 0){
        options = (
        <div className = {Styles.Select}>        
        <label>Sort by:</label>
        <select value = {props.val} onChange = {props.change}>
        {props.options.map((select)=>{
            return <option key = {select}>{select}</option>
        })}
        </select>
        </div>
        );
    }

    return options;
}

export default select;