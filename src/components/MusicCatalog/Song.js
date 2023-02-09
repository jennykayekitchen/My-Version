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
            fetch(`http://localhost:8088/taggedSongs?songId=${songId}&userId=${myVersionUserObject.id}&_expand=tag`)
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

    //function to handle what happens when a tag is checked or unchecked. if the song already has that tag, then it isn't added, 
    //but if it doesn't have that tag a new array is created with any tag already there plus the new one
    // const handleCheckboxChange = (event) => {
    //     const newChosenTag = event.target.value
    //     if (chosenTags.includes(newChosenTag)) {
    //         setTaggedSongs(chosenTags.filter(tag=> tag !== newChosenTag))
    //     }
    //     else {
    //         setTaggedSongs([...chosenTags, newChosenTag])
    //     }
    // }

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
            fetch(`http://localhost:8088/taggedSongs`, {
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

    //when the delete button is clicked, the tagged song is deleted from the database, then it rerenders and the user
    //can select a new tag
    const handleDeleteButtonClick = () => {
        
        return fetch(`http://localhost:8088/taggedSongs/${chosenTags[0].id}`, {
            method: "DELETE"

        })
            .then (() => {
                setChosenTags([])
            })          
    }
    
    return <>
    <div className="song">
                    {featuringName === ""
                        ? <><div className="song_artistName">{songName} by {artist}</div></>
                        : <><div className="song_artistName">{songName} by {artist} featuring {featuringName}</div></>
                    }
                    {chosenTags.length
                        ? <><div className="currentTag">Current Mood: <ul>{chosenTags.map(
                            (chosenTag) => {
                                return <li key={chosenTag.id}>{chosenTag.tag?.name}</li>
                            }
                        )}</ul>
                           <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                            className="btn btn-primary">
                                Delete Mood{`(s)`}
                            </button>
                            </div></>
                        : <><div className="tagList">{tags.map(
                                (tag) => {
                                    return <div key={tag.id} ><input value={tag.id} name={tag.name} type="checkbox" /><label htmlFor={tag.name}>{tag.name}   </label>
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

/* JUST CHECKBOXES

onChange={(clickEvent) => handleCheckboxChange(clickEvent)}
import {  useEffect, useState } from "react"

export const Song = ({ songName, albumName, artist, featuringName, songId, tags, }) => {
    //gets the user info
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
    
    //sets the structure of the object that will be saved in the database, the user id is pulled from the user object 
    //and the songId is pulled from songId which was passed from songList and then deconstructed so it can be used for each song.
    const [taggedSong, setTaggedSong] = useState({
        userId: myVersionUserObject.id,
        songId: songId,
        tagId: 0
    })

    //when the user selects a tag and clicks save, the save button function posts the tag info to chosen tag, and then the fetch pulls it back out so that it
    //will be displayed as the current tag, and rerenders so the user can delete the current tag
    const [chosenTag, setChosenTag] =useState([])
        const getTaggedSong = () => {
        fetch(`http://localhost:8088/taggedSongs?songId=${songId}&userId=${myVersionUserObject.id}&_expand=tag`)
        .then(response =>response.json())
        .then((data) => {
            setChosenTag(data)
        })
    }
    useEffect(
        () => {
        getTaggedSong()
        },
        []
    )
    const handleSaveButtonClick = () => {
           
        return fetch(`http://localhost:8088/taggedSongs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify(taggedSong)
        })
        .then(response =>response.json())
        .then (() => {
            getTaggedSong()
        })
    }

    //when the delete button is clicked, the tagged song is deleted from the database, then it rerenders and the user
    //can select a new tag
    const handleDeleteButtonClick = () => {
        
        return fetch(`http://localhost:8088/taggedSongs/${chosenTag[0].id}`, {
            method: "DELETE"

        })
            .then (() => {
                setChosenTag([])
            })          
    }
    
    return <>
    <div className="song">
                    {featuringName === ""
                        ? <><div className="song_albumName">{songName} by {artist}</div></>
                        : <><div className="song_albumName">{songName} by {artist} featuring {featuringName}</div></>
                    }
                    {chosenTag.length
                        ? <><div className="currentTag">Current Mood: {chosenTag[0]?.tag?.name}</div>
                        <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                            className="btn btn-primary">
                                Delete Mood
                            </button></>
                        : <><div className="tagList">{tags.map(
                                (tag) => {
                                    return <div key={tag.id} ><input value={tag.id} name={tag.name} type="checkbox" /><label htmlFor={tag.name}>{tag.name}</label>
                                    </div>
                                }
                                )}
                                </div>
                                <button 
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                className="btn btn-primary">
                                Save Mood
                        </button>
                        
                        </> 
}
    
                                      
                    </div>
    </>
}
*/

/* DROP DOWN FOR TAGS
import {  useEffect, useState } from "react"

export const Song = ({ songName, albumName, artist, featuringName, songId, tags, }) => {
    //gets the user info
    const localMyVersionUser = localStorage.getItem("my_version_user")
    const myVersionUserObject = JSON.parse(localMyVersionUser)
    
    //sets the structure of the object that will be saved in the database, the user id is pulled from the user object 
    //and the songId is pulled from songId which was passed from songList and then deconstructed so it can be used for each song.
    const [taggedSong, setTaggedSong] = useState({
        userId: myVersionUserObject.id,
        songId: songId,
        tagId: 0
    })

    //when the user selects a tag and clicks save, the save button function posts the tag info to chosen tag, and then the fetch pulls it back out so that it
    //will be displayed as the current tag, and rerenders so the user can delete the current tag
    const [chosenTag, setChosenTag] =useState([])
        const getTaggedSong = () => {
        fetch(`http://localhost:8088/taggedSongs?songId=${songId}&userId=${myVersionUserObject.id}&_expand=tag`)
        .then(response =>response.json())
        .then((data) => {
            setChosenTag(data)
        })
    }
    useEffect(
        () => {
        getTaggedSong()
        },
        []
    )
    const handleSaveButtonClick = () => {
           
        return fetch(`http://localhost:8088/taggedSongs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify(taggedSong)
        })
        .then(response =>response.json())
        .then (() => {
            getTaggedSong()
        })
    }

    //when the delete button is clicked, the tagged song is deleted from the database, then it rerenders and the user
    //can select a new tag
    const handleDeleteButtonClick = () => {
        
        return fetch(`http://localhost:8088/taggedSongs/${chosenTag[0].id}`, {
            method: "DELETE"

        })
            .then (() => {
                setChosenTag([])
            })          
    }
    
    return <>
    <div className="song">
                    <div className="songName">Track Name: {songName}</div>
                    <div className="albumName">Album: {albumName}</div>
                    <div className="artist">Artist: {artist}</div>
                    <div className="featuring">Featuring: {featuringName}</div>
                {chosenTag.length
                        ? <><div className="currentTag">Current Tag: {chosenTag[0]?.tag?.name}</div>
                        <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                            className="btn btn-primary">
                                Delete Tag
                            </button></>
                            // for each song, if the chosenTag object is falsey, meaning the user hasn't added a tag yet, then a drop down of each tag is
                            // displayed along with a save button
                        : <><select className="tagDropdown" onChange={
                            (event) => {
                                const copy = {...taggedSong}
                                copy.tagId = parseInt(event.target.value)
                                setTaggedSong(copy)
                            }
                        }>
                            <option value="0" >Select Tag</option>
                            {tags.map(
                                (tag) => {
                                    return <option key={tag.id} 
                                    value={tag.id}
                                    >{tag.name}</option>
                                }
                                )}
                        </select>
                        <button 
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                className="btn btn-primary">
                                Save Tag
                        </button>
                        </>
                        }
*/                        








