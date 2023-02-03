import React, { useState, useEffect } from "react";

export const GeneratePlaylist = () => {
    //gets the user info
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
    
    //fetch songs, tags, and taggedSongs (for that user) and set state for each
    const [songs, setSongs] = useState([]);
    const [tags, setTags] = useState([]);
    const [taggedSongs, setTaggedSongs] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8088/songs')
        .then((res) => res.json())
        .then((data) => {
            setSongs(data)
        })
        
        fetch('http://localhost:8088/tags')
        .then((res) => res.json())
        .then((data) => {
            setTags(data)
        })
        
        fetch(`http://localhost:8088/taggedSongs?userId=${myVersionUserObject.id}`)
        .then((res) => res.json())
        .then((data) => {
            setTaggedSongs(data)
        })
    }, 
    []
    )
    
    //function that gets the id of the tag that the user selected from the dropdown and sets the chosenTag state to that
    const [chosenTag, setChosenTag] = useState({});
    const getChosenTag = (chosenTagId) => {
        setChosenTag(chosenTagId);
    };

    return (
        <div>
        <h2>Filter Tagged Songs</h2>
            {/* dropdown list of the user's tags and when one is selected it sets chosenTag to that tag.id */}
            <select onChange={(event) => getChosenTag(parseInt(event.target.value))}>
                <option value={0}>All Songs</option>
                {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                    {tag.name}
                </option>
                ))}
            </select>
        <h2>List of Songs</h2>
            <ul>
            {/* maps through each song and if song.id matches a taggedSong.id and the id of the filter tag matches the taggedSong.tagId , sets it equal to filteredSongs. 
            If filtered songs isn't empty and therefore truthy, then the song name and artist is listed out */}
                {songs.map((song) => {
                    const filteredSongs = taggedSongs.filter((taggedSong) => taggedSong.songId === song.id && chosenTag.id === taggedSong.tagId)
                        if (filteredSongs) {
                            return <li key={song.id}> {song.songName} by {song.artist} </li>
                        } 
                        else {
                        return "";
                        }
                })}
            </ul>
        </div>
    );
};