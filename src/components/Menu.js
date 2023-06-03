import React, { Fragment } from 'react';
import './menu.scss';
import { v4 as uuidv4 } from 'uuid';

const Menu = ({songs}) => {

    const hamburguerClick = () => {
        // Genera un nelemento de bloqueo en la pantalla.
        document.querySelector('.bloqueo').classList.toggle('is-active-block');
        // Deshabilita el scroll.
        // document.getElementsByTagName("html")[0].style.overflow = "hidden";
        document.getElementsByTagName("html")[0].classList.toggle('hidden-html');

        document.querySelector('.hamburger').classList.toggle('is-active');
        document.querySelector('.menu-lateral').classList.toggle('is-active-panel');
    }

    const itemClick = e => {
        // Retira el elemento de bloqueo en la pantalla.
        document.querySelector('.bloqueo').classList.toggle('is-active-block');
        // Habilita el scroll.
        document.getElementsByTagName("html")[0].style.overflow = "auto";

        // Se transforma el boton del menu lateral.
        document.querySelector('.hamburger').classList.toggle('is-active');
        
        // Se oculta el panel de menu lateral.
        document.querySelector('.menu-lateral').classList.remove('is-active-panel');

        // Se hacen los calculos para mover el scroll a la posicion deseada.
        let songId = e.target.id;
        let $song = document.getElementById(`${songId}`);
        let songTop = $song.getBoundingClientRect().top;
        let scrollCross = window.pageYOffset;
        let scrollear = scrollCross + songTop;
        window.scroll(0, scrollear);
    }

    const backButtonClick = () => {
        window.scroll(0, 0);
    }

    let orderSongs = [...songs].reverse();

    return(
        <Fragment>
            <ul className="menu-lateral">
                <p className="sin-elementos">LISTA DE CONSULTAS</p>
                {orderSongs.length === 0 ? <p className="sin-elementos">No hay elementos</p> : null}
                {orderSongs.map(song => (
                    <li 
                        className="item-menu"
                        key={uuidv4()}>
                        <span
                            id={song.id}
                            className="text-lateral"
                            onClick={(e) => itemClick(e)}
                        >
                            {song.name}
                        </span>
                    </li>
                ))}
            </ul>
            <div id="menu-container" className="menu-item_container">
                <button
                    className="hamburger hamburger--collapse"
                    type="button"
                    onClick={hamburguerClick}>
                    <span
                        className="hamburger-box">
                        <span
                            className="hamburger-inner"></span>
                    </span>
                </button>
            </div>

                <button
                    className="back-button"
                    type="button"
                    onClick={backButtonClick}>
                    <img src="/birth-board/images/arrow_up.svg" alt="flecha hacia arriba" />
                </button>
            <div className="bloqueo"></div>
        </Fragment>
    )
}

export default Menu;

