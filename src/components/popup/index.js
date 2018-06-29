import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "../../utils/classnames.js";
import Mask from "../mask";
import Ripples from 'react-ripples';
/**
 * popup provide feedback to user
 *
 */
class Dialog extends Component {
    static propTypes = {
        /**
         * to display the dialog
         *
         */
        show: PropTypes.bool,
        /**
         * Title of dialog
         *
         */
        title: PropTypes.string,
    };

    static defaultProps = {
        show: false,
        title: '提示'
    };

    constructor(props){
        super(props);
    }

    render() {
        const {title, show, className,onRequestClose,children, ...others} = this.props;
        const cls = classNames('common-popup', {
            [className]: className
        });

        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <Mask onClick={onRequestClose} />
                <div className={cls} {...others}>
                    <div className="c-title-icon"></div>
                    <div className="c-close">
                        <span className="closeBtn" onClick={onRequestClose}></span>
                    </div>
                    <div className="c-title">{title}</div>
                    <div className="c-content">{children}</div>
                </div>
            </div>
        );
    }
}

export default Dialog;
