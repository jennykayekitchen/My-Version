import { useEffect, useState } from "react"
import { Song } from "./Song"


import "./SongList.css"

export const SongList = () => {
    const [songs, setSongs] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/songs`)
                .then(response => response.json())
                .then((data) => {
                    setSongs(data)
                    
                })                
        },
        []
    )

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

    return <div className="songs">
        <h2>Music Catalog</h2>
        {
            songs.map(song => <Song key={`song--${song.id}`} songId={song.id}
                songName = {song.songName}
                albumName = {song.albumName}
                artist = {song.artist}
                featuringName = {song.featuringName}
                tags = {tags}
                />)       
            }        
    </div>
}

//to use when I create tags in application
// update the fetch to this: fetch(`http://localhost:8088/songs?_expand=taggedSongs
// return <article className="Songs">
//         {
//             songs.map(song => <Song key={`song--${song.songId}`}
//                 id={song.userId}
//                 songName={song.songName}
//                 albumName={song.AlbumName}
//                 tag={song.taggedSong.name}
//                 etc 
//                 />)
//             }
        
//     </article>

//put this in Song.js
// import { Link } from "react-router-dom"

// export const Song = ({ id, songName, albumName, tag, tect }) => {
//     return <section className="Song" >
//                     <div>{songName}</div>
//                     <div>{albumName</div>
//                     <div>{tag}</div>
//                 </section>
// }