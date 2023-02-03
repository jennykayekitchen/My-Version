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
                    {/* for each song, if the the chosenTag object is truthy, meaning the user has added a tag to that song, then it
                    will display the current tag and a button to delete the current tag  */}
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
                    
                    </div>
    </>
}










