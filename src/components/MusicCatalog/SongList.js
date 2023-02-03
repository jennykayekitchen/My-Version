import { useInsertionEffect } from "react"
import { useEffect, useState } from "react"
//import { PlaylistFilter } from "../GeneratePlaylist/PlaylistFilter"
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


    // const [filterTag, setFilterTag] =useState([])
    
    // const playlistFilter = () => {
    //     return (
    //         <div id="filter-bar">
    //             <select
    //                 className="filter-box"
    //                 value={chosenTag.id}
    //                 id="tag-select"
    //                 onChange={(event) => {
    //                     setFilterTag(parseInt(event.target.value))
    //                 }}
    //             >
    //                 <option value="0">All Songs</option>
    //                 {tags.map((tag) => {
    //                     return (
    //                         <option key={tag.id}
    //                             value={tag.id}>
    //                                 {tag.name}
    //                             </option>
    //                     )
    //                 })}
    //             </select>
    //         </div>
    //     )
    // }
    

    return <div className="songs">
        <h2>Music Catalog</h2>
        {/* {playlistFilter()} */}
        {
            songs.map(song => <Song key={`song--${song.id}`} songId={song.id}
                songName = {song.songName}
                albumName = {song.albumName}
                artist = {song.artist}
                featuringName = {song.featuringName}
                tags = {tags}
                // filterTag = {filterTag}
                />)       
            }        
    </div>
}