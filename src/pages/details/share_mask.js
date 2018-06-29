import React from 'react';
import PropTypes from 'prop-types';
import classNames from "../../utils/classnames.js"
/**
 * screen mask, use in `Dialog`, `ActionSheet`, `Popup`.
 *
 */
class Mask extends React.Component {
    static propTypes = {
        transparent: PropTypes.bool
    };

    static defaultProps = {
        transparent: false
    };

    render() {
        const {transparent, className, ...others} = this.props;
        const clz = classNames({
            'common-mask': !transparent,
            'common_transparent': transparent
        }, className);

        return (
            <div className={clz} {...others}></div>
        );
    }
}

export default Mask;