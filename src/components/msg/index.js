import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "../../utils/classnames.js";

class Msg extends Component {
    static propTypes = {
        show: PropTypes.bool,
        msg: PropTypes.string
    };

    static defaultProps = {
        show: false,
        msg: ''
    };

    constructor(props){
        super(props);
    }

    render() {
        const {msg, show, className, ...others} = this.props;
        const cls = classNames('common-msg', {
            [className]: className
        });

        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <p className={cls} {...others}><span className="text">{msg}</span></p>
            </div>
        );
    }
}

export default Msg;
