import React, { Fragment, useState, useEffect } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Song from './components/Song';
import Menu from './components/Menu';

function App() {

  // Se almacena en una variable datos de LocalStorage.
  // ó un array vacio en su defecto.
  // Mediante JSON.parse() se convierte de strings a elementos javaScript manipulables.
  let initialSongs = JSON.parse(localStorage.getItem('songs'));
  if (!initialSongs) {
    initialSongs = []
  }

  // Se crea el estado principal.
  const [songs, saveSong] = useState(initialSongs);

  // useEffect() para realizar acciones cuando el state cambia.
  useEffect( () => {
    // Se almacena en una variable datos de LocalStorage.
    // ó un array vacio en su defecto.
    // Mediante JSON.parse() se convierte de strings a elementos javaScript manipulables.
    let initialSongs = JSON.parse(localStorage.getItem('songs'));
    
    if (initialSongs) {
      // Agregamos a localstorage los datos del estado (cuando este cambia).
      localStorage.setItem('songs', JSON.stringify(songs));
    } else {
      // Si aun no hay nada en localstorage almacenamos un array vacío.
      localStorage.setItem('songs', JSON.stringify([]));
    }
    // Se pasa el estado como paramaetro a useEffect() para
    // tener acceso a el sin que se marque un error.
  }, [songs] );


  // Función que guarda una nueva canción en el state (al ejecutar saveSong())
  // con datos que vienen del componente <form /> ya que se ejecuta allí.
  const addSong = song => {
    saveSong([
      ...songs,
      song
    ]);
  }

  const deleteSong = id => {
    // Se guarda en una variable el array que devuelve filter()
    const newSongs = songs.filter(song => song.id !== id);
    // Se modifica el estado mediante su función modificadora.
    saveSong(
      newSongs
    );
  }

  return (
    <Fragment>
      <div className="header-container">
        <Title/>
        <Form
          addSong={addSong}
        />
      </div>
      <div className="songs-container">
        {songs.length === 0 ? <p className="add-elements">Ingresa tus datos para descubrir tu canción, puedes coleccionar varias busquedas.</p> : null}
        {songs.map(song => (
              <Song
                key={song.id}
                song={song}
                deleteSong={deleteSong}
              />
            ))}
      </div>
      <div className="lateral-container">
          <Menu
            songs={songs}
          />
      </div>
    </Fragment>
    
  );
}

export default App;
