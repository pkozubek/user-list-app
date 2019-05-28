import React from 'react';
import Button from '../Button/Button';

const confirmation = (props)=>{


    return (
            <div>
                <h2>{props.info}</h2>
                <Button type = 'Confirm' click = {props.onYesClick}>Yes</Button>
                <Button type = 'Delete' click = {props.onNoClick}>No</Button>
            </div>
    );
}

export default confirmation;