//set the state for the tagged songs to an empty array
//get the tagged songs data from the database
//write a function that handles the checkbox changes for the tags and whether it was checked or unchecked; it will need to
//map through the tag checkboxes to see if the tag.id === the value and makes a new array of tags for the songs
//update the save button, create a new array and then map through to get only tags that were checked, then post

import {  useEffect, useState } from "react"

export const Song = ({ songName, albumName, artist, featuringName, songId, tags, }) => {
    //gets the user info
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
        
    const [taggedSongs, setTaggedSongs] = useState([])

    //when the user selects a tag and clicks save, the save button function posts the tag info to chosen tag, and then the fetch pulls it back out so that it
    //will be displayed as the current tag, and rerenders so the user can delete the current tag
    const [chosenTags, setChosenTags] =useState([])

        const getTaggedSongs = () => {
            fetch(`https://octopus-app-bcllm.ondigitalocean.app/users/taggedSongs?songId=${songId}&userId=${myVersionUserObject.id}&_expand=tag`)
            .then(response =>response.json())
            .then((data) => {
                setChosenTags(data)
            })
        }
    
        useEffect(
        () => {
        getTaggedSongs()
        },
        []
    )

    const handleSaveButtonClick = () => {
        // get the checked tag values
        const checkedTags = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            .map(input => input.value)
    
        // create a new array of taggedSongs by mapping through the checkedTags
        const newTaggedSongs = checkedTags.map(tagId => ({
            userId: myVersionUserObject.id,
            songId: songId,
            tagId: parseInt(tagId)
        }))
    
        // post each new taggedSong to the server
        newTaggedSongs.forEach(taggedSongs => {
            fetch(`https://octopus-app-bcllm.ondigitalocean.app/users/taggedSongs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taggedSongs)
            })
        })
    
        // refresh the taggedSongs
        getTaggedSongs()
    }

    const handleDeleteButtonClick = () => {
        //maps over the chosenTags array and pulls out the id (or ids if the song has multiple tags) for each taggedSong object for that song
        const taggedSongsToDelete = chosenTags.map(taggedSong => taggedSong.id)
        //maps over that array of taggedSong ids to create a list of delete requests/fetch calls that need to be made 
        const requests = taggedSongsToDelete.map(id => {
            return fetch(`https://octopus-app-bcllm.ondigitalocean.app/users/taggedSongs/${id}`, {
                method: "DELETE"
            });
        });
        //Promise.all is used to wait for all of the deletes to happen
        Promise.all(requests)
        .then(() => {
                //sets chosenTags back to an empty array so that the checkboxes and save button comes back 
                setChosenTags([]);
            });
    };
    
    return <>
    <div className="song">
                    {featuringName === ""
                        ? <><div key={songId} className="song_artistName">{songName} by {artist}</div></>
                        : <><div key={songId} className="song_artistName">{songName} by {artist} featuring {featuringName}</div></>
                    }
                    {chosenTags.length
                        ? <><div className="currentTag">Current Mood(s): {chosenTags.map(
                            (chosenTag) => {
                                return <div key={chosenTag.id}>• {chosenTag.tag?.name}</div>
                            }
                        )}
                           <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                            className="btn btn-primary">
                                Delete Mood{`(s)`}
                            </button>
                            </div></>
                        : <><div className="tagList">{tags.map(
                                (tag) => {
                                    return <div className="individualTag" key={tag.id} ><input value={tag.id} name={tag.name} type="checkbox" /><label htmlFor={tag.name}>{tag.name}   </label>
                                    </div>
                                }
                                )}
                                   <button 
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                className="btn btn-primary">
                                Save Mood{`(s)`}
                        </button>
                                </div>
                        
                        </>     
                    }                             
                    </div>
    </>
}










