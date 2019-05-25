import React from 'react';
import Styles from './Modal.module.css';
import Shadow from '../Shadow/Shadow';

class Modal extends React.Component {

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return ( 
            <React.Fragment >
            <Shadow
            show = {this.props.show}
            click = {
                this.props.click
            }
            /> 
            <div className = {Styles.Modal}
            style = {{transform: this.props.show ? 'translateY(0)' : 'translateY(-100)',
                    opacity: this.props.show ? '1' : '0', 
                    display: this.props.show ? 'block' : 'none'}} >
                {this.props.children} 
            </div> 
            </React.Fragment>
        );
    }
};

export default Modal;