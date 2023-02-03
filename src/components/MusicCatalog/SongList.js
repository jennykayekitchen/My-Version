import { useEffect, useState } from "react"
import { Song } from "./Song"
import "./SongList.css"

export const SongList = () => {
    //fetches all the songs in the database and then sets the songs object to that data when the page loads
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
    
    //renders the list of all songs
    return <div className="songs">
        <h2>Music Catalog</h2>
        {/* maps through each song and creates props for the info to be passed to song.js which will then deconstruct the 
        info to populate each song */}
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