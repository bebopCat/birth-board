import React, { Fragment } from 'react';
import './title.scss';

const Title = () => {
    return(
        <Fragment>
            <div className="header-vinyl1"><div className="header-vinyl2"></div></div>
            <h1 className="header-title">Birth Board</h1>
            <p className="header-subtitle">¿que canción fue top 1 el dia que naciste?</p>
        </Fragment>
    )
}

export default Title;