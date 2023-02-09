import React, { useState, useEffect } from "react";
import "./GeneratePlaylist.css"

export const GeneratePlaylist = () => {
    //gets the user info
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
    
    //fetch tags, and taggedSongs (for that user) and set state for each
    const [tags, setTags] = useState([]);
    const [taggedSongs, setTaggedSongs] = useState([]);
    useEffect(() => {    
        fetch('http://localhost:8088/tags')
        .then((res) => res.json())
        .then((data) => {
            setTags(data)
        })
        
        fetch(`http://localhost:8088/taggedSongs?userId=${myVersionUserObject.id}&_expand=song`)
        .then((res) => res.json())
        .then((data) => {
            setTaggedSongs(data)
        })
    }, 
    []
    )
    
    const [chosenTags, setChosenTags] = useState([]);

    const [filteredSongs, setFilteredSongs] = useState([])
    useEffect(
        () => {
            const playlistWithDups = []
            taggedSongs.forEach(taggedSong => {
                taggedSongs.forEach(otherTaggedSong =>{
                    if (taggedSong.tagId === chosenTags[0] && otherTaggedSong.tagId === chosenTags[1] && taggedSong.songId === otherTaggedSong.songId) {
                        playlistWithDups.push(taggedSong)                                
                    }
                    else if (taggedSong.tagId === chosenTags[0]) {
                        playlistWithDups.push(taggedSong)
                    }
                })                
            })
            const playlist = [...new Set(playlistWithDups)]
            setFilteredSongs(playlist)
        },
        [chosenTags, taggedSongs]
    )

    const handleGeneratePlaylistButton = (event) => {
        event.preventDefault();
        const selectedTags = [];
        const checkboxes = event.target.parentNode.querySelectorAll("input[type=checkbox]:checked");
        checkboxes.forEach(checkbox => {
            selectedTags.push(parseInt(checkbox.value));
        })
        setChosenTags(selectedTags);
    }

    return (
        <div className="playlist_page">
        <h2>Generate a Playlist Based on Mood</h2>            
            {tags.map(
                (tag) => {
                    return (
                        <div key={tag.id}><input
                            value={tag.id}
                            name={tag.name}
                            type="checkbox"
                                onChange={(event) => {
                                    const updatedTags = chosenTags;
                                    if (event.target.checked) {
                                        updatedTags.push(tag.id);
                                    } 
                                setChosenTags(updatedTags);
                                }}
                        />
        <label htmlFor={tag.name}>{tag.name}</label>
      </div>
    );
  }
)}
            <button onClick={(clickEvent) => handleGeneratePlaylistButton(clickEvent)}
                    className="btn btn-primary">Generate Playlist</button>
                
            
        <h2>List of Songs</h2>
            <div className="filteredSongs">
            <ul>
                {filteredSongs.map((filteredSong) => 
                <div className="filteredSong" key={`filteredsong--${filteredSong.id}`}><li>{filteredSong?.song?.songName} by {filteredSong?.song?.artist}</li></div>
                )}
            </ul>
            </div>
        </div>
    )
}

/*DROP DOWN FOR PLAYLIST
import React, { useState, useEffect } from "react";

export const GeneratePlaylist = () => {
    //gets the user info
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
    
    //fetch tags, and taggedSongs (for that user) and set state for each
    
    const [tags, setTags] = useState([]);
    const [taggedSongs, setTaggedSongs] = useState([]);
    useEffect(() => {    
        fetch('http://localhost:8088/tags')
        .then((res) => res.json())
        .then((data) => {
            setTags(data)
        })
        
        fetch(`http://localhost:8088/taggedSongs?userId=${myVersionUserObject.id}&_expand=song`)
        .then((res) => res.json())
        .then((data) => {
            setTaggedSongs(data)
        })
    }, 
    []
    )
    
    //gets the id of the tag that the user selected from the dropdown and sets the chosenTag state to that, it's just the number of the tagId
    const [chosenTag, setChosenTag] = useState({});
    
    //maps through each tagged song , and for each tagged song it runs the tagId against the chosenTag id and puts the tagged song that has the song info expanded
    //into the filteredTaggedSongs array then that is set to filteredSongs. 
    //this happens when the state of chosenTag is updated (ie someone selects a filter)
    const [filteredSongs, setFilteredSongs] = useState([])
    useEffect(
        () => {
            const filteredTaggedSongs = 
                taggedSongs.filter((taggedSong) => chosenTag === taggedSong.tagId)
            setFilteredSongs(filteredTaggedSongs)
        },
        [chosenTag]
    )
    
    return (
        <div>
        <h2>Generate a Playlist Based on Your Mood</h2>
            dropdown list of the user's tags and when one is selected it sets chosenTag to that parseInt tag.id 
            <select onChange={(event) => setChosenTag(parseInt(event.target.value))}>
                <option value={0}>Select a Mood</option>
                {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                    {tag.name}
                </option>
                ))}
            </select>
        <h2>List of Songs</h2>
            <div className="filteredSongs">
            <ul>
            maps through each filtered song to list out the song name 
                {filteredSongs.map((filteredSong) => 
                <div className="filteredSong" key={filteredSong.id}><li>{filteredSong?.song?.songName} by {filteredSong?.song?.artist}</li></div>
                )}
            </ul>
            </div>
        </div>
    );
};
*/