import { useEffect, useState } from "react"
import { Song } from "./Song"
import "./SongList.css"



export const SongList = () => {
    //fetches all the songs in the database and then sets the songs object to that data when the page loads
    const [songs, setSongs] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/songs?_sort=albumNumber`)
                .then(response => response.json())
                .then((data) => {
                    setSongs(data)
                    
                })                
        },
        []
    )
    //fetches all the tags that the user has created and then sets the tags object to that data when the page loads
    const [tags, setTags] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/tags`)
            .then(response =>response.json())
            .then((data) => {
                setTags(data)
            })
        },
        []
    ) 

    //function that loops through the songs and creates a separate array for each album by creating an empty album object and then for each song
    //it checks if it already has an object with the same album name as the current song, 
    //if it does it adds the song to the array, if it doesn't it creates the album object and adds the song
    const albumSongs = songs.reduce((albums, song) => {
        const album = albums.find(album => album.albumNumber === song.albumNumber);
        if (album) {
          album.songs.push(song);
        } else {
          albums.push({
            albumNumber: song.albumNumber,
            albumName: song.albumName,
            songs: [song]
          });
        }
        return albums;
      }, []);
    
    //renders the list of all songs
    return <div className="song_list_page">
            <div className="albums">
            <div className="page_title_songList"><h2>Music Catalog</h2></div>
                <em className="songlist_tape"></em>
                {albumSongs.map(album => (
                    <div className="album" key={`album--${album.albumNumber}`} id={`album--${album.albumNumber}`}>
                        <div className={"albumTitle"}><h2>{album.albumName}</h2></div>
                            <div className={`album__${album.albumNumber}`}>
                                {/* <div className={`albumPicture__${album.albumNumber}`}></div> */}
                                <div className="albumSongs">{album.songs.map(song => <Song key={`song--${song.id}`} songId={song.id}
                                    songName={song.songName}
                                    //albumNumber = {albumNumber}
                                    albumName={song.albumName}
                                    artist={song.artist}
                                    featuringName={song.featuringName}
                                    tags={tags} />
                                )}
                            </div>           
                        </div>
                    </div>
            ))}
            </div>
            </div>
            
        
}