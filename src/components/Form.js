import React, { Fragment, useState } from 'react';
import './form.scss';
import { v4 as uuidv4 } from 'uuid';

const Form = ({addSong}) => {

    // Se crea el estado ppal.
    const [song, updateSong] = useState({
        name: '',
        date: ''
    })

    // Se crea el estado del error.
    const [error, updateError] = useState(false)
    // Se crea el estado del censura.
    const [censored, updateCensored] = useState(false)

    const updateState = e => {
        updateSong({
            // Se destrucura el objeto para guardar una copia
            // y no borrar las otras propíedades
            ...song,
            // se reemplaza la propiedad que tenga el mismo nombre
            // del atributo name del elemento que origino el evento.
            [e.target.name]: e.target.value
        })
    }

    const {name, date} = song;

    const submitSong = e => {
        e.preventDefault();

        //Se convierte a mayuscula la primer letra de cada palabra.
        const addUpper = (words) => {
            let wordsSeparate = words.split(' ');
            let finalString = '';
            wordsSeparate.forEach(word => {
                const firstLetter = word.charAt(0).toUpperCase();
                const nextString = word.substring(1, word.length);
                const finalWord = firstLetter.concat(nextString);
                finalString += finalWord + ' ';
                finalString.trimEnd();
            });
            return finalString;
        }
        const convertedName = addUpper(name);

        // Validación
        if (song.name.trim() === '' || song.date.trim() === '') {
            updateError(true);
            return;
        }

        updateError(false);

        if (song.name.toLowerCase().includes('culo') || song.name.toLowerCase().includes('teta') || song.name.toLowerCase().includes('pene') || song.name.toLowerCase().includes('vagin') || song.name.toLowerCase().includes('porn') || song.name.toLowerCase().includes('sex') || song.name.toLowerCase().includes('puta') || song.name.toLowerCase().includes('puto') || song.name.toLowerCase().includes('piro') || song.name.toLowerCase().includes('gono')) {
            updateCensored(true);
            return;
        }

        // Se elminina mensaje de error
        updateCensored(false);

        const date = new Date(song.date);
        const parseDate = Date.parse(song.date);
        // console.log(parseDate);

        // console.log(song);

        fetch(`/years/${JSON.stringify(date.getFullYear())}.json`)
            .then(res => res.json())
            .then(json => {
                const findedSong = json.find(lookedSong => (parseDate + 18000000) >= Date.parse(lookedSong.inicio_primer_lugar) && parseDate <= Date.parse(lookedSong.final_primer_lugar));
                console.log(parseDate + 18000000);
                console.log(Date.parse(findedSong.inicio_primer_lugar));
                console.log(Date.parse(findedSong.final_primer_lugar));
                return findedSong;
            })
            .then(findedSong => {
                song.convertedName = convertedName;
                song.artist = findedSong.nombre_artista;
                song.songName = findedSong.nombre_cancion;
                song.url = findedSong.videoUrl;
                song.id = uuidv4();

                // Se ejecuta addSong() (función que actualiza el estado
                // del componente padre) enviando como parametro el estado
                // de este componente que sera usado para actualizar el estado
                // del padre.
                addSong(song);

                // se vacian las propiedades del estado, ya que estas le estan
                // dando valor a los values de los inputs, con esto los campos
                // del formulario quedan en blanco.
                updateSong({
                    name: '',
                    date: '',
                    artist: '',
                    songName: '',
                    url: '',
                    id: '',
                })
            });
    }

    return(
        <Fragment>
            <form
                className="form"
                onSubmit={submitSong}
            >
                <label className="label">Tu nombre</label>
                <input
                    className="input-text"
                    type="text"
                    maxLength="20"
                    name="name"
                    placeholder="Tu nombre aqui"
                    onChange={updateState}
                    value={name}
                />

                <label className="label">Tu fecha de nacimiento</label>
                <input
                    className="input-text input-date"
                    type="date"
                    name="date"
                    min="1940-07-27"
                    max="2023-05-07"
                    onChange={updateState}
                    value={date}
                />

                {error ? <p className="error">Todos los campos son requeridos.</p> : null}
                {censored ? <p className="error">Sin datos.</p> : null}

                <button
                    className="form-button"
                    type="submit"
                >Consultar</button>
            </form>
        </Fragment>
    )
}

export default Form;