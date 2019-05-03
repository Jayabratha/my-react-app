import React from 'react';
import { Icon } from 'antd';

import './Modal.css';

export function Modal(props) {
    return (
        <div className={`modal-wrapper ${props.show ? 'show' : ''}`}>
            <div className="content">
                <div className="close-icon" onClick={() => props.closeModal()}>
                    <Icon type="close" />
                </div>
                {props.children}
            </div>
            
        </div>
    )
}