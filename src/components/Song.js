import React from 'react';
import './song.scss';

const Song = ({song, deleteSong}) => {

    return(
        <div className="song-container" id={song.id}>
            <p className="person-name">{song.convertedName}</p>
            <div className="video-container">
                <iframe
                    width="100%" height="100%" 
                    src={song.url} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <p className="description">
                El dia {song.date} cuando {song.convertedName} nacio la canción "<b>{song.songName}</b>" de <b>{song.artist}</b> fue la No 1 en la lista Bill-Board.
            </p>
            <button
                className="delete-button"
                onClick={() => deleteSong(song.id)}
            >Borrar</button>
        </div>
    )
}

export default Song;

