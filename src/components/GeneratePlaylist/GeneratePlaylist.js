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
        fetch('https://octopus-app-bcllm.ondigitalocean.app/users/tags')
        .then((res) => res.json())
        .then((data) => {
            setTags(data)
        })
        
        fetch(`https://octopus-app-bcllm.ondigitalocean.app/users/taggedSongs?userId=${myVersionUserObject.id}&_expand=song`)
        .then((res) => res.json())
        .then((data) => {
            setTaggedSongs(data)
        })
    }, 
    []
    )
    
    //array that keeps track of which tags have been selected by the user to filter the playlist 
    //starts as an empty array.
    const [chosenTags, setChosenTags] = useState([]);

    //array that will contain the filtered list of songs based on the tags selected by the user
    const [filteredSongs, setFilteredSongs] = useState([])
    useEffect(
        () => {
            // empty array that will temporarily hold the list of songs before removing duplicates
            const playlistWithDups = []

            // /*The first loop iterates over each song that has a tag (taggedSongs array) and checks whether the tagId 
            // of that song matches the first tag that user seleted for the playlist. 
            // If it does, it pushes that song into a new array called playlistWithDups.

            // The loop also iterates over each song that has a tag and checks whether:
            // 1. the tagId of that song matches the other tags the user chose for the playlist and 
            // 2. whether the songId matches the songId of otherTaggedSong. 
            // If it does, it pushes that song into the playlistWithDups array.

            // Otherwise, if there is only one tag seleted pushes that song into the playlistWithDups array.
            // */
            taggedSongs.forEach(taggedSong => {
                taggedSongs.forEach(otherTaggedSong =>{
                    if (taggedSong.tagId === chosenTags[0] && otherTaggedSong.tagId === chosenTags[1] && taggedSong.songId === otherTaggedSong.songId) {
                        playlistWithDups.push(taggedSong)                                
                    }
                    else if (chosenTags.length === 1 && taggedSong.tagId === chosenTags[0]) {
                        playlistWithDups.push(taggedSong)
                    }
                })                
            })
            //playListWithDups is then converted into a set called playlist which removes any duplicate songs in the list. 
            const playlist = [...new Set(playlistWithDups)]
            //Then this list of songs is set as the value of the filteredSongs state variable.
            setFilteredSongs(playlist)
        },
        [chosenTags, taggedSongs]
    )

    const handleGeneratePlaylistButton = (event) => {
        event.preventDefault();
        //empty array that will hold the tagIds that the users checks
        const selectedTags = [];

        //finds all the checkboxes that are checked and puts them in playlistCheckboxes
        const playlistCheckboxes = event.target.parentNode.querySelectorAll("input[type=checkbox]:checked");
            //loops over the playlistCheckboxes pushes the value (tagId) of each checkbox to selectedTags after converting it to an integer
            playlistCheckboxes.forEach(checkbox => {
                selectedTags.push(parseInt(checkbox.value));
        })
        //updates the chosenTags state to be the tags the user checked
        setChosenTags(selectedTags);

        //finds all the checkboxes in the form and unchecks them, so that the user can select a new set of tags and 
        //generate a new playlist without having to manually uncheck the previous tags
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
    }

    const handleClearPlaylistButton = (event) => {
        //clears the chosenTags state, which is the list of songs in the playlist
        setChosenTags([])
    }

    return <>
        <div className="playlist_page">
        <div className="playlist_items">
        <div className="page_title_playlist"><h2>Generate a Playlist</h2></div>        
        <em className="playlist_tape"></em>
            <div className="playlist_form">
                Pick up to two moods to generate a playlist.
            <div className="playlist_tags">
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

                    )}
        )}
        </div>
            
            <button onClick={(clickEvent) => handleGeneratePlaylistButton(clickEvent)}
                    className="btn btn-primary">Generate Playlist</button>
            <button onClick={(clickEvent) => handleClearPlaylistButton(clickEvent)}
                    className="btn btn-primary">Clear Playlist</button>
                </div>
                </div>
                
            
        <div className="list_of_songs">
        <div className="listOfSongs_title"><h2>Your Perfect Playlist</h2></div>
        <em className="listOfSongs_tape"></em>
            <div className="filteredSongs">
            <ul>
                {filteredSongs.map((filteredSong) => 
                <div className="filteredSong" key={`filteredsong--${filteredSong.id}`}><li>{filteredSong?.song?.songName} by {filteredSong?.song?.artist} from the album {filteredSong?.song?.albumName}</li></div>
                )}
            </ul>
            </div>
        </div>
        </div>
    </>
}

